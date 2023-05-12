/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
		'./node_modules/flowbite/**/*.js',
	],
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				'logo-light': "url('/images/logo-black.png')",
				'logo-dark': "url('/images/logo-white.png')",
			}),
		},
	},
	variants: {
		extend: {
			backgroundImage: ['dark'],
		},
	},
	plugins: [require('flowbite/plugin')],
};
