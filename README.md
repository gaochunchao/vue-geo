#需要环境配置
*node >=6.0.0
*npm >3.0.0

#感谢IView作者分享组件库，参考IView进行构建发布

#自动化测试环境配置

确认好你的环境配置，然后就可以开始以下步骤。


#浏览器要求  IE9+

开发过程中，你用到的最多的会是'npm run dev'。

|`npm run <script>`|解释|
|`dev`|服务启动在8082端口，代码热替换开启。|
|`build`|代码编译压缩到dist目录下|

## 程序目录
这个项目的结构使用的是 **fractal(不规则碎片形：适合大型项目)***，方法的分组主要是依照特性而不是文件类型。注意，这个目录结构只是一个指引，并不一定要按这个来。这种结构谐在让程序更容易扩展
```
.
├── bin                       # 启动脚本
├── build                     # 所有打包配置项 包含webpack的指定环境配置文件
├── config                    # 项目配置文件
├── src                       # 程序源文件
│   ├── main.js              # 程序启动和渲染
│   ├── router.config.js     # 路由定义
│   ├── components           # 全局可复用的表现组件(Presentational Components)
│   ├── containers           # 全局可复用的容器组件
│   ├── styles               # 程序样式
├── static                    # 静态文件(不要到处imported源文件)
