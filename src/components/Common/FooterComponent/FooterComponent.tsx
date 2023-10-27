import "./FooterComponent.css";

import React from "react";

type Props = {};

const FooterComponent: React.FC = (props: Props) => {
  return (
    <div className="footercomponent">
      <div className="footercomponent1">
        <div className="footercomponent4">
          <p>CUSTOMER SERVICE</p>
          <ul>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Accessibility</li>
          </ul>
        </div>
        <div className="footercomponent4">
          <p>RESOURCES</p>
          <ul>
            <li>Airgun Reviews</li>
            <li>Airgun Finder</li>
            <li>Calculators</li>
            <li>Videos</li>
            <li>Vault</li>
          </ul>
        </div>
        <div className="footercomponent4">
          <p>COMPANY INFO</p>
          <ul>
            <li>About Us</li>
            <li>Dealers</li>
            <li>Affiliates</li>
            <li>Policies</li>
            <li>Safety</li>
          </ul>
        </div>
      </div>
      <div className="footercomponent3">
        <div className="footercomponent2">
          <p>CONNECT</p>
          <i className="fa-brands fa-facebook-f" style={{ color: "#977d67" }} />
          <i className="fa-brands fa-twitter" style={{ color: "#977d67" }} />
          <i className="fa-brands fa-youtube" style={{ color: "#977d67" }} />
          <i className="fa-brands fa-invision" style={{ color: "#977d67" }} />
        </div>
        <p>
          Please Note: You must be 18 years of age or older to order and conform
          to all laws governing the use and ownership of airguns in your local
          area. More Info
        </p>
        <p>
          2023 Airgun Depot, 12453 S 265 W Suite F, Draper, UT 84020. All rights
          reserved. Terms of Use
        </p>
      </div>
    </div>
  );
};

export default FooterComponent;
