import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCreditCard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <nav>
        <ul>
          <li>
            <a href="/shop">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>Shop</span>
            </a>
          </li>
          <li>
            <a href="/cards">
              <FontAwesomeIcon icon={faCreditCard} />
              <span>My Cards</span>
            </a>
          </li>
          <li>
            <a href="/profile">
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
