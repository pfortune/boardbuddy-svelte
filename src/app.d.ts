declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare interface Window {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	cloudinary: any
}

export {};