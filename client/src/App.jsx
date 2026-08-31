import React from "react";
import { TodoProvider } from "./context/TodoContext";
import { TodoPage } from "./pages/TodoPage";

// ====================================== //
//         Root App Component Providing Todo Context             //
// ====================================== //
export default function App() {
  return (
    <TodoProvider>
      <TodoPage />
    </TodoProvider>
  );
}
