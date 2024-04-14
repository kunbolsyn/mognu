import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom"; // Change this line
import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active-link">
              <FontAwesomeIcon
                icon={faHome}
                className={
                  window.location.pathname === "/" ? "active-icon" : ""
                }
              />
              <span
                className={
                  window.location.pathname === "/" ? "active-icon" : ""
                }
              >
                Главная
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cards" activeClassName="active-link">
              <FontAwesomeIcon
                icon={faCreditCard}
                className={
                  window.location.pathname === "/cards" ? "active-icon" : ""
                }
              />
              <span
                className={
                  window.location.pathname === "/cards" ? "active-icon" : ""
                }
              >
                Мои карты
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
