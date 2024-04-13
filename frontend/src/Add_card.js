import React, { useState } from 'react';  // Ensure useState is imported
import './Add_card.css';

function AddCard({ isOpen, onClose }) {
    const [selectedBank, setSelectedBank] = useState('');  // Initialize state

    if (!isOpen) return null;

    const handleBankChange = (e) => {
        setSelectedBank(e.target.value);
    };

    const getCardOptions = () => {
        switch(selectedBank) {
            case 'kaspi':
                return <option value="gold">Gold</option>;
            case 'halyk':
                return (
                    <>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                    </>
                );
            case 'jusan':
                return (
                    <>
                        <option value="basic">Basic</option>
                        <option value="gold">Gold</option>
                    </>
                );
            case 'bcc':
                return (
                    <>
                        <option value="iron">Iron</option>
                        <option value="bronze">Bronze</option>
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
                <form>


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
                    <select>
                        {getCardOptions()}
                    </select>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddCard;
