import { useState } from "react"
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

const App = () => {
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => {
    setItems((items) => [...items, item])
  }

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  const handleTogglePacking = (id) => {
    setItems((items) => items.map((item) => item.id === id
      ? { ...item, packed: !item.packed }
      : item));
  }

  const handleClearList = () => {
    const confirmed = window.confirm("Are you sure deleting all the items?")
    if(confirmed) setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items}
        onDeleteItem={handleDeleteItem}
        onTogglePacking={handleTogglePacking}
        onClearList={handleClearList} />
      <Stats items={items} />
    </div>
  )
}

export default App;