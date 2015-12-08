
nej-livereload
===============

An implementation of the LiveReload server in Node.js. It's an alternative to the graphical [http://livereload.com/](http://livereload.com/) application, which monitors files for changes and reloads your web browser.
本插件基于Node.js实现了LiveReload的服务端，它替代了（http://livereload.com/）官网提供的服务软件，所做的功能都是用于监听文件变化并自动刷新你的网页。

# Example Usage

You can use this by either adding a snippet of code to the bottom of your HTML pages **or** install the Browser Extensions.
你有两种方式来连接这个服务端：一种是安装(http://livereload.com/)网站提供的插件，一种是在你的HTML页面尾部添加一段JS代码。
ps:需要说明的是，(http://livereload.com/)官网提供的插件是开源免费的，但是提供的服务端是收费的。

## Method 1: Add browser extension

Install the LiveReload browser plugins by visiting [chrome: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei]).
安装LiveReload提供的浏览器插件，Chrome插件：[https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei]

Only Google Chrome supports viewing `file:///` URLS, and you have to specifically enable it. If you are using other browsers and want to use `file:///` URLs, add the JS code to the page as shown in the next section.

## Method 2: Add code to page

Add this code:

```
<script>
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
  ':35729/livereload.js?snipver=1"></' + 'script>')
</script>
```

Note: If you are using a different port other than `35729` you will
need to change the above script.
在HTML页面body闭合之前添加上面的js代码，注意如果你的服务端的端口号作了修改，上面代码中的端口号也要做修改。

# Running LiveReload

You can run LiveReload two ways:
你有两种方法运行nej-livereload:

## Option 1: Command line

To use livereload from the command line:
```
    $ npm install -g livereload
    $ livereload [path]
```
第一种方法在命令行，运行上面的命令。

## Option 2: From within your own project

To use the api within a project:
第二种方法，为了使用livereload的api，先安装这个模块：
```
    $ npm install livereload
```
Then, create a server and fire it up.
然后创建一个服务器，并启动。
```
    livereload = require('livereload');
    server = livereload.createServer();
    server.watch(__dirname + "/public");
```
You can also use this with a Connect server. Here's an example of a simple server
using `connect` and a few other modules just to give you an idea:
你也可以使用Connect服务器，下面是一个使用connect和其他模块的例子

```
var connect  = require('connect');
var compiler = require('connect-compiler');
var static = require('serve-static');

var server = connect();

server.use(
  compiler({
      enabled : [ 'coffee', 'uglify' ],
      src     : 'src',
      dest    : 'public'
  })
);

server.use(  static(__dirname + '/public'));

server.listen(3000);

livereload = require('livereload');
server = livereload.createServer();
server.watch(__dirname + "/public");
```

You can then start up the server which will listen on port `3000`.
你可以启动你的服务器了，监听端口是3000
## Watching multiple paths:

Passing an array of paths or glob patterns will allow you to watch multiple directories. All directories have the same configuration options.
如果需要监听多个目录，你可以在watch的参数中传入一个数组。

```js
server.watch([__dirname + "/js", __dirname + "/css"]);
```

## Using the `originalPath` option:

```js
// server.js
var server = livereload.createServer({
    originalPath: "http://domain.com"
});
server.watch('/User/Workspace/test');
```

Then run the server:
然后可以启动服务器：
```
$ node server.js`
```
Then, assuming your HTML file has a stylesheet link like this:
假设你的HTML页面有一个CSS文件的链接，如下：
```html
<!-- html -->
<head>
    <link rel="stylesheet" href="http://domain.com/css/style.css">
</head>
```

When `/User/Workspace/test/css/style.css` is modified, the stylesheet will be reload.
当`/User/Workspace/test/css/style.css`这个文件修改的时候，会自动更新加载新的css文件。
# Command-line Options

The commandline options are
命令控制行的选项：

* `-p` or `--port` to specify the listening port
* `-d` or `--debug` to show debug messages when the browser reloads.
* `-e` or `--exts` to include additional extentions that you want to observe. An example being -e 'jade scss'.  
* `-u` or `--usepolling` to poll for file system changes. Set this to true to successfully watch files over a network.

Specify the path when using the options.
使用选项的时候，需要制定路径
```
$ livereload . -i 200
```


# API Options

The `createServer()` method supports a few basic options, passed as a JavaScript object:

* `https` is an optional object of options to be passed to [https.createServer](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) (if not provided, `http.createServer` is used instead)
* `port` is the listening port. It defaults to `35729` which is what the LiveReload extensions use currently.
* `exts` is an array of extensions you want to observe. The default extensions are  `html`, `css`, `js`, `png`, `gif`, `jpg`,
  `php`, `php5`, `py`, `rb`,  `erb`, and "coffee."
* `applyJSLive` tells LiveReload to reload JavaScript files in the background instead of reloading the page. The default for this is `false`.
* `applyCSSLive` tells LiveReload to reload CSS files in the background instead of refreshing the page. The default for this is `true`.
* `applyImgLive` tells LiveReload to reload image files in the background instead of refreshing the page. The default for this is `true`. Namely for these extensions: jpg, jpeg, png, gif
* `exclusions` lets you specify files to ignore. By default, this includes `.git/`, `.svn/`, and `.hg/`
* `originalPath` Set URL you use for development, e.g 'http:/domain.com', then LiveReload will proxy this url to local path.
* `overrideURL` lets you specify a different host for CSS files. This lets you edit local CSS files but view a live site. See <http://feedback.livereload.com/knowledgebase/articles/86220-preview-css-changes-against-a-live-site-then-uplo> for details.
* `usePolling` Poll for file system changes. Set this to true to successfully watch files over a network.



# License

Copyright (c) 2010-2015 Chale Cao Brian P. Hogan and Joshua Peek

Released under the MIT license. See `LICENSE` for details.
