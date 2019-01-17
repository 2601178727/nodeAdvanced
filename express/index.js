const http = require('http');
const url = require('url');

function createApplication () {
  let app = function (req, res) {
    const { pathname } = url.parse(req.url, true);
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
  app.get = function (path, handler) { // 代表客户端的get请求
    // 向数组里放置路由对象
    app.routes.push({
      method: 'get',
      path: path,
      handler: handler
    });
  };
  return app;
}

module.exports = createApplication;