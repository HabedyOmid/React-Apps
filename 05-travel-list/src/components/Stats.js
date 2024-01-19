const Stats = ({ items }) => {
  if (!items.length) return <p className="stats">
    <em>Start adding items to your packing list 🚀</em>
  </p>

  const totalItems = items.length || 0;
  const itemsPacked = items.filter((item) => item.packed).length || 0;
  const totalPacked = totalItems === 0 ? 0 : Math.floor((itemsPacked / totalItems) * 100);

  return <footer className="stats">
    {totalPacked !== 100
      ? <em>
        You have {totalItems} items on your list, and you already packed {itemsPacked} ({totalPacked}%) 💼
      </em>
      : <em>
        You got everything to go, already packed {itemsPacked} items ✈️
      </em>
    }
  </footer>
}

export default Stats;