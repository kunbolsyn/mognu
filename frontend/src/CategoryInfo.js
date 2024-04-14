import React, { useState, useEffect } from "react";
import "./CategoryInfo.css";
import data from "./jusan.json";

function CategoryInfo({ isOpen, onClose, selectedCategory }) {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (isOpen && selectedCategory) {
      const allOffers = [];
      data.forEach((bankData) => {
        const category = bankData.categories.find(
          (cat) => cat.category === selectedCategory
        );
        if (category) {
          const bankOffers = category.cashback_offers.map((offer) => ({
            ...offer,
            bank: bankData.bank,
            card: bankData.card,
          }));
          allOffers.push(...bankOffers);
        }
      });
      allOffers.sort(
        (a, b) => parseFloat(b.cashback_value) - parseFloat(a.cashback_value)
      );
      setOffers(allOffers);
    }
  }, [isOpen, selectedCategory]);

  if (!isOpen || !offers.length) return null;

  return (
    <div className="category-info-overlay">
      <div className="category-info-content">
        <h1>{selectedCategory}</h1>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <ul>
          {offers.map((offer, index) => (
            <li key={index}>
              {offer.bank} {offer.card}: {offer.cashback_value} cashback{" "}
              {offer.requirement && `(${offer.requirement})`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryInfo;
