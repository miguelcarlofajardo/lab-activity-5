import React, { useState } from "react";

function Item({ itemObj, deleteItem, checkItem, editItem, onQuantityChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(itemObj.name);
  const [editedQuantity, setEditedQuantity] = useState(itemObj.quantity);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editItem(itemObj.id, editedItem);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedItem(e.target.value);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setEditedQuantity(newQuantity);
      onQuantityChange(itemObj.id, newQuantity);
    }
  };

  return (
    <div className="item-class">
      {isEditing ? (
        <>
          <input type="text" value={editedItem} onChange={handleChange} />
          <input
            type="number"
            value={editedQuantity}
            onChange={handleQuantityChange}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h2>
            {itemObj.quantity} {itemObj.name}
          </h2>
          <input
            type="image"
            id="editBtn"
            className="itemBtn"
            src="https://static-00.iconduck.com/assets.00/edit-icon-2048x2048-6svwfwto.png"
            alt="Edit"
            onClick={handleEdit}
          />
        </>
      )}
      <input
        type="image"
        id="trashBtn"
        className="itemBtn"
        src="https://static-00.iconduck.com/assets.00/trash-icon-462x512-njvey5nf.png"
        alt="Discard"
        onClick={() => deleteItem(itemObj.id)}
      />
      <input
        type="image"
        id="completedBtn"
        className="itemBtn"
        src="https://static-00.iconduck.com/assets.00/checkmark-icon-512x426-8re0u9li.png"
        alt="Check"
        onClick={() => checkItem(itemObj.id)}
      />
    </div>
  );
}

export default Item;
