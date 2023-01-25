// /** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/tw-elements/dist/js/**/*.js"
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				lg: '0rem'
			},
		},
		extend: {
			fontFamily: {
				'open-sans': ['Open Sans', 'sans-serif'], //345678 italic
			},
			colors: {
				primary: '#32926F',
				light: '#f5f5f5',
				dark: '#262626'
			}
		},

		screens: {
			'sm': "640px",
			'md': "768px",
			'lg': "1024px",
			'xl': "1280px",
			'2xl': "1400px"
		}
	},
	plugins: [
		require('prettier-plugin-tailwindcss'),
		require('tw-elements/dist/plugin'),
		require('@tailwindcss/forms'),
	],
}
