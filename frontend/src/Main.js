import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faTshirt,
  faCoffee,
  faHamburger,
  faBook,
  faPaintBrush,
  faFilm,
  faDumbbell,
  faCouch,
  faGamepad,
  faStethoscope,
  faPlane,
  faTaxi,
  faBaby,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import "./Main.css";
import CategoryInfo from "./CategoryInfo";

const categories = [
  { name: "Супермаркеты", icon: faShoppingCart, color: "#FF6347" }, // Tomato
  { name: "Одежда и обувь", icon: faTshirt, color: "#32CD32" }, // LimeGreen
  { name: "Кафе и рестораны", icon: faCoffee, color: "#FF4500" }, // OrangeRed
  { name: "Доставка еды", icon: faHamburger, color: "#FFD700" }, // Gold
  { name: "Образование", icon: faBook, color: "#00BFFF" }, // DeepSkyBlue
  { name: "Салоны красоты и косметика", icon: faPaintBrush, color: "#9370DB" }, // MediumPurple
  { name: "Кино и музыка онлайн", icon: faFilm, color: "#7B68EE" }, // MediumSlateBlue
  { name: "Фитнес и SPA", icon: faDumbbell, color: "#20B2AA" }, // LightSeaGreen
  { name: "Мебель", icon: faCouch, color: "#DC143C" }, // Crimson
  { name: "Игровые сервисы", icon: faGamepad, color: "#4682B4" }, // SteelBlue
  { name: "Медицинские услуги", icon: faStethoscope, color: "#556B2F" }, // DarkOliveGreen
  { name: "Путешествия", icon: faPlane, color: "#00CED1" }, // DarkTurquoise
  { name: "Такси", icon: faTaxi, color: "#800080" }, // Purple
  { name: "Товары для детей", icon: faBaby, color: "#FF1493" }, // DeepPink
  { name: "Питомцы", icon: faPaw, color: "#3CB371" }, // MediumSeaGreen
];

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryInfoOpen, setIsCategoryInfoOpen] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setIsCategoryInfoOpen(true);
  };

  const handleClose = () => {
    setIsCategoryInfoOpen(false);
  };

  return (
    <div className="categories">
      <h1 className="categories-header">Категории</h1>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category"
            onClick={() => handleCategoryClick(category)}
          >
            <div
              className="icon category-circle"
              style={{ backgroundColor: category.color }}
            >
              <FontAwesomeIcon icon={category.icon} />
            </div>
            <div className="text">{category.name}</div>
          </div>
        ))}
      </div>
      <CategoryInfo
        isOpen={isCategoryInfoOpen}
        onClose={handleClose}
        selectedCategory={selectedCategory}
      />
      <Footer />
    </div>
  );
};

export default Main;
