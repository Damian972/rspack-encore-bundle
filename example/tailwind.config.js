const rspackDevServerExternalConfig = require('./rspack.dev-server.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [...rspackDevServerExternalConfig.watchFiles],
	theme: {
	},
	plugins: [],
};
