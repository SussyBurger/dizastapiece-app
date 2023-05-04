/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				'logo-light': "url('/images/logo-white.png')",
				'logo-dark': "url('/images/logo-white.png')",
			}),
		},
	},
	variants: {
		extend: {
			backgroundImage: ['dark'],
		},
	},
	plugins: [],
};