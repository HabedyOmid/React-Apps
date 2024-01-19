const Item = ({ item, onDeleteItem, onTogglePacking }) => {
  const { id, description, quantity, packed } = item;
  return <li>
    <input onChange={() => onTogglePacking(id)} type="checkbox" value={packed}></input>
    <span className={ packed ? 'active' : '' }>{quantity} {description}</span>
    <button onClick={() => onDeleteItem(id)}>❌</button>
  </li>
}

export default Item;