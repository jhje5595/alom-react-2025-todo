import { useEffect, useState } from "react";
import style from "./todo-list.module.css";
import TodoItem from "./todo-item";

function App() {
  // 과제1-1: 7-1, 7-2강을 듣고 이곳에 투두리스트 컴포넌트를 작성해주세요.

  const [toDo, setTodo] = useState("");
  const [toDos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    setTodo(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (toDo === "") return;
    setTodos((currentArray) => [toDo, ...currentArray]);
    setTodo("");
  }

  function DeleteTodo(content) {
    const newTodo = toDos.filter((todo) => todo !== content);
    setTodos(newTodo);
  }

  useEffect(() => {
    const saved = localStorage.getItem("my_todos");
    if (saved) setTodos(JSON.parse(saved));
    setLoading(true); // 데이터를 불러온 뒤에만 로컬 스토리지에 저장 -> 마운트 되자마자 빈 배열을 로컬 스토리지에 저장하는 것을 막음
  }, []);

  useEffect(() => {
    if (loading) {
      localStorage.setItem("my_todos", JSON.stringify(toDos));
    }
  }, [toDos, loading]);

  return (
    <div className={style.container}>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit} className={style.form_container}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="할 일을 입력하세요."
        />
        <button type="submit">작성하기</button>
      </form>
      <hr />
      {toDos.length === 0 ? (
        <div>예정된 할 일이 없습니다.</div>
      ) : (
        <div className={style.todo_list_container}>
          {toDos.map((toDo, idx) => (
            <TodoItem key={idx} content={toDo} DeleteTodo={DeleteTodo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
