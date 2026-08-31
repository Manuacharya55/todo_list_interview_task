import { Edit2, Trash2 } from "lucide-react";
import { Button } from "./Button";

export const TodoItem = ({
  todo,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo
}) => {
  return (
    <div className={`todo-card ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo._id)}
        aria-label="Toggle task completion"
      />
      <div className="todo-main">
        <span className="todo-title">{todo.title}</span>
        {todo.description && (
          <p className="todo-desc">{todo.description}</p>
        )}
      </div>
      <div className="todo-actions">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEditTodo(todo)}
          aria-label="Edit task"
        >
          <Edit2 size={15} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDeleteTodo(todo._id)}
          aria-label="Delete task"
          style={{ color: "#ef4444" }}
        >
          <Trash2 size={15} />
        </Button>
      </div>
    </div>
  );
};
