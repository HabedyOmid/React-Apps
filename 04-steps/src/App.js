import { useState } from "react"

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const handlePrev = () => {
    if(step > 1) setStep((s) => s - 1);
  } 

  const handleNext = () => {
    if(step < messages.length) setStep((s) => s + 1);
  }

  return (
    <>
      <button onClick={() => setIsOpen((is) => !is)} className="close">&times;</button>
      { isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active': ''}>1</div>
            <div className={step >= 2 ? 'active': ''}>2</div>
            <div className={step >= 3 ? 'active': ''}>3</div>
          </div>

          <p className="message">Step {step}: { messages[step - 1]}</p>
          <div className="buttons">
            <button onClick={handlePrev}>Prev</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App;