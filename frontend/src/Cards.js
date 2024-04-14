// Cards.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import AddCard from "./Add_card"; // Ensure the file path is correct
import "./Cards.css";

function Cards() {
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [cards, setCards] = useState([]); // List of cards

  const handleAddCardClick = () => {
    setIsAddCardOpen(true); // This function toggles the overlay's visibility
  };

  const handleClose = () => {
    setIsAddCardOpen(false); // This function will close the overlay
  };

  const handleAddCard = (card) => {
    console.log("New card added:", card); // Verify the received card object
    setCards((prevCards) => [...prevCards, card]);
    setIsAddCardOpen(false); // Close the form after adding
  };

  return (
    <div>
      <div className="cards">
        <h1 className="cards-header">Мои карты</h1>
        <button className="add-card-button" onClick={handleAddCardClick}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Добавить карту</span>
        </button>
        {cards.map((card, index) => (
          <div key={index} className="card-entry">
            <FontAwesomeIcon icon={faCreditCard} /> {card.bank} {card.cardType}
          </div>
        ))}
        <AddCard
          isOpen={isAddCardOpen}
          onClose={handleClose}
          onSubmit={handleAddCard}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Cards;
