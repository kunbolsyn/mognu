import React, { useState } from "react";
import "./Add_card.css";

function AddCard({ isOpen, onClose, onSubmit }) {
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedCard, setSelectedCard] = useState("");

  if (!isOpen) return null;

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
    switch (e.target.value) {
      case "Kaspi":
        setSelectedCard("Gold");
        break;
      case "Halyk":
        setSelectedCard("Silver");
        break;
      case "Jusan":
        setSelectedCard("Basic");
        break;
      case "BCC":
        setSelectedCard("Ironcard");
        break;
      default:
        setSelectedCard("");
    }
  };

  const handleCardChange = (e) => {
    setSelectedCard(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", selectedBank, selectedCard); // Check what's being submitted
    onSubmit({ bank: selectedBank, cardType: selectedCard });
    onClose();
  };

  const getCardOptions = () => {
    switch (selectedBank) {
      case "Kaspi":
        return <option value="Gold">Gold</option>;
      case "Halyk":
        return (
          <>
            <option value="Bonus Digital">Bonus Digital</option>
            <option value="Bonus">Bonus</option>
            <option value="Sinooil Digital">Sinooil Digital</option>
            <option value="Black card">Black card</option>
            <option value="Diamond card">Diamond card</option>
          </>
        );
      case "Jusan":
        return (
          <>
            <option value="Basic">Basic</option>
            <option value="Visa infinite">Visa Infinite</option>
            <option value="Visa signature">Visa Signature</option>
            <option value="Mastercard world elite">
              Mastercard World Elite
            </option>
          </>
        );
      case "BCC":
        return (
          <>
            <option value="Ironcard">#Ironcard</option>
            <option value="Travelcard">#Travelcard</option>
            <option value="Kартакарта">#картакарта</option>
            <option value="Juniorcard">#juniorcard</option>
            <option value="BCCPay">#bccpay</option>
            <option value="ҮлкенгеҚұрмет">ҮлкенгеҚұрмет</option>
          </>
        );
      default:
        return <option value="">Select a bank first</option>;
    }
  };

  return (
    <div className="add-card-overlay">
      <div className="add-card-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleSubmit}>
          {/* Bank Dropdown */}
          <label>Bank:</label>
          <select onChange={handleBankChange}>
            <option value="">Select a bank</option>
            <option value="Kaspi">Kaspi</option>
            <option value="Halyk">Halyk</option>
            <option value="Jusan">Jusan</option>
            <option value="BCC">bcc</option>
          </select>

          {/* Card Dropdown */}
          <label>Card:</label>
          <select onChange={handleCardChange}>
            {getCardOptions(selectedBank)}
          </select>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCard;
