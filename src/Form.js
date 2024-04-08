import { useState } from "react";

function Form({ onAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a task.");
      return;
    }

    const newItem = {
      id: Date.now(),
      quantity,
      name,
      isChecked: false,
    };

    onAddItem(newItem);

    setQuantity(1);
    setName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="dropdown"
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          id="tasks"
          name="tasks"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What to do?"
          className="taskInput"
        />
        <button className="addButton">Add</button>
      </form>
    </div>
  );
}

export default Form;
