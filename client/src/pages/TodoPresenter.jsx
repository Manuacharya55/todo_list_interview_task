import { Plus, CheckCircle2 } from "lucide-react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { TodoItem } from "../components/TodoItem";
import { TodoForm } from "../components/TodoForm";


export const TodoPresenter = ({
  todos,
  loading,
  error,
  isModalOpen,
  editingTodo,
  onOpenCreate,
  onCloseModal,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit
}) => {
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header-wrapper">
        <div>
          <h1 className="brand-title">
            <CheckCircle2 size={24} /> Tasks
          </h1>
          <p className="brand-subtitle">
            {todos.length > 0
              ? `${completedCount} of ${todos.length} completed`
              : "Keep track of your daily tasks"}
          </p>
        </div>
        <Button variant="default" onClick={onOpenCreate}>
          <Plus size={16} /> Add Task
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert-banner alert-error">
          <span>{error}</span>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && todos.length === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="todo-card"
              style={{ height: "60px", backgroundColor: "#f4f4f5" }}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && todos.length === 0 && (
        <div className="empty-state">
          <p className="empty-title">No tasks yet</p>
          <p className="empty-desc">Create your first task to stay productive.</p>
          <Button variant="default" onClick={onOpenCreate}>
            <Plus size={16} /> Add Task
          </Button>
        </div>
      )}

      {/* Todo List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggleTodo={onToggleTodo}
            onEditTodo={onEditTodo}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </div>

      {/* Add / Edit Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title={editingTodo ? "Edit Task" : "Add Task"}
      >
        <TodoForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCloseModal={onCloseModal}
          editingTodo={editingTodo}
        />
      </Modal>
    </div>
  );
};
