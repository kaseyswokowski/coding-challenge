import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./Todo";
import Todos from "./Todos";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/todo/:id" element={<Todo />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
