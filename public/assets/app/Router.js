class Router {
  constructor() {
    this.routes = {};
  }

  addRoute(path, callback) {
    this.routes[path] = callback;
  }

  navigate(path) {
    this.routes[path]();
  }
}

export default Router;