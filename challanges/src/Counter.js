import { useState } from "react";

const Counter = () => {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + count);
  const newDate = new Date(currentDate).toDateString();

  return (
    <div className="container">
      <p>Challange #2: Counter</p>

      <div className="counter">
        <div className="counter__steps">
          <button onClick={() => setStep((s) => s - 1)}>-</button>
          <span className="counter__steps-num">Step: { step }</span>
          <button onClick={() => setStep((s) => s + 1)}>+</button>
        </div>

        <div className="counter__count">
          <button onClick={() => setCount((c) => count - step)}>-</button>
          <span className="counter__steps-num">Counter: { count }</span>
          <button onClick={() => setCount((c) => count + step)}>+</button>
        </div>

        <p className="counter__output">
          <span>
            {count === 0
              ? 'Today is: ' : count > 0
                ? `${count} days from today is: `
                : `${Math.abs(count)} days ago from today was: `
            }
          </span>
          <span className="counter__output">{ newDate }</span>
        </p>
      </div>
    </div>
  )
}

export default Counter;