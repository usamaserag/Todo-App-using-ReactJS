import React, { useState } from "react";
import "./style.css";
import { FaTimes, FaPen } from "react-icons/fa";

const List = ({ items, onBtnClick, checkHandler, editTodo }) => {
  const [editingTodoNumber, setEditingTodoNumber] = useState(false);
  const [editedTodo, setEditedTodo] = useState();

  const handleInputChange = (e) => {
    setEditedTodo(e.target.value);
  };

  return (
    <div className="todo-list">
      {items.map((item, index) => {
        return (
          <div className="todo-item" key={index}>
            <span className={`todo-text-box ${item.done ? "completed" : ""}`}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={(e) => checkHandler(item.key, e.target.checked)}
                className="checkbox"
              />
              {index === editingTodoNumber ? (
                <input
                  className="edit-input"
                  type="text"
                  value={editedTodo}
                  onChange={handleInputChange}
                />
              ) : (
                <span className="todo-text">{item.text}</span>
              )}
            </span>
            {editingTodoNumber !== index ? (
              <div className="icons">
                <FaPen
                  onClick={() => {
                    setEditingTodoNumber(index);
                    setEditedTodo(item.text);
                  }}
                  className="icon edit-icon"
                />
                <FaTimes
                  onClick={() => onBtnClick(item.key)}
                  className="icon del-icon"
                />
              </div>
            ) : (
              <div>
                <button
                  className="save-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    editTodo(item.key, editedTodo);
                    setEditingTodoNumber(false);
                  }}
                >
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditingTodoNumber(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default List;
