import styles from "./todo-item.module.css";

export default function TodoItem({ content, onDelete }) {
  return (
    <div className={styles.container}>
      {content}
      <button onClick={() => onDelete(content)}>❌</button>
    </div>
  );
}
