import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const Todo = () => {
  const { id } = useParams();

  const [todoDetails, setTodoDetails] = useState();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => {
        const responseTodo = res.data;
        setTodoDetails(responseTodo);
      });
  }, []);
  const { id: todoId, userId, title, completed } = todoDetails || {};
  return (
    <div className="todo-row">
      {todoDetails ? (
        <div>
          <h1> {`Todo id: ${todoId}`} </h1>
          <h1> {`Todo userId: ${userId}`} </h1>
          <h1> {`Todo title: ${title}`} </h1>
          <h1> {`Todo completed: ${completed}`} </h1>
          <button className="sort-button">
            <Link to="/">Go Back</Link>
          </button>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default Todo;
