import React from "react";
import "./Footer.css"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
      <div className="widgets-row">
        <div className="container">
          <div className="footer-widgets">
            <div className="brand-info">
              <div className="footer-logo">
                <a href="index.html" className="logo">
                Glint Aura
                </a>
              </div>
              <div className="footer-desc">
                <p>
                  {" "}
                  Glint Aura sizlere kaliteli ve güvenilir markaların ürünleri ile geliyor. Sipariş anından teslimat anına kadar sizlerle beraber olan sitemiz, güvenli ödeme sistemleri ile müşteri memnuniyetini en üst noktaya taşımayı hedeflemektedir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-row">
        <div className="container">
          <div className="footer-copyright">
            <div className="site-copyright">
              <p>
                Copyright 2024 ©Glint Aura Theme. All right reserved. Powered
                by Glint Aura.
              </p>
            </div>
            <a href="#">
              <img src="/img/footer/cards.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
    </React.Fragment>

  );
};

export default Footer;
