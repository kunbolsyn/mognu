import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import "./Cards.css";

function Cards() {
  return (
    <div className="Cards">
      <header className="Cards-header">
        <h1>My Cards</h1>
        <button className="add-card-button">
          <FontAwesomeIcon icon={faPlus} />
          <span>Add Card</span>
        </button>
      </header>

      <Footer />
    </div>
  );
}

export default Cards;
