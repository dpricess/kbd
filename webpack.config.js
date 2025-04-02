const path = require('path');

module.exports = {
    entry: './src/app.js', // Start here
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') ,// Output to dist/
        clean: true
    },
    mode: 'development',// Less minification for debugging
    devtool: 'source-map',
    devServer: {
        static: path.resolve(__dirname), // Serve from root
        port: 8000,
        hot: true // Auto-reload browser
    }
};