import { setError, superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { registerFormSchama } from './schema';
import db from '$lib/database';
// import jwt from 'jsonwebtoken';
// import { SECRET_INGREDIENT } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerFormSchama));

		if (!form.valid) {
			console.log('Failed to Register');

			return {
				message: 'Failed to Register',
				form
			};
		}

		try {
			const user = await db.user.findUnique({
				where: { email: form.data.email }
			});

			if (user) {
				setError(form, 'email', 'Email already Exists');

				return {
					message: 'Email already exists!',
					form
				};
			}

			const { name, email, password } = form.data;

			await db.user.create({
				data: {
					name,
					email,
					password: await bcrypt.hash(password, 15)
				}
			});
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			// console.log('CAUGTH REGISTERATION ERROR: ', JSON.stringify(error, null, 2));

			setError(form, 'comfirmPassword', 'Registeration Failed!!');

			return {
				message: 'Registeration Failed!!',
				form
			};
		}

		redirect(303, '/signin');
	}
} satisfies Actions;

// return {
// 	message: 'Registeration Successfull',
// 	form
// };

// const authToken =  jwt.sign({authUser: email}, SECRET_INGREDIENT, {
// 	expiresIn: '30d'
// })

// event.cookies.set('authToken', authToken, {
// 	path: '/',
// 	httpOnly: true,
// 	maxAge: 60 * 60 * 24 * 30,
// 	sameSite: 'strict',
// 	secure: process.env.NODE_ENV === 'PRODUCTION'
// });
