import { useState } from "react"

const items = [
  {
    id: 1,
    description: 'one',
    quantity: 2,
    packed: false
  },
  {
    id: 2,
    description: 'two',
    quantity: 2,
    packed: true
  },
  {
    id: 3,
    description: 'thre',
    quantity: 2,
    packed: false
  }
]
const App = () => {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )
}

const Logo = () => {
  return <h1>🌴 Far Away 💼</h1>
}

const Form = () => {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!quantity || !description) return;

    setQuantity(1);
    setDescription("");
  }

  return <form onSubmit={handleSubmit} className="add-form">
    <h3>What you need fro your 😍 trip?</h3>
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

const PackingList = () => {
  return <div className="list">
    <ul>
      {items.map((item) => <Item item={item} key={item.id} />)}
    </ul>
  </div>
}

const Item = (props) => {
  const { description, quantity, packed } = props.item;
  return <li>
    <span className={ packed ? 'active' : '' }>{quantity} {description}</span>
    <button>❌</button>
  </li>
}

const Stats = () => {
  return <footer className="stats">
    <em>
      You have X items on your list, and you already packed X (x%) 💼
    </em>
  </footer>
}

export default App;