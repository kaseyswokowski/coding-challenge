import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredData, setFilteredData] = useState(todos);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((result) => {
      setTodos(result.data);
      setFilteredData(result.data);
    });
  }, []); //[] only fires one time when the compent loads

  const onUpdateTodo = (todo) => {
    const todoItemIndex = todos.findIndex((x) => x.id == todo.id);
    const newTodos = [...todos];

    const newTodo = newTodos[todoItemIndex];
    newTodo.completed = !newTodo.completed;
    newTodos[todoItemIndex] = newTodo;
    setTodos(newTodos);
  };

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = todos.filter((data) => {
      return data.title.search(value) != -1;
    });
    setFilteredData(result);
  };

  function handleSort() {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
    });
    setFilteredData(sortedData);
  }

  function handleSortDesc() {
    const sortedData = [...filteredData].sort((a, b) => {
      if (b.title.toLowerCase() < a.title.toLowerCase()) return -1;
    });
    setFilteredData(sortedData);
  }

  return (
    <div>
      <div className="App">
        <div style={{ margin: "0 auto", marginTop: "10%" }}>
          <label className="Search">Search:</label>
          <input type="text" onChange={(event) => handleSearch(event)} />
        </div>

        <div>
          <button className="sort-button" onClick={handleSort}>
            A to Z
          </button>
          <button className="sort-button" onClick={handleSortDesc}>
            Z to A
          </button>
        </div>

        <div style={{ padding: 10 }}>
          {filteredData.map((value, index, todo, id) => {
            return (
              <Link className="link" to={`/todo/${value.id}`}>
                <li key={todo.id} className="todo-row">
                  {value.title}

                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onUpdateTodo(value)}
                  />
                </li>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
