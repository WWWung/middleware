const http = require("http");
const url = require("url");

const app = {};
const routes = [];
["get", "post", "all", "delete", "use"].forEach(method => {
  app[method] = (path, fn) => {
    if (method === "use") {
      routes.push({path: '*', fn: path, method})
    } else {
      routes.push({path, fn, method})
    }
  }
})
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next()
})
app.get('/', (req, res) => {
  res.end('/');
})
app.post('/api', (req, res) => {
  res.end('/api');
})
console.log(routes)
app.start = (port, host) => {
  http.createServer((req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    const path = url.parse(req.url, true).pathname
    console.log(path)
    const method = req.method.toLowerCase()
    const router = passRoutes(routes, method, path);
    router(req, res);
  }).listen(port, host)
  console.log("server running...")
}
app.start("1234", "");
function queryRoutes(method, path) {
  var fn = null
  for (let route of routes) {
    if ((route.method === method || method === "all") && (route.path === path || path === "*")) {
      fn = route.fn
      break
    }
  }
  if (!fn) {
    fn = (req, res) => {
      res.end('err')
    }
  }
  return fn
}

//  es6 generator
function * lazyRoute(arr) {
  yield * arr
}


function passRoutes(routes, method, path) {
  return (req, res) => {
    const lazy = lazyRoute(routes);
    (function next() {
      const route = lazy.next().value
      if (!route) {
        //  generator已经执行完了还没有匹配到路由
        res.end('err');
      }

      if (route.path === path && route.method === method) {
        //  匹配到路由则执行路由池里的函数
        route.fn(req, res);
      } else if (route.method === "use") {
        //  如果是非路由中间件，把这个函数作为参数传入并执行
        route.fn(req, res, next)
      } else {
        //  继续匹配
        next()
      }
    })()
  }
}
