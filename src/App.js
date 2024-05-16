import { useState } from "react";
export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const [selected, setSelected] = useState(null);

  function handleShowAddForm() {
    setShowAddFriend(!showAddFriend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friendsList={friendsList} onSetSelect={setSelected} />
        {showAddFriend && (
          <FormAddFriend
            showAddFriend={showAddFriend}
            onSetFriendsList={setFriendsList}
          />
        )}
        <Button onClick={handleShowAddForm}>
          {!showAddFriend ? "Add New Friend" : "Close"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendList({ friendsList, selectedId, onSetSelect }) {
  return (
    <>
      <ul>
        {friendsList.map((el) => (
          <ListItem
            className={selectedId === el.id ? "selected" : ""}
            name={el.name}
            imgURL={el.image}
            balance={el.balance}
            id={el.id}
            key={el.id}
            onClick={onSetSelect}
          />
        ))}
      </ul>
    </>
  );
}
function ListItem({ name, imgURL, balance, onClick, id }) {
  return (
    <li onClick={() => onClick(id)}>
      <img src={imgURL} alt="friend" />
      <h3>{name}</h3>
      <p style={{ color: balance === 0 ? "" : balance > 0 ? "green" : "red" }}>
        {balance < 0
          ? `You owe ${name} ${balance} €`
          : balance === 0
          ? `You are equal`
          : `${name} owes you ${balance} €`}
      </p>
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ onSetFriendsList }) {
  const [name, setName] = useState("");
  const [imgURL, setImgURL] = useState("");
  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !imgURL) {
      alert("Please enter a name");
      return;
    }
    onSetFriendsList((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        name: name,
        image: imgURL,
        balance: 0,
      },
    ]);
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Image URL</label>
      <input
        type="text"
        value={imgURL}
        onChange={(e) => setImgURL(e.target.value)}
      />
      <Button>Add New Friend</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2> Split a bill with #friend#</h2>
      <label>Bill Value</label>
      <input type="text" />
      <label>You Expense</label>
      <input type="text" />
      <label>Friends Expense</label>
      <input type="text" disabled />
      <label>Who is paying</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
