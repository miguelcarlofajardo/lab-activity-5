import React, { useState } from "react";
import Item from "./Item";

function List({ items, onDeleteItem, onCheckItem, onEditItem, setItems }) {
  const [filter, setFilter] = useState("notCompleted");
  const [sortMethod, setSortMethod] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const getCompletedItemCount = () => {
    return items.filter((item) => item.isChecked).length;
  };

  const handleSortChange = (method) => {
    if (sortMethod === method) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortMethod(method);
      setSortOrder("asc");
    }
  };

  const sortByQuantity = (a, b) => {
    if (sortOrder === "asc") {
      return a.quantity - b.quantity;
    } else {
      return b.quantity - a.quantity;
    }
  };

  const sortByName = (a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  };

  const sortedItems = items
    .slice()
    .sort(sortMethod === "name" ? sortByName : sortByQuantity);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredItems = sortedItems.filter((item) => {
    if (filter === "completed") {
      return item.isChecked;
    } else if (filter === "notCompleted") {
      return !item.isChecked;
    }
    return true;
  });

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      alert("Please enter a positive number for quantity.");
      return;
    }

    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div>
      <div className="dropdown-container">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="dropdown"
        >
          <option value="notCompleted">Not Completed</option>
          <option value="completed">Completed</option>
          <option value="all">All</option>
        </select>
      </div>
      <div>
        <button onClick={() => handleSortChange("name")} className="sortButton">
          Sort by Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </button>
        <button
          onClick={() => handleSortChange("quantity")}
          className="sortButton"
        >
          Sort by Quantity ({sortOrder === "asc" ? "Low-High" : "High-Low"})
        </button>
      </div>

      <div className="itemsDiv">
        {filteredItems.map((item) => (
          <Item
            key={item.id}
            itemObj={item}
            deleteItem={onDeleteItem}
            checkItem={() => onCheckItem(item.id)}
            editItem={onEditItem}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      <div className="statistics">
        <p>Completed Items: {getCompletedItemCount()}</p>
      </div>
    </div>
  );
}

export default List;
