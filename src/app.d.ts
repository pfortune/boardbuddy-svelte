declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: {
				userId: string
				claims: {
					metadata: {
						role: string
					}
				}
			}
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare interface Window {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	cloudinary: any
}