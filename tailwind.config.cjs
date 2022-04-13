module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.svelte'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: "@tsconfig/svelte/tsconfig.json",
		extend: {
			maxHeight: {
			  '144': '36rem',
			},
			bottom: {
				'1/16' : '6.25%',
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
