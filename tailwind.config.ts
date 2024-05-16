import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { dusk } from "./src/lib/themes/dusk";


export default {
	darkMode: 'selector',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{ name: "rocket",  enhancements: true},
					{ name: "modern",   enhancements: true},
					{ name: "vintage",   enhancements: true},
					{ name: "skeleton",   enhancements: true},
					{ name: "wintry",  enhancements: true},
					{ name: "sahara",  enhancements: true},
					{ name: "crimson",  enhancements: true},
					{ name: "seafoam",  enhancements: true},
					{ name: "hamlindigo",  enhancements: true},
				],
				custom: [dusk] 
			},
		}),
	], 
} satisfies Config;
