import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import SearchForm from "./components/SearchForm";

const initialTodo = [
  { id: uuidv4(), title: "Play game", completed: false },
  { id: uuidv4(), title: "Shopping", completed: true },
  { id: uuidv4(), title: "Meet the doctor", completed: false },
];

function App() {
  const [todos, setTodos] = useState(initialTodo);
  const [searchInput, setSearchInput] = useState("");
  const [filterTrue, setFilterTrue] = useState(false);
  const [filterFalse, setFilterFalse] = useState(false);

  const filterColorTrue = todos.filter(el => el.completed === true);
  const filterColorFalse = todos.filter(el => el.completed === false);

  const filterTodos = todos.filter((el) =>
    el.title.toLowerCase().includes(searchInput)
  );

  const myFilter = () => {
    if (filterTrue == true) {
      if (searchInput !== "") {
      return filterColorTrue.filter((el) =>
      el.title.toLowerCase().includes(searchInput)
      )}
      else {
        return filterColorTrue
    }}
    else if (filterFalse == true) {
      if (searchInput !== "") {
        return filterColorFalse.filter((el) =>
        el.title.toLowerCase().includes(searchInput)
      )}
      else {
        return filterColorFalse;
      }
    }
    else return filterTodos;
  }
  
  const createTodo = (title) => {
    const newTodo = { id: uuidv4(), title, completed: false };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id) => {
    const idx = todos.findIndex((el) => el.id === id);
    const newTodosState = [...todos];
    newTodosState.splice(idx, 1);
    setTodos(newTodosState);
  };

  const updateTodo = (id, updateValue) => {
    const idx = todos.findIndex((el) => el.id === id);
    const newTodosState = [...todos];
    newTodosState[idx] = { ...newTodosState[idx], ...updateValue };
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
