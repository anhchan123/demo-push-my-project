import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import search from "../../assets/img/icon/search.png";
import heart from "../../assets/img/icon/heart.png";
import cart from "../../assets/img/icon/cart.png";
import logo from "../../assets/img/logo.png";
import mixitup from "mixitup";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { onDialogAuthState } from "../../store/slice";
import { localStorageConfig } from "../../config/config";
import SignInDialog from "../auth/sign-in";
import SignUpDialog from "../auth/sign-up";
import axios from "axios";
import { API_ENDPOINT } from "../../apis/api";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export interface ICart {
  color?: string;
  history?: [];
  id: string;
  lowStockThreshold: boolean;
  productId: string;
  quantity: number;
  reservedQuantity: number;
  size: string;
  status: string;
  variantSku: string;
  warehouseLocation: string;
  name: string;
  price: number;
}

const Header = (): JSX.Element => {
  const [currency, setCurrency] = useState("USD");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const navigate = useNavigate();

  const [cartData, setCartData] = useState<ICart[]>();

  const fethCartData = async () => {
    try {
      const res: any = await axios.get(API_ENDPOINT.INVENTORY);
      setCartData(res.data);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const isActive = (path: string) =>
    location.pathname === path ? "active" : "";

  const logined = sessionStorage.getItem("access_token");

  useEffect(() => {
    fethCartData();
    $(".loader").show();
    $("#preloder").show();

    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");

    $(".filter__controls li")
      .off("click")
      .on("click", function () {
        $(".filter__controls li").removeClass("active");
        $(this).addClass("active");
      });

    if ($(".product__filter").length > 0) {
      const containerEl = document.querySelector(".product__filter");
      mixitup(containerEl);
    }

    const token = sessionStorage.getItem("access_token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        localStorage.setItem("user_info", JSON.stringify(decoded));
        setUserEmail(decoded.email);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [location]);
  const handleOpen = () => dispatch(onDialogAuthState());
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem('user_info');
    toast.info("Logout Success!");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      <div id="preloder">
        <div className="loader"></div>
      </div>

      <SignInDialog />
      <SignUpDialog />

      <div className="offcanvas-menu-overlay" />
      <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__option">
          <div className="offcanvas__links">
            <a href="#">Sign in</a>
            <a href="#">FAQs</a>
          </div>
          <div className="offcanvas__top__hover">
            <span>{currency}</span>
          </div>
        </div>
        <div className="offcanvas__nav__option">
          <a href="#" className="search-switch">
            <img src={search} alt="" />
          </a>
          <a href="#">
            <img src={heart} alt="" />
          </a>
          <a href="/shopping-cart">
            <img src={cart} alt="" /> <span>0</span>
          </a>
          <div className="price">$0.00</div>
        </div>
        <div id="mobile-menu-wrap" />
        <div className="offcanvas__text">
          <p>
            Miễn phí vận chuyển, đảm bảo hoàn tiền hoặc trả hàng trong vòng 30
            ngày.
          </p>
        </div>
      </div>

      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7">
                <div className="header__top__left">
                  <p>
                    Free shipping, money back guarantee or returns within 30
                    days.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-5">
                <div className="header__top__right">
                  <div className="header__top__links">
                    {logined ? (
                      <>
                        <button
                          className="btn btn-link"
                          style={{ textDecoration: "none", color: "inherit" }}
                          onClick={() => navigate("/user")}
                        >
                          <a>{userEmail}</a>
                        </button>
                        <button
                          className="btn btn-link"
                          style={{ textDecoration: "none", color: "inherit" }}
                          onClick={handleLogout}
                        >
                          <a>Logout</a>
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-link"
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={handleOpen}
                      >
                        <a>Sign in</a>
                      </button>
                    )}
                    <a href="/blog">FAQs</a>
                  </div>
                  <div className="header__top__hover">
                    <span>{currency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="header__logo">
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className={isActive("/")}>
                    <Link to="/">Home</Link>
                  </li>
                  <li className={isActive("/shop")}>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li className={isActive("/pages")}>
                    <Link to="#">Pages</Link>
                    <ul className="dropdown">
                      <li className={isActive("/about")}>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li className={isActive("/shop-details")}>
                        <Link to="/shop-details">Shop Details</Link>
                      </li>
                      <li className={isActive("/shopping-cart")}>
                        <Link to="/shopping-cart">Shopping Cart</Link>
                      </li>
                      <li className={isActive("/checkout")}>
                        <Link to="/checkout">Check Out</Link>
                      </li>
                      <li className={isActive("/blog-details")}>
                        <Link to="/blog-details">Blog Details</Link>
                      </li>
                    </ul>
                  </li>
                  <li className={isActive("/blog")}>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li className={isActive("/contact")}>
                    <Link to="/contact">Contacts</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="header__nav__option">
                <a href="#" className="search-switch">
                  <img src={search} alt="" />
                </a>
                <a href="#">
                  <img src={heart} alt="" />
                </a>
                <a href="/shopping-cart">
                  <img src={cart} alt="" /> <span>{cartData?.length}</span>
                </a>
                <div className="price">
                  ${" "}
                  {cartData?.reduce(
                    (sum: number, item: ICart) => sum + item.price,
                    0
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="canvas__open">
            <i className="fa fa-bars" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
