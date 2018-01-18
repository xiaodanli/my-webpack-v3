# webpack-v3学习总结

webpack是一个现代javascript应用程序的静态模块打包器。

一、前端为什么需要构建？

    1》开发复杂化

    2》框架去中心化

        之前的库大而全，现在的库就是小而精，针对性强

    3》语言编译化

    4》开发模块化

二、gulp、grunt、webpack的使用场景

   三者皆为前端构建工具，还是要根据具体项目和所在团队来选择构建工具。

    1》小项目，零散页，历史项目，结果不复杂，维护难度相对低，模块化要求低，用gulp和grunt即可。上手快，任务流清晰易懂。

    2》中大型项目利器，webpack设置复杂，更多关注项目整体的配置，因为require everything的理念，使得静态资源也变得容易维护，模块组件化更是好用。

三、webpack的核心概念  想详细了解可以去看webpack中文官网（https://doc.webpack-china.org/）

    1》entry   入口

    2》output  出口

    3》loader  注：loader是自下而上依次执行的

    4》plugins

     常用的名词：Chunk    代码块

               Bundle   打包

               Module   模块

四、demo说明

    首先，全局和本地安装webpack

    执行sudo npm install webpack -g

       npm install webpack --save-dev

    1》demo1  单入口文件

    2》demo2  多入口文件

    3》demo3  编译es6语法

        1)  babel-loader

            npm install babel-loader babel-core --save-dev

        2） babel-presets （只针对语法）

            npm install babel-preset-env --save-dev

            可以在Can I use查看语法的支持程度

    4》demo4  编译es6函数和方法  局部垫片

        babel-polyfill 、 babel-runtime-transform两个插件针对es6函数和方法

             #babel-runtime-transform 局部开发  为开发框架准备的

                npm install babel-plugin-transform-runtime --save-dev

                npm install babel-runtime --save-dev

                使用新建一个文件 '.babelrc'

                `{
                   "presets":[
                         ["babel-preset-env",{
                             "targets":{
                                 // chrome:'52'
                                 "browsers":[' > 1%','last 2 versions']
                             }
                         }]
                    ],
                    "plugins":["transform-runtime"]
                 }`

    5》demo5  编译es6函数和方法  全局垫片 很少用

        #babel-polyfill  全局垫片，为开发应用准备的

            npm install babel-polyfill --save  没有'-dev'，它是需要在项目里依赖的

            使用：在代码开头引用  import 'babel-polyfill'

    6.1》demo6-1 打包公用代码

        原因：1）减少代码冗余  2）提高加载速度

        webpack.optimize.CommonsChunkPlugin内置插件 适用多entry的情况下

        配置

        options

            options.name or options.names

            options.filename    打包后的文件名

            options.minChunks   提取的公用代码最少出现几次

            options.chunks      提取公用代码的范围 和chidren deepChildren互斥

            options.children    entry的子模块中

            options.deepChildren

            options.async       异步的代码块

        场景

            1）提取两个及两个以上 Chunk 的公共代码

    6.2》demo6-2 打包公用代码 提取第三方依赖

        #遇到webpackJsonp is not defined？

        解决办法：把生成的公用文件放到自己js前面即可

    7.1》demo7-1 代码分割和懒加载  让用户在尽可能少的时间内看到页面  适用单entry

        （1）webpack内置的方法

            #require.ensure([依赖],callback,errorCallback(可省略),chunkName)

                例：require.ensure(['lodash'], function () {
                    var _ = require('lodash')  //这里必须引用一下，下面才可以使用
                    _.join([1, 2], 3)
                },'vendor')

                注：require.ensure(['lodash])只是把代码放到页面内，而不执行，

                   var _ = require('lodash')  //这里必须引用一下，下面才可以使用

            #require.include 引用却不执行

    7.2》demo7-2 代码分割和懒加载

        （2）ES2015 loader spec

            import() -> 返回Promise  import()-->引用并执行代码

            import().then()

            import(/* webpackChunkName:async-chunk-name*/
                /*webpackMode:lazy*/
                modulename
            )

        代码分割和懒加载适用场景：

            1）分离业务代码和第三方依赖

            2）分离业务代码和业务公用代码和第三方依赖

            3）分离首次加载和访问后加载代码

    7.3》demo7-3 打包公用代码和代码分割整合

    8》demo8  编译less，自动添加前缀，删除多余的css，压缩css，提取css文件，嵌入到页面中

        1)html页面以style标签嵌入页面

            作用：css-loader是读取js内import的css，style-loader是把css嵌入到html页面内

           npm install style-loader css-loader --save-dev

           css-loader

               配置：

                   options：

                       alias ( 解析的别名 )

                       importLoader ( @import )

                       minimize ( 是否压缩 )  使用的css-nano来实现的

                       modules ( 启用css-modules )
        2)PostCSS

           npm install postcss-loader --save-dev

           1）Autoprefixer

               作用：自动添加前缀

                   以下两种方法都可以实现

                   1>在根目录下面新建一个postcss.config.js

                        module.exports = {
                            plugins:[
                                require('autoprefixer')
                            ]
                        }

                   2>在postcss-loader的options里面配置plugin

                        {
                            loader:'postcss-loader',
                            options:{
                                plugins:[
                                    require('autoprefixer')()
                                ]
                            }
                        }

               broswerslist所有插件公用 以下两种方法都可以实现

                   1）package.json   "browerslist":[
                                        " >= 1% ",
                                        "last 2 versions"
                                      ]

                   2) .browserslistrc

        2)编译less

           npm install less-loader less --save-dev

        3)提取css代码

           ExtractTextWebpackPlugin插件

           npm install extract-text-webpack-plugin --save-dev

           参数：allChunk：false 默认值为false

        4)CSS Tree Sharking 去掉没有用到css

            使用场景：

                1)常规优化

                2)引用第三方库的某一个样式

                Purify CSS  https://github.com/purifycss/purifycss

                针对webpack有一个插件  purifycss-webpack

                npm install purifycss-webpack purify-css glob-all --save-dev

                配置：

                    options

                        paths:glob.sync([])

    9》图片处理

        1》css中引入的图片

        2》自动合成雪碧图

        3》压缩图片

            压缩jpg图片时，遇到的问题

            brew install libpng

        4》base64编码

        使用的loader

            file-loader         引用的图片     npm install file-loader --save-dev

            url-loader          base64格式    npm install url-loader --save-dev

            img-loader          压缩图片       npm install img-loader --save-dev

        注：在html页面,img引入的图片，需要使用html-loader来打包生成新的页面

            在js里面的图片，需要使用require来引用，否则不会编译

        处理html里img引用的图片        npm install html-loader --save-dev

        打包编译html,生成一个新的html   npm install html-webpack-plugin --save-dev


















