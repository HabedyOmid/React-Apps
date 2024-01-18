import React from "react";
import ReactDOM from "react-dom/client"
import './index.css'

const pizzaData = require("./data.json")

const App = () => {
  return <div className="container">
    <Header />
    <Menu />
    <Footer />
  </div>
}

const Header = () => {
  return <header className="header">
    <h1>Fast Pizza Co.</h1>
  </header>
}

const Menu = () => {
  return <main className="menu">
    <h2>Our Menu</h2>
    {pizzaData.length > 0 ? (
      <>
        <p>Some text here to showcase React Fragmentaion.</p>
        <ul className="pizzas">
          { pizzaData.map((pizza) => <Pizza pizza={pizza} key={pizza.name} />) }
        </ul>
      </>
    ) : <p>There is no pizza available! come back later</p>}
  </main>
}

function Pizza(props) {
  const { name, ingredients, photoName, price, soldOut } = props.pizza;

  return <li className={`pizza ${soldOut ? 'sold-out' : ''}`}>
    <img src={photoName} alt={name} />
    <div>
      <h3>{name}</h3>
      <p>{ingredients}</p>
      <span>{soldOut ? 'SOLD OUT' : price}</span>
    </div>
  </li>
}

const Order = (props) => {
  return  <div className="order">
    <p>We're are until {props.closeHour}:00, come visit or order online!</p>
    <button className="btn">Order</button>
  </div>
}
const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return <footer className="footer">
    {isOpen && (
      <Order closeHour={ closeHour } />
    )}
  </footer>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><App /></React.StrictMode>);