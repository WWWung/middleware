const http = require("http");
const url = require("url");


function* lazyRoute(arr) {
  yield* arr;
}

class Server {
  constructor() {
  }
  queryRoutes(routes, method, path) {
    return (req, res) => {
      const lazy = lazyRoute(routes);
      (function next() {
        const route = lazy.next().value
        if (!route) {
          return res.end("err");
        }
        if ((route.method === method || method === "all") && (route.path === path || path === "*")) {
          route.fn(req, res);
        } else if (route.method === "use") {
          route.fn(req, res, next)
        } else {
          next()
        }
      })()
    }
  }
  start(req, res) {
    const path = url.parse(req.url, true).pathname;
    const method = req.method.toLowerCase();
    const router = this.queryRoutes(method, path);

  }
}
module.exports = new Server
