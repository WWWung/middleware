class Route {
  constructor() {
    this.routes = [];
  }
  get(path, fn) {
    this.routes.push({path, fn, method: "get"})
  }
  post(path, fn) {
    this.routes.push({path, fn, method: "get"})
  }
  "delete"(path, fn) {
    this.routes.push({path, fn, method: "get"})
  }
  all(path, fn) {
    this.routes.push({path, fn, method: "get"})
  }
  put(path, fn) {
    this.routes.push({path, fn, method: "get"})
  }
  options(path, fn) {
    this.routes.push({path, fn, method: "get"})
  }
  use(fn) {
    this.routes.push({path: "*", fn, method: "use"})
  }
}

module.exports =  new Route()
