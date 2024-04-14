import React from "react";
import "./CategoryInfo.css";

function CategoryInfo({ isOpen, onClose, selectedCategory }) {
  const cards = [
    { name: "Card 1", cashback: "10%" },
    { name: "Card 2", cashback: "15%" },
    { name: "Card 3", cashback: "20%" },
  ];

  if (!isOpen) return null;

  return (
    <div className="category-info-overlay">
      <div className="category-info-content">
        <h1>{selectedCategory}</h1>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <ul>
          {cards.map((card, index) => (
            <li key={index}>
              {card.name} - Cashback: {card.cashback}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryInfo;
