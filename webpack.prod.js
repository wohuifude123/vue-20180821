/**
 * 功能：webpack 生产环境
 * 作者：Abbott.liu
 * 时间：2018年7月23日
 */
const merge = require('webpack-merge');

//  不要在开发环境下使用[chunkhash] 因为这会增加编译时间

const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const manifest = require('./public/dist/vendor-manifest.json');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const _venderName = manifest.name.split('_');
const venderName = _venderName[0] + '.' + _venderName[1];

const glob = require('glob');

module.exports = merge(common.baseConfig, {
    output: {
        filename: 'dist/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./public/dist/vendor-manifest.json')
        }),

	    new HtmlWebpackPlugin(
		    getWebpackPlugin(0)
	    ),

	    new HtmlWebpackPlugin(
		    getWebpackPlugin(1)
	    ),

	    new HtmlWebpackPlugin(
		    getWebpackPlugin(2)
	    ),

	    new HtmlWebpackPlugin(
		    getWebpackPlugin(3)
	    ),

	    new HtmlWebpackPlugin(
		    getWebpackPlugin(4)
	    ),

	    new HtmlWebpackPlugin(
		    getWebpackPlugin(5)
	    ),

	    new HtmlWebpackPlugin(
		    getWebpackPlugin(6)
	    ),

	    new HtmlWebpackPlugin(
		    getWebpackPlugin(7)
	    ),

	    new HtmlWebpackPlugin(
		    getWebpackPlugin(8)
	    ),

	    new HtmlWebpackPlugin(
		    getWebpackPlugin(9)
	    ),

	    new HtmlWebpackPlugin(
		    getWebpackPlugin(10)
	    ),

	    new HtmlWebpackPlugin(
		    getWebpackPlugin(11)
	    ),

        new CopyWebpackPlugin(
            [
                //{ from: 'service/config/setting.js', to: 'config/setting.js' },
                { from: 'service/virtual/', to: 'virtual/' }
            ],
            { copyUnmodified: true }
        ),

        new UglifyJSPlugin(),

        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['dist/'+ venderName  + '.dll.js'],
            append: false // 不会被 webpack 自动打包
        }),


        // new HtmlWebpackIncludeAssetsPlugin({
        //     assets: ['config/env-config.js'],
        //     append: false, // 不会被 webpack 自动打包
        //     hash: true
        // }),

        new HtmlWebpackHarddiskPlugin(), // 将[venderName + '.js']和['env-config.js']放进 video.html 中
        new ExtractTextPlugin('css/[name].css')
    ],
});


function getEntry() {
	let globPath = 'src/pages/**/*.html'
	// (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
	let pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)html'
	let files = glob.sync(globPath);
	let dirname, entries = []
	//console.log('files =', files)
	for (let i = 0; i < files.length; i++) {
		dirname = path.dirname(files[i])
		entries.push(dirname.replace(new RegExp('^' + pathDir), '$2'))
	}
	return entries
}


function getWebpackPlugin( index ) {

	let pluginObj = [];

	getEntry().forEach( function (item, index, array) {
		let file_name = item.replace(/(.*\/)*([^.]+).*/ig,"$2");
		pluginObj[index] = file_name;
	} )

	//console.log( 'pluginObj = ', pluginObj);

	let po = {};

	if( pluginObj[index] === 'userNew') {
		
		po = {
			filename: `./index.html`,
			template: `./src/pages/${pluginObj[index]}/index.html`,
			//favicon: './src/favicon.ico',
            favicon: ``,
			inject: 'body',
			chunks: [`${pluginObj[index]}`],
			alwaysWriteToDisk: false, // 是否开启 new HtmlWebpackHarddiskPlugin()
		}

	} else {
		po = {
			filename: `./${pluginObj[index]}.html`,
			template: `./src/pages/${pluginObj[index]}/index.html`,
			//favicon: './src/favicon.ico',
            favicon: ``,
			inject: 'body',
			chunks: [`${pluginObj[index]}`],
			alwaysWriteToDisk: false, // 是否开启 new HtmlWebpackHarddiskPlugin()
		}
	}



	return po;
}


console.log('服务器执行的环境')

let operateFile = require('child_process');
var ip = '1.1.1.1';
var username = 'test';
var password = 'pwd';
var newpassword = 'newpwd';
operateFile.execFile('./configuration-prod.sh',['-H', ip, '-U', username, '-P', password, '-N', newpassword],null,function (err, stdout, stderr) {
	//callback(err, stdout, stderr);
});