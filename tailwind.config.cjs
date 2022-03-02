module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.svelte'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: "@tsconfig/svelte/tsconfig.json"
	},
	variants: {
		extend: {}
	},
	plugins: []
};
