import PostsPage from "./component/PostsPage.js";
import { initRouter } from "./router/router.js";

export default function App({ $target, initialState }) {
  const postsPage = new PostsPage({
    $target,
    initialState: [],
    listRendering: () => setState(),
  });

  this.route = async () => {
    $target.innerHTML = "";

    const { pathname } = window.location;

    if (pathname === "/") {
      postsPage.setState();
    } else if (pathname.indexOf("/documents") === 0) {
      const [, , id] = pathname.split("/");

      await postsPage.setState({ id });
    } else {
      $target.innerHTML = "<h1>404 Not Found</h1>";
    }
  };

  this.route();
  initRouter(() => this.route());

  window.addEventListener("popstate", () => this.route());
}
