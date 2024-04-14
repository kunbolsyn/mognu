import React, { useState } from "react";
import "./Add_card.css";

function AddCard({ isOpen, onClose, onSubmit }) {
    const [selectedBank, setSelectedBank] = useState('');
    const [selectedCard, setSelectedCard] = useState('');

  if (!isOpen) return null;

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

    const handleCardChange = (e) => {
        setSelectedCard(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', selectedBank, selectedCard);  // Check what's being submitted
        onSubmit({ bank: selectedBank, cardType: selectedCard });
        onClose();
};


    const getCardOptions = () => {
        switch(selectedBank) {
            case 'kaspi':
                return <option value="gold">Gold</option>;
            case 'halyk':
                return (
                    <>
                        <option value="silver">Bonus Digital</option>
                        <option value="bonus">Bonus</option>
                        <option value="sd">Sinooil Digital</option>
                        <option value="bc">Black card</option>
                        <option value="dc">Diamond card</option>
                    </>
                );
            case 'jusan':
                return (
                    <>
                        <option value="basic">Basic</option>
                        <option value="vi">Visa Infinite</option>
                        <option value="vs">Visa Signature</option>
                        <option value="mwe">Mastercard World Elite</option>
                    </>
                );
            case 'bcc':
                return (
                    <>
                        <option value="ironcard">#Ironcard</option>
                        <option value="tc">#Travelcard</option>
                        <option value="kk">#картакарта</option>
                        <option value="jc">#juniorcard</option>
                        <option value="bcc">#bccpay</option>
                        <option value="uk">ҮлкенгеҚұрмет</option>
                    </>
                );
            default:
                return <option value="">Select a bank first</option>;
        }
    };

    return (
        <div className="add-card-overlay">
            <div className="add-card-content">
                <button className="close-button" onClick={onClose}>×</button>
                <form onSubmit={handleSubmit}>

          {/* Card Dropdown */}
          <label>Card:</label>
          <select>{getCardOptions()}</select>

                    {/* Bank Dropdown */}
                    <label>Bank:</label>
                    <select onChange={handleBankChange}>
                        <option value="">Select a bank</option>
                        <option value="kaspi">Kaspi</option>
                        <option value="halyk">Halyk</option>
                        <option value="jusan">Jusan</option>
                        <option value="bcc">bcc</option>
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
