import { useState } from "react";

const Counter = () => {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + count);
  const newDate = new Date(currentDate).toDateString();

  const handleReset = () => {
    setStep(1);
    setCount(0);
  }

  return (
    <div className="container">
      <p className="title">Challange #2: Counter</p>
      <div className="counter">
        <div className="counter__steps">
          <label>Steps: {step}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={step}
            className="counter__steps-range"
            onChange={(e) => setStep(() => Number(e.target.value))}
          />
        </div>

        <div className="counter__count">
          <button onClick={() => setCount((c) => count - step)}>-</button>
          <input
            type="number"
            className="counter__steps-input"
            onChange={(e) => setCount(() => Number(e.target.value))}
            value={count}
            placeholder="counter...">
          </input>
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

      {count !== 0 || step !== 1 ? (
        <button className="danger" onClick={handleReset}>Reset</button>
      ) : null }
    </div>
  )
}

export default Counter;