import { fontFamily } from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import { skeleton } from '@skeletonlabs/tw-plugin';
import { join } from 'path';
import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ["class"],
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)],
	safelist: ["dark"],
	plugins: [forms,
		skeleton({
			themes: { preset: [ 
						"rocket", 
						"modern", 
						"vintage", 
						"skeleton", 
						"wintry",
						"sahara",
						"crimson",
						"seafoam",
						"hamlindigo",
					] }
		})
	],
	theme: {
		extend: {}
	},
};

export default config;
