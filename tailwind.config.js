/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.js",
		"./src/Pages/*/*.js",
		"./src/Components/*.js"
	],
	theme: {
		colors: {
			'SHADOW' : "rgba(0, 0, 0, 0.5)",
			'000000' : "#000000",
			'FFFFFF' : "#FFFFFF",
			'D8E2DC' : '#D8E2DC',
			'FFE5D9' : '#FFE5D9',
			'FFCAD4' : '#FFCAD4',
			'F4ACB7' : '#F4ACB7',
			'9D8189' : '#9D8189',
		}
	},
	plugins: [],
};

