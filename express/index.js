const http = require('http');
const url = require('url');

function createApplication () {
  let app = function (req, res) {
    const { pathname } = url.parse(req.url, true); // 拿到路径
    for(let i = 0; i < app.routes.length; i++) {
      let route = app.routes[i];
      if (route.method == req.method.toLowerCase() &&
          route.path == pathname) { // 请求方式、请求地址一致
        return route.handler(req, res);
      }
      res.end(`Cannot ${req.method} ${pathname}`); // 没有匹配到返回字符串
    }
  };
  app.listen = function () {
    let server = http.createServer(app);
    server.listen.apply(server, arguments);
  };
  app.routes = []; // 此数组用来保存路由规则
  http.METHODS.forEach(function(method) { // 循环请求方式数组
    method = method.toLocaleLowerCase();
    app[method] = function (path, handler) { // 代表客户端的请求
      // 向数组里放置路由对象
      app.routes.push({
        method: method,
        path: path,
        handler: handler
      });
    };
  });
  
  return app;
}

module.exports = createApplication;