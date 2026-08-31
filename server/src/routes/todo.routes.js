import { Router } from "express";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  toggleTodo,
  deleteTodo
} from "../controllers/todo.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { todoSchema } from "../validators/todo.validator.js";

const router = Router();

router
  .route("/")
  .get(getTodos)
  .post(validate(todoSchema), createTodo);

router
  .route("/:id")
  .get(getTodoById)
  .patch(validate(todoSchema), updateTodo)
  .delete(deleteTodo);

router.patch("/:id/toggle", toggleTodo);

export default router;
