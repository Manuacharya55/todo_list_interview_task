import { Todo } from "../models/todo.model.js";
import { ApiSuccess } from "../utils/ApiResponse.js";
import { NotFoundError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ====================================== //
// Controller to Create a New Todo Item                     //
// @params [req, res, next]
// @return [Promise<express.Response>]
// ====================================== //
export const createTodo = asyncHandler(async (req, res) => {
  const { title, description, completed } = req.body;

  const todo = await Todo.create({
    title,
    description,
    completed
  });

  return res
    .status(201)
    .json(new ApiSuccess(201, todo, "Todo created successfully"));
});

// ====================================== //
// Controller to Retrieve All Todo Items                    //
// @params [req, res, next]
// @return [Promise<express.Response>]
// ====================================== //
export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiSuccess(200, todos, "Todos retrieved successfully"));
});

// ====================================== //
// Controller to Retrieve a Single Todo by ID               //
// @params [req, res, next]
// @return [Promise<express.Response>]
// ====================================== //
export const getTodoById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (!todo) {
    throw new NotFoundError("Todo not found");
  }

  return res
    .status(200)
    .json(new ApiSuccess(200, todo, "Todo retrieved successfully"));
});

// ====================================== //
// Controller to Update a Todo Item by ID                   //
// @params [req, res, next]
// @return [Promise<express.Response>]
// ====================================== //
export const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!todo) {
    throw new NotFoundError("Todo not found");
  }

  return res
    .status(200)
    .json(new ApiSuccess(200, todo, "Todo updated successfully"));
});

// ====================================== //
// Controller to Toggle Todo Completed Status               //
// @params [req, res, next]
// @return [Promise<express.Response>]
// ====================================== //
export const toggleTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (!todo) {
    throw new NotFoundError("Todo not found");
  }

  todo.completed = !todo.completed;
  await todo.save();

  return res
    .status(200)
    .json(new ApiSuccess(200, todo, "Todo status toggled successfully"));
});

// ====================================== //
// Controller to Delete a Todo Item by ID                   //
// @params [req, res, next]
// @return [Promise<express.Response>]
// ====================================== //
export const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    throw new NotFoundError("Todo not found");
  }

  return res
    .status(200)
    .json(new ApiSuccess(200, { id: todo._id }, "Todo deleted successfully"));
});
