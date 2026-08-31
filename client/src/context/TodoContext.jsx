import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const TodoContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/todos";


export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all todos from server
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Add a new todo
  const addTodo = async (todoData) => {
    try {
      const response = await axios.post(API_URL, todoData);
      setTodos((prev) => [response.data.data, ...prev]);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create todo";
      return { success: false, error: msg };
    }
  };

  // Update existing todo
  const updateTodo = async (id, updatedData) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, updatedData);
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? response.data.data : t))
      );
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update todo";
      return { success: false, error: msg };
    }
  };

  // Toggle todo completed status
  const toggleTodo = async (id) => {
    // Optimistic UI update
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
    );
    try {
      await axios.patch(`${API_URL}/${id}/toggle`);
    } catch (err) {
      console.error("Failed to toggle status:", err.message);
      // Revert if request fails
      fetchTodos();
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete todo";
      return { success: false, error: msg };
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        fetchTodos,
        addTodo,
        updateTodo,
        toggleTodo,
        deleteTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};


export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
