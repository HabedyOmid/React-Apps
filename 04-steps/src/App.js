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
            <Button
              bgColor='#7950f2'
              textColor='#ffffff'
              onClick={handlePrev}
              text='Prev'>
              <span>👈 Prev</span>
            </Button>
            <Button
              bgColor='#7950f2'
              textColor='#ffffff'
              onClick={handleNext}
              text='Next'>
              <span>Next 👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

const Button = ({textColor, bgColor, onClick, children}) => {
  return <button
    style={{color: textColor, backgroundColor: bgColor }}
    onClick={onClick}>
    {children}
  </button>
}

export default App;