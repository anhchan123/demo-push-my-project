import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/home";
import NotFound from "./pages/not-found";
import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/elegant-icons.css";
import "./css/magnific-popup.css";
import "./css/nice-select.css";
import "./css/owl.carousel.min.css";
import "./css/slicknav.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/style.css";
import "font-awesome/css/font-awesome.min.css";
import "./js/jquery-3.3.1.min.js";
import "./js/bootstrap.min.js";
import "./js/jquery.nice-select.min.js";
import "./js/jquery.nicescroll.min.js";
import "./js/jquery.magnific-popup.min.js";
import "./js/jquery.countdown.min.js";
import "./js/jquery.slicknav.js";
import "./js/mixitup.min.js";
import "./js/owl.carousel.min.js";
import "./js/main.js";
import AboutPage from "./pages/about";
import ShopPage from "./pages/shop/index.js";
import BlogPage from "./pages/blog/index.js";
import ContactPage from "./pages/contact/index.js";
import ShopDetailsPage from "./pages/shop/details/index.js";
import ShoppingCartPage from "./pages/shop/cart/index.js";
import CheckoutPage from "./pages/checkout/index.js";
import BlogDetailsPage from "./pages/blog/details/index.js";
import Dashboard from "./scenes/dashboard/index.js";
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "./scenes/global/Sidebar.js";
import "./App.css";
import Products from "./scenes/products/index.js";
import UserPage from "./pages/user/index.js";
import Category from "./scenes/category/index.js";
import Reviews from "./scenes/review/index.js";
import Blog from "./scenes/blog/index.js";
import Order from "./scenes/order/index.js";
import User from "./scenes/contacts/index.js";
import { useEffect, useState } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const isAuthenticated = !!sessionStorage.getItem("access_token");
  const userInfo = localStorage.getItem("user_info")
    ? JSON.parse(localStorage.getItem("user_info") as string)
    : null;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppLayout />
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function AppLayout() {
  const location = useLocation();
  const [canAdminLayout, setCanAdminLayout] = useState<boolean>(false);

  // Lắng nghe sự thay đổi của route và kiểm tra nếu URL có chứa '/admin'
  useEffect(() => {
    const isAdminPath = window.location.pathname.includes("/admin");
    setCanAdminLayout(isAdminPath);
    console.log(
      "Current Path:",
      window.location.pathname,
      "| Is Admin:",
      isAdminPath
    );
  }, [location.pathname]); // Mỗi khi location.pathname thay đổi, useEffect sẽ chạy

  return (
    <div className="app">
      {canAdminLayout && <Sidebar />}{" "}
      {/* Hiển thị Sidebar nếu là trang admin */}
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog-details/:id" element={<BlogDetailsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ShopDetailsPage />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/user" element={<UserPage />} />

          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/review" element={<Reviews />} />
          <Route path="/admin/blog" element={<Blog />} />
          <Route path="/admin/users" element={<User />} />
          <Route path="/admin/orders" element={<Order />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
