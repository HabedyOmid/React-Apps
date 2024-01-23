import { useState } from 'react';
const faqs = require('./faqs.json');

const Accordion = () => {
  const [currentlyOpen, setCurrentlyOpen] = useState(null);

  return (
    <div className="accordion">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          num={i}
          title={faq.title}
          currentlyOpen={currentlyOpen}
          onOpen={setCurrentlyOpen}
        >
          <div className="accordion-content-box">{faq.text}</div>
        </AccordionItem>
      ))}
    </div>
  );
};

const AccordionItem = ({ num, title, currentlyOpen, onOpen, children }) => {
  const isOpen = num === currentlyOpen;

  return (
    <div
      className={`accordion-item ${isOpen ? 'accordion-open' : ''}`}
      onClick={() => onOpen(isOpen ? null : num)}
    >
      <p className="accordion-number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="accordion-title">{title}</p>
      <p className="accordion-icon">{isOpen ? '👆' : '👇'}</p>
      {isOpen && children}
    </div>
  );
};

export default Accordion;
