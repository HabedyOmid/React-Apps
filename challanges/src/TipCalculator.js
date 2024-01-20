import { useState } from "react";
 
const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [likePrecentage, setLikePrecentage] = useState(0);
  const [friendLikePrecentage, setFriendLikePrecentage] = useState(0);

  const handleReset = () => {
    setBill("");
    setLikePrecentage(0);
    setFriendLikePrecentage(0);
  }

  const tip = bill * ((likePrecentage + friendLikePrecentage) / 2 / 100);

  return <div className='container'>
    <p className="title">Challange #5 - Tip Calculator</p>

    <Input bill={bill} onSetBill={setBill} />

    <SelectPrecentage
      precentage={likePrecentage}
      onSelect={setLikePrecentage}>
      How did you like the service?
    </SelectPrecentage>

    <SelectPrecentage
      precentage={friendLikePrecentage}
      onSelect={setFriendLikePrecentage}>
      How did your friend like the service?
    </SelectPrecentage>

    <Output bill={bill} tip={tip} />
    <Reset onReset={handleReset} />
  </div>
}

const Input = ({bill, onSetBill}) => {
  return <div className='form-control'>
    <label>How much was the bill?</label>
    <input
      value={bill}
      type='number'
      onChange={(e) => onSetBill(Number(e.target.value))}
      placeholder='How much was the bill?'>
    </input>
  </div>
}

const SelectPrecentage = ({ precentage, onSelect, children }) => {
  return <div className='form-control'>
    <label>{children}</label>
    <select
      value={precentage}
      onChange={(e) => onSelect(Number(e.target.value))}>
      <option value="0">Disatisfield (0%)</option>
      <option value="5">It was okay (5%)</option>
      <option value="10">It was good (10%)</option>
      <option value="20">Absolutely Amazing! (20%)</option>
    </select>
  </div>
}

const Output = ({ bill, tip }) => {
  return <p>
    <strong>You pay {bill}</strong>
    <span> + {tip.toFixed(2)} tip =</span>
    <strong> {bill + tip}</strong>
  </p>
}

const Reset = ({onReset}) => {
  return <button onClick={onReset}>Reset</button>
}

export default TipCalculator;