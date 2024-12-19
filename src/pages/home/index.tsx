import search from "../../assets/img/icon/search.png";
import heart from "../../assets/img/icon/heart.png";
import compare from "../../assets/img/icon/compare.png";
import hero1 from "../../assets/img/hero/hero-1.jpg";
import hero2 from "../../assets/img/hero/hero-2.jpg";
import banner1 from "../../assets/img/banner/banner-1.jpg";
import banner2 from "../../assets/img/banner/banner-2.jpg";
import banner3 from "../../assets/img/banner/banner-3.jpg";
import product1 from "../../assets/img/product/product-1.jpg";
import product2 from "../../assets/img/product/product-2.jpg";
import instagram1 from "../../assets/img/instagram/instagram-1.jpg";
import instagram2 from "../../assets/img/instagram/instagram-2.jpg";
import instagram3 from "../../assets/img/instagram/instagram-3.jpg";
import instagram4 from "../../assets/img/instagram/instagram-4.jpg";
import instagram5 from "../../assets/img/instagram/instagram-5.jpg";
import instagram6 from "../../assets/img/instagram/instagram-6.jpg";
import blog1 from "../../assets/img/blog/blog-1.jpg";
import calendarIcon from "../../assets/img/icon/calendar.png";
import blog3 from "../../assets/img/blog/blog-3.jpg";
import blog2 from "../../assets/img/blog/blog-2.jpg";

import productSale from "../../assets/img/product-sale.png";
import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import { TitleHelmet } from "../../components/common/title-helmet";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../apis/api";
import axios from "axios";
import { useNavigate, useRoutes } from "react-router-dom";
import { toast } from "react-toastify";

export interface IProducts {
  id: string;
  categoryId: string;
  Product_sku: string;
  Product_size: string;
  Product_rating: number;
  Product_price: number;
  Product_name: string;
  Product_isOnSale: boolean;
  Product_isNewArrival: boolean;
  Product_isBestSeller: boolean;
  Product_description: string;
  Product_currency: string;
  Product_count: number;
  Product_color: string[];
  IProducts: string
  Product_images: string
}

function HomePage() {

  const [productData, setProductData] = useState<IProducts[]>()
  const [newArrivals, setNewArrivals] = useState<boolean>(false)
  const [hotSales, setHotSales] = useState<boolean>(false)
  const [bestSeller, setBestSeller] = useState<boolean>(true)
  const route = useNavigate()

  const fetchProductData = async () => {
    try {
      const res = await axios.get(API_ENDPOINT.FETCH_PRODUCTS);
      setProductData(res.data);
    } catch (error) {
      console.log("cannot get product data:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleAddToCart = async (
    productId: string,
    producName: string,
    sku: string,
    price: number
  ) => {
    try {
      const res = await axios.post(API_ENDPOINT.INVENTORY, {
        productId: productId,
        variantSku: sku,
        quantity: 1,
        size: "XL",
        status: "Available",
        color: "Red",
        reservedQuantity: 100,
        lowStockThreshold: false,
        warehouseLocation: "Hanoi",
        name: producName,
        price: price
      });
      if (res.data) {
        toast.info("Successfull add product to cart!");
      }
    } catch (error) {
      toast.error("Error when add to cart!");
    }
  };

  console.log(productData)

  return (
    <>
      <TitleHelmet title="Home" />
      <Header />
      <section className="hero">
        <div className="hero__slider owl-carousel">
          <div
            className="hero__items set-bg"
            style={{ backgroundImage: `url(${hero1})` }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-5 col-lg-7 col-md-8">
                  <div className="hero__text">
                    <h6>Summer Collection</h6>
                    <h2>Fall - Winter Collections 2030</h2>
                    <p>
                      A specialist label creating luxury essentials. Ethically
                      crafted with an unwavering commitment to exceptional
                      quality.
                    </p>
                    <a href="/shop" className="primary-btn">
                      Shop now <span className="arrow_right" />
                    </a>
                    <div className="hero__social">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hero__items set-bg"
            style={{ backgroundImage: `url(${hero2})` }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-5 col-lg-7 col-md-8">
                  <div className="hero__text">
                    <h6>Summer Collection</h6>
                    <h2>Fall - Winter Collections 2030</h2>
                    <p>
                      A specialist label creating luxury essentials. Ethically
                      crafted with an unwavering commitment to exceptional
                      quality.
                    </p>
                    <a href="/shop" className="primary-btn">
                      Shop now <span className="arrow_right" />
                    </a>
                    <div className="hero__social">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section End */}
      {/* Banner Section Begin */}
      <section className="banner spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 offset-lg-4">
              <div className="banner__item">
                <div className="banner__item__pic">
                  <img src={banner1} alt="" />
                </div>
                <div className="banner__item__text">
                  <h2>Clothing Collections 2030</h2>
                  <a href="/shop">Shop now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="banner__item banner__item--middle">
                <div className="banner__item__pic">
                  <img src={banner2} alt="" />
                </div>
                <div className="banner__item__text">
                  <h2>Accessories</h2>
                  <a href="/shop">Shop now</a>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="banner__item banner__item--last">
                <div className="banner__item__pic">
                  <img src={banner3} alt="" />
                </div>
                <div className="banner__item__text">
                  <h2>Shoes Spring 2030</h2>
                  <a href="/shop">Shop now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section End */}
      {/* Product Section Begin */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="filter__controls">
                <li className="active" data-filter="*" onClick={()=>{
                  setBestSeller(true)
                  setHotSales(false)
                  setNewArrivals(false)
                }}>
                  Best Sellers
                </li>
                <li data-filter=".new-arrivals" onClick={()=> {
                  setNewArrivals(true)
                  setBestSeller(false)
                  setHotSales(false)
                }}>New Arrivals</li>
                <li data-filter=".hot-sales" onClick={()=>{
                  setHotSales(true)
                  setBestSeller(false)
                  setNewArrivals(false)
                }}>Hot Sales</li>
              </ul>
            </div>
          </div>
          <div className="row product__filter">
          {
              bestSeller && productData?.filter((item)=>(item.Product_isBestSeller === true)).map((product: IProducts,index:number)=>(
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
              <div className="product__item" >
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: `url(${product.Product_images})` }}
                  onClick={()=>route(`/product/${product.id}`)}
                >
                  <span className="label">New</span>
                  <ul className="product__hover">
                    <li>
                      <a href="#">
                        <img src={heart} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={compare} alt="" /> <span>Compare</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={search} alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>{product.Product_name}</h6>
                  <a href="#" className="add-cart" onClick={() =>
                            handleAddToCart(
                              product.id,
                              product.Product_name,
                              product.Product_sku,
                              product.Product_price
                            )
                          }>
                    + Add To Cart
                  </a>
                  <div className="rating">
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                  </div>
                  <h5>$ {product.Product_price}</h5>
                  <div className="product__color__select">
                    <label htmlFor="pc-1">
                      <input type="radio" id="pc-1" />
                    </label>
                    <label className="active black" htmlFor="pc-2">
                      <input type="radio" id="pc-2" />
                    </label>
                    <label className="grey" htmlFor="pc-3">
                      <input type="radio" id="pc-3" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
              ))
            }
            {
              newArrivals && productData?.filter((item)=>(item.Product_isNewArrival === true)).map((product: IProducts,index:number)=>(
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: `url(${product.Product_images})` }}
                  onClick={()=>route(`/product/${product.id}`)}
                >
                  <span className="label">New</span>
                  <ul className="product__hover">
                    <li>
                      <a href="#">
                        <img src={heart} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={compare} alt="" /> <span>Compare</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={search} alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>{product.Product_name}</h6>
                  <a href="#" className="add-cart" onClick={() =>
                            handleAddToCart(
                              product.id,
                              product.Product_name,
                              product.Product_sku,
                              product.Product_price
                            )
                          }>
                    + Add To Cart
                  </a>
                  <div className="rating">
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                  </div>
                  <h5>$ {product.Product_price}</h5>
                  <div className="product__color__select">
                    <label htmlFor="pc-1">
                      <input type="radio" id="pc-1" />
                    </label>
                    <label className="active black" htmlFor="pc-2">
                      <input type="radio" id="pc-2" />
                    </label>
                    <label className="grey" htmlFor="pc-3">
                      <input type="radio" id="pc-3" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
              ))
            }
            {
              hotSales && productData?.filter((item)=>(item.Product_isOnSale===true)).map((product:IProducts,index:number)=> (
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: `url(${product.Product_images})` }}
                  onClick={()=>route(`/product/${product.id}`)}
                >
                  <ul className="product__hover">
                    <li>
                      <a href="#">
                        <img src={heart} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={compare} alt="" /> <span>Compare</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={search} alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>{product.Product_name}</h6>
                  <a href="#" className="add-cart" onClick={() =>
                            handleAddToCart(
                              product.id,
                              product.Product_name,
                              product.Product_sku,
                              product.Product_price
                            )
                          }>
                    + Add To Cart
                  </a>
                  <div className="rating">
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                    <i className="fa fa-star-o" />
                  </div>
                  <h5>$ {product.Product_price}</h5>
                  <div className="product__color__select">
                    <label htmlFor="pc-4">
                      <input type="radio" id="pc-4" />
                    </label>
                    <label className="active black" htmlFor="pc-5">
                      <input type="radio" id="pc-5" />
                    </label>
                    <label className="grey" htmlFor="pc-6">
                      <input type="radio" id="pc-6" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
              ))
            }
            
          </div>
        </div>
      </section>
      {/* Product Section End */}
      {/* Categories Section Begin */}
      <section className="categories spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="categories__text">
                <h2>
                  Clothings Hot <br /> <span>Shoe Collection</span> <br />{" "}
                  Accessories
                </h2>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="categories__hot__deal">
                <img src={productSale} alt="" />
                <div className="hot__deal__sticker">
                  <span>Sale Of</span>
                  <h5>$29.99</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1">
              <div className="categories__deal__countdown">
                <span>Deal Of The Week</span>
                <h2>Multi-pocket Chest Bag Black</h2>
                <div
                  className="categories__deal__countdown__timer"
                  id="countdown"
                >
                  <div className="cd-item">
                    <span>3</span>
                    <p>Days</p>
                  </div>
                  <div className="cd-item">
                    <span>1</span>
                    <p>Hours</p>
                  </div>
                  <div className="cd-item">
                    <span>50</span>
                    <p>Minutes</p>
                  </div>
                  <div className="cd-item">
                    <span>18</span>
                    <p>Seconds</p>
                  </div>
                </div>
                <a href="/shop" className="primary-btn">
                  Shop now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section End */}
      {/* Instagram Section Begin */}
      <section className="instagram spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="instagram__pic">
                <div
                  className="instagram__pic__item set-bg"
                  style={{ backgroundImage: `url(${instagram1})` }}
                />
                <div
                  className="instagram__pic__item set-bg"
                  style={{ backgroundImage: `url(${instagram2})` }}
                />
                <div
                  className="instagram__pic__item set-bg"
                  style={{ backgroundImage: `url(${instagram3})` }}
                />
                <div
                  className="instagram__pic__item set-bg"
                  style={{ backgroundImage: `url(${instagram4})` }}
                />
                <div
                  className="instagram__pic__item set-bg"
                  style={{ backgroundImage: `url(${instagram5})` }}
                />
                <div
                  className="instagram__pic__item set-bg"
                  style={{ backgroundImage: `url(${instagram6})` }}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="instagram__text">
                <h2>Instagram</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <h3>#Male_Fashion</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Instagram Section End */}
      {/* Latest Blog Section Begin */}
      <section className="latest spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Latest News</span>
                <h2>Fashion New Trends</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="blog__item">
                <div
                  className="blog__item__pic"
                  style={{ backgroundImage: `url(${blog1})` }}
                />

                <div className="blog__item__text">
                  <span>
                    <img src={calendarIcon} alt="Calendar" /> 16 February 2020
                  </span>
                  <h5>What Curling Irons Are The Best Ones</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="blog__item">
                <div
                  className="blog__item__pic"
                  style={{ backgroundImage: `url(${blog2})` }}
                />

                <div className="blog__item__text">
                  <span>
                    <img src={calendarIcon} alt="" /> 21 February 2020
                  </span>
                  <h5>Eternity Bands Do Last Forever</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="blog__item">
                <div
                  className="blog__item__pic"
                  style={{ backgroundImage: `url(${blog3})` }}
                />
                <div className="blog__item__text">
                  <span>
                    <img src={calendarIcon} alt="Calendar" /> 28 February 2020
                  </span>
                  <h5>The Health Benefits Of Sunglasses</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default HomePage;
