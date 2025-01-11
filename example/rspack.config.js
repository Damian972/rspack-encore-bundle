const rspack = require('@rspack/core');
const path = require('path');
const WebpackAssetsPlugin = require('assets-webpack-plugin');
const { RspackManifestPlugin } = require('rspack-manifest-plugin');

const rspackDevServerExternalConfig = require('./rspack.dev-server.json');

const isProd = 'production' === process.env.NODE_ENV;

const buildPath = path.resolve(__dirname, 'public/build');

// Get the public path for the assets
const getPublicPath = () => {
	if (isProd) {
		return '/build/';
	}

	const host = process.env.HOST || 'localhost';
	const port = process.env.PORT || rspackDevServerExternalConfig.port || 8080;

	return `//${host}:${port}/build/`;
};

/** @type {import('@rspack/cli').Configuration} */
const rsPackConfig = {
	context: __dirname,
	entry: {
		app: './assets/index.ts',
	},
	mode: isProd ? 'production' : 'development',
	output: {
		path: buildPath,
		filename: '[name].[contenthash].js',
		publicPath: getPublicPath(),
		pathinfo: true,
		clean: true,
		asyncChunks: true,
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			cacheGroups: {},
			minSize: 1,
		},
	},
	devtool: 'inline-source-map',
	devServer: {
		...rspackDevServerExternalConfig,
		client: {
			progress: true,
		},
		liveReload: true,
	},
	externals: {
		// Flickity: 'flickity',
	},
	experiments: {
		css: true,
	},
	plugins: [
		!isProd && new rspack.HotModuleReplacementPlugin(),
		new WebpackAssetsPlugin({
			filename: 'entrypoints.json',
			prettyPrint: false,
			fullPath: true,
			manifestFirst: true,
			useCompilerPath: false,
			includeFilesWithoutChunk: false,
			includeAuxiliaryAssets: false,
			includeDynamicImportedAssets: false,
			keepInMemory: false,
			integrity: false,
			removeFullPathAutoPrefix: false,
			path: buildPath,
			entrypoints: true,
		}),
		new RspackManifestPlugin({
			fileName: 'manifest.json',
			writeToFileEmit: true,
		}),
	].filter(Boolean), // Remove falsy values
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/],
				loader: 'builtin:swc-loader',
				options: {
					jsc: {
						parser: {
							syntax: 'typescript',
						},
					},
				},
				type: 'javascript/auto',
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					{
						loader: 'sass-loader',
						options: {
							// using `modern-compiler` and `sass-embedded` together significantly improve build performance,
							// requires `sass-loader >= 14.2.1`
							api: 'modern-compiler',
							implementation: require.resolve('sass-embedded'),
						},
					},
					'postcss-loader',
				],
				type: 'css/auto',
			},
			{
				test: /\.css$/,
				use: ['postcss-loader'],
				type: 'css',
			},
		],
	},
};

module.exports = rsPackConfig;
