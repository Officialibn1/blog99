import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { signInFormSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import db from '$lib/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_INGREDIENT } from '$env/static/private';

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signInFormSchema));

		if (!form.valid) {
			return fail(400, {
				message: 'Error Signing In',
				form
			});
		}

		const { email, password } = form.data;

		try {
			const user = await db.user.findUnique({
				where: { email }
			});

			if (!user) {
				setError(form, 'password', 'Invalid Credentials!!');

				return fail(400, {
					message: 'Invalid Credentials!!',
					form
				});
			}

			const validUser = await bcrypt.compare(password, user.password);

			if (!validUser) {
				setError(form, 'password', 'Invalid Credentials!!');

				return fail(400, {
					message: 'Invalid Credentials!!',
					form
				});
			}

			const authToken = jwt.sign({ authUser: email }, SECRET_INGREDIENT, {
				expiresIn: '30d'
			});

			const authenticatedUser = await db.user.update({
				where: { email },
				data: { authToken }
			});

			event.cookies.set('adminSession', authenticatedUser.authToken!, {
				path: '/',
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 30,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production'
			});
		} catch (error) {
			console.log('CAUGTH LOGIN ERROR: ', JSON.stringify(error, null, 2));

			setError(form, 'password', 'Login Failed.. Something went wrong!!');

			return fail(400, {
				message: 'Login Failed.. Something went wrong!!',
				form
			});
		}

		redirect(303, '/dashboard');
	}
} satisfies Actions;
