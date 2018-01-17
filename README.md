# webpack学习总结

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

三、webpack的核心概念

    1》entry   入口

    2》output  出口

    3》loader

    4》plugins

     常用的名词：Chunk    代码块

               Bundle   打包

               Module   模块




