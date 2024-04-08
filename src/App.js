import logo from "./logo.svg";
import "./App.css";
import Header from "./header";
import Form from "./Form";
import List from "./List";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function deleteItem(id) {
    setItems((toBeDelItems) => toBeDelItems.filter((item) => item.id !== id));
  }

  function checkItem(id) {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    setItems(updatedItems);
  }

  function editItem(id, newText) {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, name: newText };
      }
      return item;
    });
    setItems(updatedItems);
  }

  return (
    <div className="App">
      <Header />
      <Form onAddItem={handleAddItems} />
      <List
        items={items}
        onDeleteItem={deleteItem}
        onCheckItem={checkItem}
        onEditItem={editItem}
        setItems={setItems}
      />
    </div>
  );
}

export default App;
