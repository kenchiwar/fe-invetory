import { Outlet, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
function MainLayout () {
  return (
    <div>
      <Helmet>
        <meta name="keywords" content="React, SEO, Helmet, Vite, TypeScript" />
        <meta property="og:title" content="Trang Chủ " />
        <meta property="og:description" content="Trang chủ" />
        <meta property="og:type" content="website" />
      </Helmet>

      <header
        style={{ padding: "10px", background: "#282c34", color: "white" }}
      >
        <nav>
          <Link to="/" style={{ color: "white", marginRight: "10px" }}>
            🏠 Home
          </Link>
          <Link to="/read" style={{ color: "white" }}>
            ℹ️ read
          </Link>
        </nav>
      </header>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>

      <footer
        style={{ padding: "10px", background: "#eee", textAlign: "center" }}
      >
        © 2025 - My React App 🚀
      </footer>
    </div>
  );
}

export default MainLayout;
