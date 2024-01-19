import { useState } from "react"
const faqs = require("./faqs.json");

const Accordion = () => {
  return <div className="container">
    <p className="title">Challange #4 - Accordion</p>
    <div className="accordion">
      {faqs.map((faq, i) =>
        <AccordionItem
          key={i}
          num={i + 1}
          title={faq.title}
          text={faq.text}
        />)}
    </div>
  </div>
}

const AccordionItem = ({ num, title, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <div
    className={`accordion-item ${isOpen ? 'accordion-open' : ''}`}
    onClick={() => setIsOpen((isOpen) => !isOpen)}>
    <p className="accordion-number">{num < 9 ? `0${num}` : num}</p>
    <p className="accordion-title">{title}</p>
    <p className="accordion-icon">{isOpen ? "-" : "+"}</p>
    { isOpen && 
      <div className="accordion-content-box">{text}</div>
    }
  </div>
}

export default Accordion;