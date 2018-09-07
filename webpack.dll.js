/**
 * 功能：webpack 性能优化Dll技术
 * 作者：Abbott.liu
 * 时间：2018年7月23日
 */
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const library = '[name]_[chunkhash:8]';
const NODE_ENV = process.env.NODE_ENV; // Node环境 process 对象是一个全局的变量

const clean_path = NODE_ENV === 'production'? 'public/dist' : 'service/dist'

// the path(s) that should be cleaned
let pathsToClean = [
    'dist',
    'build'
]

// the clean options to use
let cleanOptions = {
    root:     '', //清理的路径
    exclude:  ['shared.js'],
    // Write logs to console.
    verbose:  true,
    // Use boolean "true" to test/emulate delete. (will not remove files). 模拟删除
    dry:      false
}

module.exports = {
    devtool: NODE_ENV === 'production' ? false : 'source-map',
    entry: {
        vendor: [
            'antd',
            'react',
            'react-dom',
	        'react-router-dom',
	        'redux'
        ]
    },
    output: {
        path: NODE_ENV === 'production'?path.join(__dirname, 'public/dist/'):path.join(__dirname, 'service/dist/'),
        filename: NODE_ENV === 'production' ? '[name].[chunkhash:8].dll.js':'[name].dll.js',
        library: library
    },
    plugins: [
        //new CleanWebpackPlugin(['public/dist'], {}),
        new CleanWebpackPlugin([clean_path], {}),

        new webpack.DllPlugin({
            path: NODE_ENV === 'production' ? path.join(__dirname, 'public/dist', '[name]-manifest.json'):path.join(__dirname, 'service/dist/', '[name]-manifest.json'),
            name: library,   // dll暴露的对象名,跟output.library保持一致
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ],

};




