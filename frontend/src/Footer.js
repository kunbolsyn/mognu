import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} />
              <span>Главная</span>
            </Link>
          </li>
          <li>
            <Link to="/cards">
              <FontAwesomeIcon icon={faCreditCard} />
              <span>Мои карты</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
