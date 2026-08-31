import React from "react";
import { Button } from "./Button";
import { Input } from "./Input";

export const TodoForm = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  onSubmit,
  onCloseModal,
  editingTodo
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Title *"
        placeholder="Enter task title..."
        error={errors.title?.message}
        {...register("title")}
      />
      <Input
        label="Description (Optional)"
        placeholder="Enter short description..."
        error={errors.description?.message}
        {...register("description")}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "0.5rem",
          marginTop: "1.25rem"
        }}
      >
        <Button
          type="button"
          variant="outline"
          onClick={onCloseModal}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : editingTodo
            ? "Save Changes"
            : "Add Task"}
        </Button>
      </div>
    </form>
  );
};
