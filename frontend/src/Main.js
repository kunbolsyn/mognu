import React from "react";
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

const categories = [
  { name: "Супермаркеты", icon: faShoppingCart, color: "#FF0000" },
  { name: "Одежда и обувь", icon: faTshirt, color: "#00FF00" },
  { name: "Кафе и рестораны", icon: faCoffee, color: "#0000FF" },
  { name: "Доставка еды", icon: faHamburger, color: "#FFFF00" },
  { name: "Образование", icon: faBook, color: "#00FFFF" },
  { name: "Салоны красоты и косметика", icon: faPaintBrush, color: "#FF00FF" },
  { name: "Кино и музыка онлайн", icon: faFilm, color: "#C0C0C0" },
  { name: "Фитнес и SPA", icon: faDumbbell, color: "#808080" },
  { name: "Мебель", icon: faCouch, color: "#800000" },
  { name: "Игровые сервисы", icon: faGamepad, color: "#808000" },
  { name: "Медицинские услуги", icon: faStethoscope, color: "#008000" },
  { name: "Путешествия", icon: faPlane, color: "#008080" },
  { name: "Такси", icon: faTaxi, color: "#000080" },
  { name: "Товары для детей", icon: faBaby, color: "#800080" },
  { name: "Питомцы", icon: faPaw, color: "#808080" },
];

const Main = () => {
  return (
    <div className="categories">
      <h1>Categories</h1>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category">
            <div className="icon" style={{ backgroundColor: category.color }}>
              <FontAwesomeIcon icon={category.icon} />
            </div>
            <div className="text">{category.name}</div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Main;
