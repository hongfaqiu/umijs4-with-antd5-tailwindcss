import { defineConfig } from 'umi';

export default defineConfig({
	plugins: [
		'@umijs/plugins/dist/antd',
		'@umijs/plugins/dist/initial-state',
		'@umijs/plugins/dist/model',
		'@umijs/plugins/dist/locale',
		'@umijs/plugins/dist/request',
		'@umijs/plugins/dist/tailwindcss',
	],
	antd: {},
	historyWithQuery: {},
	initialState: {},
	model: {},
	locale: {
		default: 'en-US',
		antd: true,
	},
	request: {},
	npmClient: 'pnpm',
	tailwindcss: {},
	sassLoader: {},
	exportStatic: {},
	favicons: ['/logo.png'],
	title: 'WorkFlow',
	mfsu: {
		shared: {
			react: {
				singleton: true,
			},
		},
	},
});
