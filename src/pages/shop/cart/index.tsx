import Footer from "../../../components/common/footer";
import Header from "../../../components/common/header";
import cartImg1 from "../../../assets/img/shopping-cart/cart-1.jpg";
import cartImg2 from "../../../assets/img/shopping-cart/cart-2.jpg";
import cartImg3 from "../../../assets/img/shopping-cart/cart-3.jpg";
import cartImg4 from "../../../assets/img/shopping-cart/cart-4.jpg";
import { TitleHelmet } from "../../../components/common/title-helmet";
import { toast } from "react-toastify";
import axios from "axios";
import { API_ENDPOINT } from "../../../apis/api";
import { useEffect, useState } from "react";

export interface ICart {
  color?: string
  history?: []
  id: string
  lowStockThreshold: boolean
  productId: string
  quantity: number
  reservedQuantity: number
  size: string
  status: string
  variantSku: string
  warehouseLocation: string
  name: string
  price: number
}

const ShoppingCartPage = () => {

  const [cartData, setCartData] = useState<ICart[]>()
  const [discount, setDiscount] = useState<number>(0)
  const [cuponValue,setCuponValue] = useState<string>("")
  const fetCartData = async () => {
    try {
      const res:any = await axios.get(API_ENDPOINT.INVENTORY)
      setCartData(res.data)
    } catch (error) {
      toast.error("Error when get cart data!")
    }
  }

  const fetchPromo = async (value: string) => {
    try {
      const res = await axios.get(`${API_ENDPOINT.GET_CUPPON}/${value}`)
      if(res.data.value){
        setDiscount(res.data.value)
        toast.info(`Yay, Great, you saved ${res.data.value}%`)
        sessionStorage.setItem('Cupon',res.data.value)
      }
    } catch (error) {
      toast.error("Promo not found or reach usage limited!")
    }
  }

  const handleRemoveItem = async (id: string) => {
    try {
      const res = await axios.delete(`${API_ENDPOINT.INVENTORY}/${id}`)
      if(res.data){
        console.log(res.data)
        toast.info("Remove success!")
        fetCartData()
      }
    } catch (error) {
      toast.error("Fail to remove product, please try again!")
    }
  }

  useEffect(()=>{
    fetCartData()
  },[])


  console.log(cartData)
  return (
    <>
      <TitleHelmet title="Shopping Cart" />
      <Header />
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Shopping Cart</h4>
                <div className="breadcrumb__links">
                  <a href="/">Home</a>
                  <a href="/shop">Shop</a>
                  <span>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="shopping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="shopping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartData?.map((product: ICart, index: number) => (
                        <tr key={index}>
                      <td className="product__cart__item">
                        <div className="product__cart__item__pic">
                          <img src={cartImg1} alt="T-shirt Contrast Pocket" />
                        </div>
                        <div className="product__cart__item__text">
                          <h6>{product.name}</h6>
                          <h5>$ {product.price}</h5>
                        </div>
                      </td>
                      <td className="quantity__item">
                        <div className="quantity">
                          <div className="pro-qty-2">
                            <input type="text" defaultValue={1}/>
                          </div>
                        </div>
                      </td>
                      <td className="cart__price">$ {product.price * (100 - discount) / 100}</td>
                      <td className="cart__close">
                        <i className="fa fa-close" onClick={()=>handleRemoveItem(product.id)}/>
                      </td>
                    </tr>
                      ))
                    }
                    
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="continue__btn">
                    <a href="/shop">Continue Shopping</a>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="continue__btn update__btn">
                    <a href="#">
                      <i className="fa fa-spinner" /> Update cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart__discount">
                <h6>Discount codes</h6>
                <form>
                  <input type="text" placeholder="Coupon code" onChange={(e)=>setCuponValue(e.target.value)} />
                  <button type="button" onClick={()=>fetchPromo(cuponValue)}>Apply</button>
                </form>
              </div>
              <div className="cart__total">
                <h6>Cart total</h6>
                <ul>
                  <li>
                    Subtotal <span>$ {cartData?.reduce((sum:number, item: ICart) => sum + item.price, 0)}</span>
                  </li>
                  <li>
                    Total <span>$ {(cartData?.reduce((sum:number, item: ICart) => sum + (item.price)*(100-discount)/100, 0))}</span>
                  </li>
                </ul>
                <a href="/checkout" className="primary-btn">
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ShoppingCartPage;
