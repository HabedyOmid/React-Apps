import { useState } from "react"

const Form = ({ onAddItem }) => {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!quantity || !description) return;

    onAddItem({
      id: Date.now(),
      packed: false,
      quantity,
      description,
    });

    setQuantity(1);
    setDescription("");
  }

  return <form onSubmit={handleSubmit} className="add-form">
    <h3>What you need for your trip?</h3>
    <select onChange={(e) => setQuantity(Number(e.target.value))} value={quantity}>
      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) =>
        <option value={num} key={num}>{num}</option>
      )}
    </select>
    <input type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="item..">
    </input>
    <button>Add</button>
  </form>
}

export default Form;
