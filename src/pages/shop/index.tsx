import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import productImage2 from "../../assets/img/product/product-2.jpg";
// import productImage3 from "../../assets/img/product/product-3.jpg";
// import productImage4 from "../../assets/img/product/product-4.jpg";
// import productImage6 from "../../assets/img/product/product-6.jpg";
// import productImage7 from "../../assets/img/product/product-7.jpg";
// import productImage8 from "../../assets/img/product/product-8.jpg";
// import productImage9 from "../../assets/img/product/product-9.jpg";
// import productImage10 from "../../assets/img/product/product-10.jpg";
// import productImage11 from "../../assets/img/product/product-11.jpg";
// import productImage12 from "../../assets/img/product/product-12.jpg";
// import productImage13 from "../../assets/img/product/product-13.jpg";
// import productImage14 from "../../assets/img/product/product-14.jpg";
import { TitleHelmet } from "../../components/common/title-helmet";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../../apis/api";
import { toast } from "react-toastify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

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
  Product_color: string[]
  Product_images: string
}
const ShopPage = () => {
  const [params] = useSearchParams()
  const searchParams = params.get('search')
  const [productData, setProductData] = useState<IProducts[]>();
  const [searchValue, setSearchValue] = useState<Object>({
    Product_name: "",
    page: 1,
    limit: 6,
    Product_size: "",
    Product_color: null,
    Product_price: { minPrice: null, maxPrice: null },
  });
  const route = useNavigate()
  const fetchProductData = async () => {
    try {
      const res = await axios.get(API_ENDPOINT.FETCH_PRODUCTS);
      setProductData(res.data);
    } catch (error) {
      console.log("cannot get product data:", error);
    }
  }

  useEffect(() => {
    if(searchParams){
      handleSearch({...searchValue,Product_name:searchParams})
    }
    else{
      fetchProductData()
    }
  }, []);

  const handleSearch = async (value: object) => {
    try {
      const res = await axios.get(API_ENDPOINT.SEARCH_PRODUCTS, {
        params: value,
      });
      setProductData(res.data.data);
    } catch (error) {
      toast.error("Product Not Found!");
      console.log("search fail:", error);
    }
  };
  //shop page doesn't have logic pick color, quantity and size of product => parse init value instead
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

  return (
    <>
      <TitleHelmet title="Shop" />
      <Header />
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Shop</h4>
                <div className="breadcrumb__links">
                  <a href="/">Home</a>
                  <span>Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Shop Section Begin */}
      <section className="shop spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop__sidebar">
                <div className="shop__sidebar__search">
                  <div className="formm">
                    <input
                      onChange={(e) =>
                        setSearchValue({
                          ...searchValue,
                          Product_name: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Search..."
                    />
                    <button
                      type="button"
                      onClick={() => handleSearch(searchValue)}
                    >
                      <span className="icon_search" />
                    </button>
                  </div>
                </div>
                <div className="shop__sidebar__accordion">
                  <div className="accordion" id="accordionExample">
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseOne">
                          Categories
                        </a>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__categories">
                            <ul className="nice-scroll">
                              <li>
                                <a href="#">Men (20)</a>
                              </li>
                              <li>
                                <a href="#">Women (20)</a>
                              </li>
                              <li>
                                <a href="#">Bags (20)</a>
                              </li>
                              <li>
                                <a href="#">Clothing (20)</a>
                              </li>
                              <li>
                                <a href="#">Shoes (20)</a>
                              </li>
                              <li>
                                <a href="#">Accessories (20)</a>
                              </li>
                              <li>
                                <a href="#">Kids (20)</a>
                              </li>
                              <li>
                                <a href="#">Kids (20)</a>
                              </li>
                              <li>
                                <a href="#">Kids (20)</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseTwo">
                          Branding
                        </a>
                      </div>
                      <div
                        id="collapseTwo"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__brand">
                            <ul>
                              <li>
                                <a href="#">Louis Vuitton</a>
                              </li>
                              <li>
                                <a href="#">Chanel</a>
                              </li>
                              <li>
                                <a href="#">Hermes</a>
                              </li>
                              <li>
                                <a href="#">Gucci</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseThree">
                          Filter Price
                        </a>
                      </div>
                      <div
                        id="collapseThree"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__price">
                            <ul>
                              <li>
                                <a
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleSearch({
                                      ...searchValue,
                                      minPrice: 0,
                                      maxPrice: 50,
                                    })
                                  }
                                >
                                  $0.00 - $50.00
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() =>
                                    handleSearch({
                                      ...searchValue,
                                      minPrice: 50,
                                      maxPrice: 100,
                                    })
                                  }
                                >
                                  $50.00 - $100.00
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() =>
                                    handleSearch({
                                      ...searchValue,
                                      minPrice: 100,
                                      maxPrice: 150,
                                    })
                                  }
                                >
                                  $100.00 - $150.00
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() =>
                                    handleSearch({
                                      ...searchValue,
                                      minPrice: 150,
                                      maxPrice: 200,
                                    })
                                  }
                                >
                                  $150.00 - $200.00
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() =>
                                    handleSearch({
                                      ...searchValue,
                                      minPrice: 200,
                                      maxPrice: 250,
                                    })
                                  }
                                >
                                  $200.00 - $250.00
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() =>
                                    handleSearch({
                                      ...searchValue,
                                      minPrice: 250,
                                    })
                                  }
                                >
                                  250.00+
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseFour">
                          Size
                        </a>
                      </div>
                      <div
                        id="collapseFour"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__size">
                            <label
                              htmlFor="xs"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_size: "XS",
                                })
                              }
                            >
                              xs
                              <input type="radio" id="xs" />
                            </label>
                            <label
                              htmlFor="sm"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_size: "S",
                                })
                              }
                            >
                              s
                              <input type="radio" id="sm" />
                            </label>
                            <label
                              htmlFor="md"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_size: "M",
                                })
                              }
                            >
                              m
                              <input type="radio" id="md" />
                            </label>
                            <label
                              htmlFor="xl"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_size: "XL",
                                })
                              }
                            >
                              xl
                              <input type="radio" id="xl" />
                            </label>
                            <label
                              htmlFor="2xl"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_size: "2XL",
                                })
                              }
                            >
                              2xl
                              <input type="radio" id="2xl" />
                            </label>
                            {/* <label htmlFor="xxl" onClick={()=>handleSearch({...searchValue,Product_size: "XXL"})}>
                              xxl
                              <input type="radio" id="xxl" />
                            </label> */}
                            <label
                              htmlFor="3xl"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_size: "3XL",
                                })
                              }
                            >
                              3xl
                              <input type="radio" id="3xl" />
                            </label>
                            <label
                              htmlFor="4xl"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_size: "4XL",
                                })
                              }
                            >
                              4xl
                              <input type="radio" id="4xl" />
                            </label>
                            <label
                              htmlFor="clear"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_size: "",
                                })
                              }
                            >
                              Clear
                              <input type="radio" id="4xl" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseFive">
                          Colors
                        </a>
                      </div>
                      <div
                        id="collapseFive"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__color">
                            <label
                              className="c-1"
                              htmlFor="sp-1"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_color: "Black",
                                })
                              }
                            >
                              <input type="radio" id="sp-1" />
                            </label>
                            <label
                              className="c-2"
                              htmlFor="sp-2"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_color: "Blue",
                                })
                              }
                            >
                              <input type="radio" id="sp-2" />
                            </label>
                            <label
                              className="c-3"
                              htmlFor="sp-3"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_color: "Yellow",
                                })
                              }
                            >
                              <input type="radio" id="sp-3" />
                            </label>
                            <label className="c-4" htmlFor="sp-4">
                              <input type="radio" id="sp-4" />
                            </label>
                            <label className="c-5" htmlFor="sp-5">
                              <input type="radio" id="sp-5" />
                            </label>
                            <label className="c-6" htmlFor="sp-6">
                              <input type="radio" id="sp-6" />
                            </label>
                            <label className="c-7" htmlFor="sp-7">
                              <input type="radio" id="sp-7" />
                            </label>
                            <label
                              className="c-8"
                              htmlFor="sp-8"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_color: "Red",
                                })
                              }
                            >
                              <input type="radio" id="sp-8" />
                            </label>
                            <label
                              className="c-9"
                              htmlFor="sp-9"
                              onClick={() =>
                                handleSearch({
                                  ...searchValue,
                                  Product_color: "White",
                                })
                              }
                            >
                              <input type="radio" id="sp-9" />
                            </label>
                          </div>
                          <label
                            style={{
                              backgroundColor: "#f1f5f8",
                              padding: 4,
                              fontWeight: "bold",
                            }}
                            htmlFor="sp-9"
                            onClick={() =>
                              handleSearch({
                                ...searchValue,
                                Product_color: null,
                              })
                            }
                          >
                            CLEAR
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseSix">
                          Tags
                        </a>
                      </div>
                      <div
                        id="collapseSix"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__tags">
                            <a href="#">Product</a>
                            <a href="#">Bags</a>
                            <a href="#">Shoes</a>
                            <a href="#">Fashio</a>
                            <a href="#">Clothing</a>
                            <a href="#">Hats</a>
                            <a href="#">Accessories</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="shop__product__option">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__left">
                      <p>Showing 1–6 of {productData?.length} results</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__right">
                      <p>Sort by Price:</p>
                      <select>
                        <option value="">Low To High</option>
                        <option value="">$0 - $55</option>
                        <option value="">$55 - $100</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {productData?.map((product: any) => (
                  <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
                    <div
                      className={`product__item ${
                        product.Product_isOnSale ? "sale" : ""
                      }`}
                    >
                      <div
                        className="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${product.Product_images})` }}
                        onClick={()=>route(`/product/${product.id}`)}
                      >
                        {product.Product_isOnSale && (
                          <span className="label">Sale</span>
                        )}
                        <ul className="product__hover">
                          <li>
                            <a href="#">
                              <img src="img/icon/heart.png" alt="" />
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon/compare.png" alt="" />{" "}
                              <span>Compare</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img src="img/icon/search.png" alt="" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6>{product.Product_name}</h6>
                        <a
                          className="add-cart"
                          onClick={() =>
                            handleAddToCart(
                              product.id,
                              product.Product_name,
                              product.Product_sku,
                              product.Product_price
                            )
                          }
                        >
                          + Add To Cart
                        </a>
                        <div className="rating">
                          {Array(5)
                            .fill(0)
                            .map((_, index) => (
                              <i
                                key={index}
                                className={`fa ${
                                  index < product.Product_rating
                                    ? "fa-star"
                                    : "fa-star-o"
                                }`}
                              />
                            ))}
                        </div>
                        <h5>
                          $
                          {product.Product_price}
                        </h5>

                        <div className="product__color__select">
                          {product?.Product_color?.map(
                            (color: any, index: any) => (
                              <label
                                key={index}
                                style={{ backgroundColor: color.toLowerCase() }}
                                htmlFor={`pc-${product.id}-${index}`}
                              >
                                <input
                                  type="radio"
                                  id={`pc-${product.id}-${index}`}
                                />
                              </label>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="product__pagination">
                    <a className="active" href="#">
                      1
                    </a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <span>...</span>
                    <a href="#">21</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ShopPage;
