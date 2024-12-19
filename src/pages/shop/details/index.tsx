import Footer from "../../../components/common/footer";
import Header from "../../../components/common/header";
import thumb1 from "../../../assets/img/shop-details/thumb-1.png";
import thumb2 from "../../../assets/img/shop-details/thumb-2.png";
import thumb3 from "../../../assets/img/shop-details/thumb-3.png";
import thumb4 from "../../../assets/img/shop-details/thumb-4.png";
import productBig1 from "../../../assets/img/shop-details/product-big-2.png";
import productBig2 from "../../../assets/img/shop-details/product-big-3.png";
import productBig3 from "../../../assets/img/shop-details/product-big.png";
import productBig4 from "../../../assets/img/shop-details/product-big-4.png";
import detailsPayment from "../../../assets/img/shop-details/details-payment.png";
import product1 from "../../../assets/img/product/product-1.jpg";
import product2 from "../../../assets/img/product/product-2.jpg";
import product3 from "../../../assets/img/product/product-3.jpg";
import product4 from "../../../assets/img/product/product-4.jpg";
import search from "../../../assets/img/icon/search.png";
import heart from "../../../assets/img/icon/heart.png";
import compare from "../../../assets/img/icon/compare.png";
import { TitleHelmet } from "../../../components/common/title-helmet";
import { replace, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProducts } from "..";
import { toast } from "react-toastify";
import axios from "axios";
import { API_ENDPOINT } from "../../../apis/api";

const products = [
  {
    id: 1,
    name: "Piqué Biker Jacket",
    image: product1,
    label: "New",
    price: "$67.24",
    rating: 0,
    colors: ["pc-1", "pc-2", "pc-3"],
  },
  {
    id: 2,
    name: "Piqué Biker Jacket",
    image: product2,
    label: "",
    price: "$67.24",
    rating: 0,
    colors: ["pc-4", "pc-5", "pc-6"],
  },
  {
    id: 3,
    name: "Multi-pocket Chest Bag",
    image: product3,
    label: "Sale",
    price: "$43.48",
    rating: 4,
    colors: ["pc-7", "pc-8", "pc-9"],
  },
  {
    id: 4,
    name: "Diagonal Textured Cap",
    image: product4,
    label: "",
    price: "$60.9",
    rating: 0,
    colors: ["pc-10", "pc-11", "pc-12"],
  },
];


const ShopDetailsPage = () => {

  const [productData, setProductData] = useState<IProducts>()
  const [relatedProduct, setRelatedProduct] = useState<IProducts[]>()

  const productId = useParams()
  const route = useNavigate()

  
  console.log(productId.id)
  const fetchProductData = async () => {
    try {
      const res = await axios.get(`${API_ENDPOINT.FETCH_PRODUCTS}/${productId.id}`)
      if(res.data){
        setProductData(res.data)
        console.log(res.data)
      }
      const res2 = await axios.get(API_ENDPOINT.SEARCH_PRODUCTS)
      if(res2.data){
        setRelatedProduct(res2.data.data)
        console.log(res2.data)
      }
    } catch (error) {
      toast.error("Fail to fetch product data!")
    }
  }

  useEffect(()=>{
    fetchProductData()
  },[productId.id])

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
      <TitleHelmet title="Shop Details" />
      <Header />
      <section className="shop-details">
        <div className="product__details__pic">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="product__details__breadcrumb">
                  <a href="/">Home</a>
                  <a href="/shop">Shop</a>
                  <span>Product Details</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tabs-1"
                      role="tab"
                    >
                      <div
                        className="product__thumb__pic set-bg"
                        style={{ backgroundImage: `url(${productData?.Product_images})` }}
                      />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tabs-2"
                      role="tab"
                    >
                      <div
                        className="product__thumb__pic set-bg"
                        style={{ backgroundImage: `url(${productData?.Product_images})` }}
                      />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tabs-3"
                      role="tab"
                    >
                      <div
                        className="product__thumb__pic set-bg"
                        style={{ backgroundImage: `url(${productData?.Product_images})` }}
                      />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tabs-4"
                      role="tab"
                    >
                      <div
                        className="product__thumb__pic set-bg"
                        style={{ backgroundImage: `url(${productData?.Product_images})` }}
                      >
                        <i className="fa fa-play" />
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-9">
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="product__details__pic__item">
                      <img src={productData?.Product_images} alt="Product 1" />
                    </div>
                  </div>
                  <div className="tab-pane" id="tabs-2" role="tabpanel">
                    <div className="product__details__pic__item">
                      <img src={productData?.Product_images} alt="Product 2" />
                    </div>
                  </div>
                  <div className="tab-pane" id="tabs-3" role="tabpanel">
                    <div className="product__details__pic__item">
                      <img src={productData?.Product_images} alt="Product 3" />
                    </div>
                  </div>
                  <div className="tab-pane" id="tabs-4" role="tabpanel">
                    <div className="product__details__pic__item">
                      <img src={productData?.Product_images} alt="Product 4" />
                      <a
                        href="https://www.youtube.com/watch?v=8PJ3_p7VqHw&list=RD8PJ3_p7VqHw&start_radio=1"
                        className="video-popup"
                      >
                        <i className="fa fa-play" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product__details__content">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <div className="product__details__text">
                  <h4>{productData?.Product_name}</h4>
                  <div className="rating">
                  {Array(5)
                            .fill(0)
                            .map((_, index) => (
                              <i
                                key={index}
                                className={`fa ${
                                  index < Number(productData?.Product_rating)
                                    ? "fa-star"
                                    : "fa-star-o"
                                }`}
                              />
                            ))}
                   
                    <span> - 5 Reviews</span>
                  </div>
                  <h3>
                    $ {productData?.Product_price} <span>70.00</span>
                  </h3>
                  <p>
                    Coat with quilted lining and an adjustable hood. Featuring
                    long sleeves with adjustable cuff tabs, adjustable
                    asymmetric hem with elastic side tabs and a front zip
                    fastening with placket.
                  </p>
                  <div className="product__details__option">
                    <div className="product__details__option__size">
                      <span>Size:</span>
                      <label htmlFor="xxl">
                        xxl
                        <input type="radio" id="xxl" />
                      </label>
                      <label className="active" htmlFor="xl">
                        xl
                        <input type="radio" id="xl" />
                      </label>
                      <label htmlFor="l" className="">
                        l
                        <input type="radio" id="l" />
                      </label>
                      <label htmlFor="sm">
                        s
                        <input type="radio" id="sm" />
                      </label>
                    </div>
                    <div className="product__details__option__color">
                      <span>Color:</span>
                      <label className="c-1" htmlFor="sp-1">
                        <input type="radio" id="sp-1" />
                      </label>
                      <label className="c-2" htmlFor="sp-2">
                        <input type="radio" id="sp-2" />
                      </label>
                      <label className="c-3" htmlFor="sp-3">
                        <input type="radio" id="sp-3" />
                      </label>
                      <label className="c-4" htmlFor="sp-4">
                        <input type="radio" id="sp-4" />
                      </label>
                      <label className="c-9" htmlFor="sp-9">
                        <input type="radio" id="sp-9" />
                      </label>
                    </div>
                  </div>
                  <div className="product__details__cart__option">
                    <div className="quantity">
                      <div className="pro-qty">
                        <input type="text" defaultValue={1} />
                      </div>
                    </div>
                    {
                      productData && <span  className="primary-btn" onClick={() =>
                        handleAddToCart(
                          productData.id,
                          productData.Product_name,
                          productData.Product_sku,
                          productData.Product_price
                        )
                      }>
                  add to cart
                </span>
                    }
                  </div>
                  <div className="product__details__btns__option">
                    <a href="#">
                      <i className="fa fa-heart" /> add to wishlist
                    </a>
                    <a href="#">
                      <i className="fa fa-exchange" /> Add To Compare
                    </a>
                  </div>
                  <div className="product__details__last__option">
                    <h5>
                      <span>Guaranteed Safe Checkout</span>
                    </h5>
                    <img src={detailsPayment} alt="payment details" />
                    <ul>
                      <li>
                        <span>SKU:</span> {productData?.Product_sku}
                      </li>
                      <li>
                        <span>Categories:</span> Clothes
                      </li>
                      <li>
                        <span>Tag:</span> Clothes, Skin, Body
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="product__details__tab">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#tabs-5"
                        role="tab"
                      >
                        Description
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#tabs-6"
                        role="tab"
                      >
                        Customer Previews(5)
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#tabs-7"
                        role="tab"
                      >
                        Additional information
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane active"
                      id="tabs-5"
                      role="tabpanel"
                    >
                      <div className="product__details__tab__content">
                        <p className="note">
                          {productData?.Product_description}
                        </p>
                        <div className="product__details__tab__content__item">
                          <h5>Products Infomation</h5>
                          <p>
                            A Pocket PC is a handheld computer, which features
                            many of the same capabilities as a modern PC. These
                            handy little devices allow individuals to retrieve
                            and store e-mail messages, create a contact file,
                            coordinate appointments, surf the internet, exchange
                            text messages and more. Every product that is
                            labeled as a Pocket PC must be accompanied with
                            specific software to operate the unit and must
                            feature a touchscreen and touchpad.
                          </p>
                          <p>
                            As is the case with any new technology product, the
                            cost of a Pocket PC was substantial during it’s
                            early release. For approximately $700.00, consumers
                            could purchase one of top-of-the-line Pocket PCs in
                            2003. These days, customers are finding that prices
                            have become much more reasonable now that the
                            newness is wearing off. For approximately $350.00, a
                            new Pocket PC can now be purchased.
                          </p>
                        </div>
                        <div className="product__details__tab__content__item">
                          <h5>Material used</h5>
                          <p>
                            Polyester is deemed lower quality due to its none
                            natural quality’s. Made from synthetic materials,
                            not natural like wool. Polyester suits become
                            creased easily and are known for not being
                            breathable. Polyester suits tend to have a shine to
                            them compared to wool and cotton suits, this can
                            make the suit look cheap. The texture of velvet is
                            luxurious and breathable. Velvet is a great choice
                            for dinner party jacket and can be worn all year
                            round.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="tabs-6" role="tabpanel">
                      <div className="product__details__tab__content">
                        <div className="product__details__tab__content__item">
                          <h5>Products Infomation</h5>
                          <p>
                            A Pocket PC is a handheld computer, which features
                            many of the same capabilities as a modern PC. These
                            handy little devices allow individuals to retrieve
                            and store e-mail messages, create a contact file,
                            coordinate appointments, surf the internet, exchange
                            text messages and more. Every product that is
                            labeled as a Pocket PC must be accompanied with
                            specific software to operate the unit and must
                            feature a touchscreen and touchpad.
                          </p>
                          <p>
                            As is the case with any new technology product, the
                            cost of a Pocket PC was substantial during it’s
                            early release. For approximately $700.00, consumers
                            could purchase one of top-of-the-line Pocket PCs in
                            2003. These days, customers are finding that prices
                            have become much more reasonable now that the
                            newness is wearing off. For approximately $350.00, a
                            new Pocket PC can now be purchased.
                          </p>
                        </div>
                        <div className="product__details__tab__content__item">
                          <h5>Material used</h5>
                          <p>
                            Polyester is deemed lower quality due to its none
                            natural quality’s. Made from synthetic materials,
                            not natural like wool. Polyester suits become
                            creased easily and are known for not being
                            breathable. Polyester suits tend to have a shine to
                            them compared to wool and cotton suits, this can
                            make the suit look cheap. The texture of velvet is
                            luxurious and breathable. Velvet is a great choice
                            for dinner party jacket and can be worn all year
                            round.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="tabs-7" role="tabpanel">
                      <div className="product__details__tab__content">
                        <p className="note">
                          Nam tempus turpis at metus scelerisque placerat nulla
                          deumantos solicitud felis. Pellentesque diam dolor,
                          elementum etos lobortis des mollis ut risus. Sedcus
                          faucibus an sullamcorper mattis drostique des commodo
                          pharetras loremos.
                        </p>
                        <div className="product__details__tab__content__item">
                          <h5>Products Infomation</h5>
                          <p>
                            A Pocket PC is a handheld computer, which features
                            many of the same capabilities as a modern PC. These
                            handy little devices allow individuals to retrieve
                            and store e-mail messages, create a contact file,
                            coordinate appointments, surf the internet, exchange
                            text messages and more. Every product that is
                            labeled as a Pocket PC must be accompanied with
                            specific software to operate the unit and must
                            feature a touchscreen and touchpad.
                          </p>
                          <p>
                            As is the case with any new technology product, the
                            cost of a Pocket PC was substantial during it’s
                            early release. For approximately $700.00, consumers
                            could purchase one of top-of-the-line Pocket PCs in
                            2003. These days, customers are finding that prices
                            have become much more reasonable now that the
                            newness is wearing off. For approximately $350.00, a
                            new Pocket PC can now be purchased.
                          </p>
                        </div>
                        <div className="product__details__tab__content__item">
                          <h5>Material used</h5>
                          <p>
                            Polyester is deemed lower quality due to its none
                            natural quality’s. Made from synthetic materials,
                            not natural like wool. Polyester suits become
                            creased easily and are known for not being
                            breathable. Polyester suits tend to have a shine to
                            them compared to wool and cotton suits, this can
                            make the suit look cheap. The texture of velvet is
                            luxurious and breathable. Velvet is a great choice
                            for dinner party jacket and can be worn all year
                            round.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="related spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="related-title">Related Product</h3>
            </div>
          </div>

          <div className="row">
            {relatedProduct?.filter((item)=>(item.categoryId === productData?.categoryId)).map((product) => (
              <div key={product.id} className="col-lg-3 col-md-6 col-sm-6">
                <div className="product__item" >
                  <div
                    className="product__item__pic set-bg"
                    style={{ backgroundImage: `url(${product1})` }}
                    onClick={()=>route(`/product/${product.id}`,{replace:true})}
                  >
                    {product.Product_isNewArrival && (
                      <span className="label">New</span>
                    )}
                    <ul className="product__hover">
                      <li>
                        <a href="#">
                          <img src={heart} alt="Heart Icon" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={compare} alt="Compare Icon" />
                          <span>Compare</span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={search} alt="Search Icon" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>{product.Product_name}</h6>
                    <a style={{cursor: 'pointer'}}  className="add-cart" onClick={() =>
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
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={
                            i < product.Product_rating ? "fa fa-star" : "fa fa-star-o"
                          }
                        ></i>
                      ))}
                    </div>
                    <h5>$ {product.Product_price}</h5>
                    <div className="product__color__select">
                      {product.Product_color.map((colorId) => (
                        <label key={colorId} htmlFor={colorId}>
                          <input
                            type="radio"
                            id={colorId}
                            name={`color-${product.id}`}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ShopDetailsPage;
