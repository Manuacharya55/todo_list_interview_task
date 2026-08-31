import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodos } from "../context/TodoContext";
import { todoFormSchema } from "../validators/todoForm.validator";
import { TodoPresenter } from "./TodoPresenter";


export const TodoContainer = () => {
  const {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo
  } = useTodos();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  });

  // opens add todo model
  const handleOpenCreate = () => {
    setEditingTodo(null);
    reset({ title: "", description: "" });
    setIsModalOpen(true);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    reset({
      title: todo.title,
      description: todo.description || ""
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
    reset({ title: "", description: "" });
  };

  const handleFormSubmit = async (data) => {
    if (editingTodo) {
      const res = await updateTodo(editingTodo._id, data);
      if (res.success) handleCloseModal();
    } else {
      const res = await addTodo(data);
      if (res.success) handleCloseModal();
    }
  };

  return (
    <TodoPresenter
      todos={todos}
      loading={loading}
      error={error}
      isModalOpen={isModalOpen}
      editingTodo={editingTodo}
      onOpenCreate={handleOpenCreate}
      onCloseModal={handleCloseModal}
      onToggleTodo={toggleTodo}
      onEditTodo={handleEditTodo}
      onDeleteTodo={deleteTodo}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleFormSubmit}
    />
  );
};
