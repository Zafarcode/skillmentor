import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		accessToken?: string
		user: CustomUser
	}

	interface User extends CustomUser {}
}

declare module 'next-auth/jwt' {
	interface JWT {
		accessToken?: string
		refreshToken?: string
		user?: CustomUser
	}
}

interface CustomUser {
	refreshToken: string | undefined
	accessToken: string | undefined
	id: string
	email: string
	name: string
	// Add other custom properties here
}
