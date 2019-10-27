const path = require('path');//生效webpack 快捷
const webpack =require('webpack');//因为安装了webpack 导入webpack模块
const VueLoaderPlugin = require('vue-loader/lib/plugin');//vue-loader 需要加载插件
// 导入插件 html-wepack-plugins 
// const HtmlWebpackPlugin = require('html-webpack-plugin')//导入js文件是 引入对应模块
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	entry:'./src/main.js',
	/* 指定入口文件这个时候不能用【\】 */
	output: {
		path: path.resolve(__dirname, "dist"),
		/* 指定输出路径 */
		filename:(__dirname, "bundle.js") //在导入HtmlWebpackPlugin插件后会把打包好的bundle.js插入到页面中
	},
	mode:'development',/* 设置开发模式，生产模式  */
	// 服务配置
	devServer:{  /* 这是配置dev-server的第二种方式 将配置的卸载webpack.config*  package.json中的第一种方式 "dev": "webpack-dev-server --open --port:8080 --contentBase src --hot" */
		open:true,//浏览器打开
		port:3000,//指定打开的窗口
		// 项目目录为当前根目录 
		// contentBase:'src',//指定托管目录 默认打开index 所以会比内存的 HTML src位托管目录 因为这样html里的文件访问的根目录就变成了 src
		// hot:true,//webpack4  之后不用再手动启用热更新  之前被禁用要手动启动原:通过plugins插件启动
	},
	plugins:[//配置插件的节点
		new webpack.HotModuleReplacementPlugin(), // new 一个热更新的 模块对象， 这是 启用热更新的第 3 步
		new htmlWebpackPlugin({//把在根目录下生成一个内存中的filename index 文件 **且自动对bundle.js进行引用
			title: 'Hello World app',
			template:path.join(__dirname,"./src/index.html"),
			filename:"index.html"
		}),
		new VueLoaderPlugin(),//启动vue-loader插件
	],
	module:{//存放 第三方loader 加载器的 加载规则
		rules:[
			{test:/\.css$/,use:['style-loader','css-loader']},//配置匹配规则 从后往前调 css-style -webpack -合并进入budle
			{test:/\.less$/,use:['style-loader','css-loader','less-loader']}, //加载less 文件 npm less-loader less
			{test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}, //加载less 文件 npm sass-loader sass  //suss
			{test:/\.(jpg|png|gif|jpeg)$/,use:['url-loader?limit=500&name=[hash:8]-[name].[ext]']},//test正则表达式.xxx|xx|结尾的匹配 url-loader(file-loader为内置不需要配置)**
			{test:/\.(ttf|eot|svg|woff|woff2)$/,use:['url-loader']},//处理字体文件的loader配置对象
			{test:/\.js$/,use:['babel-loader'],exclude:/node_modules/},//排除node_modules
			// {test:/\.vue$/,use:['vue-loader']},//处理.vue
			{ test: /\.vue$/, use: ['vue-loader'] },
		],
	},
	resolve:{ //改变import查找包规则最后的包文件的指定暴露模块路径，但是每次修改都要npm run dev
		alias:{
			'vue$':'vue/dist/vue.esm.js' //导包查找路径:node_modules vue文件下的 dist -- package.json main  
		}
	}
}



