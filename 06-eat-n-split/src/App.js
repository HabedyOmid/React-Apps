import { useState } from "react"
const friends = require("./friends.json")

const App = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendList, setFriendList] = useState(friends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAddFriend = (friend) => {
    setFriendList((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  const handleSelectedFriend = (friend) => {
    setSelectedFriend((cur) => cur?.id === friend.id ? null : friend);
  }

  const handleBillSplit = (value) => {
    setFriendList((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    )
  }

  return <h1 className="container">
    <div className="app">
      <div className="app__sidebar">
        <FriendList
          friends={friendList}
          selectedFriend={selectedFriend}
          onAdd={setFriendList}
          onSelect={handleSelectedFriend} />

        <div className="add-friend">
          {showAddFriend &&
            <AddFriendForm
              onAddFriend={handleAddFriend}
              onShow={showAddFriend} />}
          
            <Button onClick={() => setShowAddFriend((show) => !show)}>
              {showAddFriend ? "Close" : "Add friend"}
            </Button>
        </div>
      </div>

      {selectedFriend &&
        <div className="split-bill-form">
          <SplitBillForm
            selectedFriend={selectedFriend}
            onBillSplit={handleBillSplit} />
        </div>
      }
    </div>
  </h1>
}

const FriendList = ({ friends, onSelect, selectedFriend }) => {
  return <ul>
    {friends.map((friend) =>
      <Avatar
        friend={friend}
        selectedFriend={selectedFriend}
        onSelect={onSelect}
        key={friend.id} />)
    }
  </ul>
}

const Avatar = ({ friend, onSelect, selectedFriend }) => {
  const { name, image, balance } = friend;
  const isSelected = selectedFriend?.id === friend.id;

  return <li className={`app__avatar ${isSelected ? 'selected' : ''}`}>
    <img className="app__avatar-img" alt={name} src={image}></img>

    <div className="app__avatar-wrapper">
      <h3 className="app__avatar-name">{name}</h3>
      {balance < 0 && (
        <p className="app__avatar-subhead text-red-700">
          You owe {name} {Math.abs(balance)}
        </p>
      )}

      {balance > 0 && (
        <p className="app__avatar-subhead text-green-700">
          {name} owes you {Math.abs(balance)}
        </p>
      )}

      {balance === 0 && (
        <p className="app__avatar-subhead">
          You and {name} are even.
        </p>
      )}
    </div>
    <Button onClick={() => onSelect(friend)}>{isSelected ? 'close' : 'select'}</Button>
  </li>
}

const AddFriendForm = ({onAddFriend}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/512");
  const id = Date.now();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !image) return;

    onAddFriend({
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0
    });

    setName("")
    setImage("https://i.pravatar.cc/48")
  }

  return <form onSubmit={handleSubmit}>
    <label>👯‍♂️ Friend Name</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}>
    </input>
    <Button>Add</Button>
  </form>
}

const SplitBillForm = ({ selectedFriend, onBillSplit }) => {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [payingUser, setPayingUser] = useState("user");

  const friendExpense = bill ? bill - userExpense : '';
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !userExpense) return;

    onBillSplit(payingUser === 'user' ? friendExpense : -userExpense);
  }

  return <form onSubmit={handleSubmit}>
    <h2 className="mb-2 font-md">Split a bill with {selectedFriend.name}</h2>

    <label>💰 Bill value</label>
    <input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))}></input>

    <label>💁‍♂️ Your expense</label>
    <input type="number" value={userExpense}
      onChange={(e) =>
        setUserExpense(
          Number(e.target.value) > bill
          ? userExpense
          : Number(e.target.value))}>
    </input>

    <label>👯‍♂️ {selectedFriend.name}'s expense</label>
    <input type="text" value={friendExpense} disabled readOnly></input>

    <label>💸 Who is paying the bill?</label>
    <select value={payingUser} onChange={(e) => setPayingUser(e.target.value)}>
      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select>

    <Button>Split Bill</Button>
  </form>
}

const Button = ({onClick, children}) => {
  return <button onClick={onClick} className="button">{children}</button>
}
export default App;