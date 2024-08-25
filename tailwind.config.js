/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#04041e',
				secondary: '#eaeaea',
				tertiary: '#00df94'
			},
			fontFamily: {
				sans: ['Outfit', 'sans-serif']
			}
		}
	},
	plugins: []
};
