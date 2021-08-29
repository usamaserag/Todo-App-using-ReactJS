import React, { useState, useEffect } from "react";
import "./style.css";
import List from "../../components/list";
import { v4 as uuid } from "uuid";

const Form = () => {
  const [newTodo, setNewTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [todosToShow, setTodosToShow] = useState("all");

  useEffect(() => {
    if (sessionStorage.getItem("items") === null) {
      sessionStorage.setItem("items", JSON.stringify(allTodos));
    }
    const oldAllTodos = JSON.parse(sessionStorage.getItem("items"));
    setAllTodos(oldAllTodos);
    setFilteredTodos(oldAllTodos);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("items", JSON.stringify(allTodos));
    filterTodos(todosToShow);
  }, [allTodos]);

  const addNewTodo = (e) => {
    e.preventDefault();

    const todos = [{ text: newTodo, done: false, key: uuid() }, ...allTodos];

    if (newTodo) {
      setAllTodos(todos);
      setNewTodo("");
    } else {
      setEmpty(true);
    }
  };

  const checkHandler = (key, checked) => {
    const newTodos = [...allTodos];
    newTodos.find((todo) => todo.key === key).done = checked;
    setAllTodos(newTodos);
  };

  const editTodo = (key, newTodo) => {
    const newTodos = [...allTodos];
    newTodos.find((todo) => todo.key === key).text = newTodo;
    setAllTodos(newTodos);
  };

  const removeHandler = (key) => {
    const todosClone = [...allTodos];
    const newTodos = todosClone.filter((todo) => todo.key !== key);
    setAllTodos(newTodos);
  };

  const handleInputChange = (e) => {
    empty && setEmpty(false);
    setNewTodo(e.target.value);
  };

  const filterTodos = (key) => {
    const allTodosClone = [...allTodos];

    if (key === "all") {
      setFilteredTodos(allTodosClone);
    } else if (key === "completed") {
      const newTodos = allTodosClone.filter((todo) => todo.done);
      setFilteredTodos(newTodos);
    } else if (key === "nonCompleted") {
      const newTodos = allTodosClone.filter((todo) => !todo.done);
      setFilteredTodos(newTodos);
    }
  };

  const handleTodoToShowChange = (e) => {
    const filterKey = e.target.value;
    setTodosToShow(filterKey);
    filterTodos(filterKey);
  };

  return (
    <form className="todo-container">
      <div className="form-head">
        <div className="todo-addNew">
          <input
            type="text"
            id="todo-input"
            className="todo-input"
            value={newTodo}
            onChange={handleInputChange}
          />
          <label className="input-label" htmlFor="todo-input">
            What do you need to do today?
          </label>
          {empty ? (
            <div className="empty">"Oops there is no todos to add!"</div>
          ) : (
            ""
          )}
        </div>
        <button type="submit" className="add-btn" onClick={addNewTodo}>
          ADD
        </button>
      </div>

      <div className="filteredtodos-box">
        <span className="filteredtodo-btn">
          <input
            type="radio"
            id="all"
            name="todos"
            value="all"
            checked={todosToShow === "all"}
            onClick={handleTodoToShowChange}
          />
          <label htmlFor="all">ALL</label>
        </span>
        <span className="filteredtodo-btn">
          <input
            type="radio"
            id="completed"
            name="todos"
            value="completed"
            checked={todosToShow === "completed"}
            onClick={handleTodoToShowChange}
          />
          <label htmlFor="completed">COMPLETED</label>
        </span>
        <span className="filteredtodo-btn">
          <input
            type="radio"
            id="nonCompleted"
            name="todos"
            value="nonCompleted"
            checked={todosToShow === "nonCompleted"}
            onClick={handleTodoToShowChange}
          />
          <label htmlFor="nonCompleted">ACTIVE</label>
        </span>
      </div>

      <List
        items={filteredTodos}
        onBtnClick={removeHandler}
        checkHandler={checkHandler}
        editTodo={editTodo}
      />

      {allTodos?.length ? (
        <button className="clear-all" onClick={() => setAllTodos([])}>
          CLEAR ALL
        </button>
      ) : (
        " "
      )}
    </form>
  );
};

export default Form;
