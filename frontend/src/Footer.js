import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>Main</span>
            </Link>
          </li>
          <li>
            <Link to="/cards">
              <FontAwesomeIcon icon={faCreditCard} />
              <span>My Cards</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
