import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import SearchForm from "./components/SearchForm";
import axios from "axios";

const initialTodo = [];

function App() {
  
  const [todos, setTodos] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filterTrue, setFilterTrue] = useState(false);
  const [filterFalse, setFilterFalse] = useState(false);
  
  const filterColorTrue = todos.filter((el) => el.completed === true);
  const filterColorFalse = todos.filter((el) => el.completed === false);
  
  useEffect(function () {
    axios.get("http://localhost:8080/todos").then(function (res) {
      setTodos(res.data.todos)
      // console.log(res.data.todos);
    });
  }, []);

  const filterTodos = todos.filter((el) =>
    el.title.toLowerCase().includes(searchInput)
  );

//! Search filter
  const myFilter = () => {
    if (filterTrue == true) {
      if (searchInput !== "") {
        return filterColorTrue.filter((el) =>
          el.title.toLowerCase().includes(searchInput)
        );
      } else {
        return filterColorTrue;
      }
    } else if (filterFalse == true) {
      if (searchInput !== "") {
        return filterColorFalse.filter((el) =>
          el.title.toLowerCase().includes(searchInput)
        );
      } else {
        return filterColorFalse;
      }
    } else return filterTodos;
  };
  
//! Add input
  const createTodo = (title) => {
      const newTodo = { id: uuidv4(), title, completed: false };
      axios.post('http://localhost:8080/todos', newTodo);
      setTodos([newTodo, ...todos]);
    };

//! Delete data
  const deleteTodo = (id) => {
    const idx = todos.findIndex((el) => el.id === id);
    const newTodosState = [...todos];
    newTodosState.splice(idx, 1);
    axios.delete(`http://localhost:8080/todos/${id}`)
    setTodos(newTodosState);
  };
//! Delete Data

//! Edit todos
  const updateTodo = (id, updateValue) => {
    const idx = todos.findIndex((el) => el.id === id);
    const newTodosState = [...todos];
    newTodosState[idx] = { ...newTodosState[idx], ...updateValue };
    axios.put(`http://localhost:8080/todos/${id}`, updateValue)
    setTodos(newTodosState);
  };

  return (
    <div className="container py-5" style={{ maxWidth: 576 }}>
      <TodoForm createTodo={createTodo} />
      <br />
      <SearchForm
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        setFilterFalse={setFilterFalse}
        setFilterTrue={setFilterTrue}
        filterFalse={filterFalse}
        filterTrue={filterTrue}
      />
      <br />
      <ul className="list-group">
        {myFilter().map((el) => (
          <TodoItem
            key={el.id}
            todo={el}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
