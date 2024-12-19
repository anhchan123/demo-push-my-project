import { useState } from "react";
import footerLogo from "../../assets/img/footer-logo.png";
import paymentLogo from "../../assets/img/payment.png";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";

const Footer = (): JSX.Element => {

  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState<string>("")
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
    to_email:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitSearch = () => {
    navigate(`/shop?search=${searchValue}`)
  }

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await emailjs.send(
        'default_service', // Thay bằng Service ID từ EmailJS
        'template_9uyi84j', // Thay bằng Template ID từ EmailJS
        formData, // Dữ liệu từ form
        'wniIcvozdCmBNx4G7' // Thay bằng User ID từ EmailJS
      );
      alert('Email sent successfully!');
      console.log('Email sent successfully:', response);
    } catch (error) {
      alert('Failed to send email.');
      console.error('Error sending email:', error);
    }
  };
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer__about">
                <div className="footer__logo">
                  <a href="#">
                    <img src={footerLogo} alt="Footer Logo" />
                  </a>
                </div>
                <p>
                  The customer is at the heart of our unique business model,
                  which includes design.
                </p>
                <a href="#">
                  <img src={paymentLogo} alt="Payment Methods" />
                </a>
              </div>
            </div>
            <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
              <div className="footer__widget">
                <h6>Shopping</h6>
                <ul>
                  <li>
                    <a href="#">Clothing Store</a>
                  </li>
                  <li>
                    <a href="#">Trending Shoes</a>
                  </li>
                  <li>
                    <a href="#">Accessories</a>
                  </li>
                  <li>
                    <a href="#">Sale</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6">
              <div className="footer__widget">
                <h6>Shopping</h6>
                <ul>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Payment Methods</a>
                  </li>
                  <li>
                    <a href="#">Delivary</a>
                  </li>
                  <li>
                    <a href="#">Return &amp; Exchanges</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
              <div className="footer__widget">
                <h6>NewLetter</h6>
                <div className="footer__newslatter">
                  <p>
                    Be the first to know about new arrivals, look books, sales
                    &amp; promos!
                  </p>
                  <form onSubmit={sendEmail}>
                    <input type="text" placeholder="Your email" name="to_email" id="to_email" value={formData.to_email} onChange={handleChange}/>
                    <button type="submit">
                      <span className="icon_mail_alt" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="footer__copyright__text">
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                <p>
                  Copyright © 2020 All rights reserved | This template is made
                  with <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
                  <a href="https://colorlib.com" target="_blank">
                    Colorlib
                  </a>
                </p>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer Section End */}
      {/* Search Begin */}
      <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch">+</div>
          <form className="search-model-form"  onSubmit={submitSearch}>
            <input
              type="text"
              id="search-input"
              placeholder="Search here....."
              value={searchValue}
              onChange={(e)=>setSearchValue(e.target.value)}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Footer;
