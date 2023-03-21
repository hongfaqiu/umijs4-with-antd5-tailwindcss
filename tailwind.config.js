const { fontFamily } = require('tailwindcss/defaultTheme');
const { withAnimations } = require('animated-tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = withAnimations({
	content: [
		'./src/pages/**/*.tsx',
		'./src/components/**/*.tsx',
		'./src/layouts/**/*.tsx',
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...fontFamily.sans],
			},
			strokeWidth: {
				1.5: '1.5px',
			},
			keyframes: {
				shimmer: {
					'100%': {
						transform: 'translateX(100%)',
					},
				},
				skeleton: {
					'0%': {
						'background-position': '100% 50%',
					},
					'100%': {
						'background-position': '0 50%',
					},
				},
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
});
