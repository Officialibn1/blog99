// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

interface User {
	name: string;
	email: string;
	role?: string | undefined;
}
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: Session | null;
			user: User | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
