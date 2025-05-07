import style from "./todo-item.module.css";

export default function TodoItem({ content, DeleteTodo }) {
  return (
    <div className={style.container}>
      {content}
      <button onClick={() => DeleteTodo(content)}>❌</button>
    </div>
  );
}
