import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import AddCard from "./Add_card"; // Make sure the path is correct
import "./Cards.css";

function Cards() {
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  const handleAddCardClick = () => {
    setIsAddCardOpen(true); // This function toggles the overlay's visibility
  };

  const handleClose = () => {
    setIsAddCardOpen(false); // This function will close the overlay
  };

  return (
    <div className="Cards">
      <header className="Cards-header">
        <h1>My Cards</h1>
        <button className="add-card-button" onClick={handleAddCardClick}> {/* Added onClick event here */}
          <FontAwesomeIcon icon={faPlus} />
          <span>Add Card</span>
        </button>
      </header>

      {/* Include the AddCard component and pass props */}
      <AddCard isOpen={isAddCardOpen} onClose={handleClose} />

      <Footer />
    </div>
  );
}

export default Cards;
