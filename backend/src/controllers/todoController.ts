import { Request, Response } from "express";
import { TodoService } from "../services/todoService";
import { CreateTodoData, UpdateTodoData } from "../types/todotypes";

const todoService = new TodoService();

/**
 * Controller class handling todo-related HTTP requests.
 * Provides CRUD endpoints for todo management with user authentication.
 */
export class TodoController {
    /**
     * Handles requests to create a new todo item.
     * Requires user authentication and validates input data.
     * @param req - Express request object with todo data in body
     * @param res - Express response object
     * @returns JSON response with created todo or error
     */
    static async createTodo(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id || req.body.userId;
            if (!userId) {
                return res.status(401).json({ error: "User not authenticated" });
            }
            const todoData: CreateTodoData = req.body;
            const todo = await todoService.createTodo(userId, todoData);
            res.status(201).json({
                message: "Todo created successfully",
                todo
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Handles requests to retrieve all todos for the authenticated user.
     * @param req - Express request object
     * @param res - Express response object
     * @returns JSON response with array of user's todos or error
     */
    static async getTodos(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id || parseInt(req.params.userId);
            if (!userId) {
                return res.status(401).json({ error: "User not authenticated" });
            }
            const todos = await todoService.getTodos(userId);
            res.status(200).json(todos);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Handles requests to update a specific todo item.
     * Validates user ownership and applies partial updates.
     * @param req - Express request object with todo ID in params and updates in body
     * @param res - Express response object
     * @returns JSON response with updated todo or error
     */
    static async updateTodo(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id;
            if (!userId) {
                return res.status(401).json({ error: "User not authenticated" });
            }
            const todoId = parseInt(req.params.id);
            if (isNaN(todoId)) {
                return res.status(400).json({ error: "Invalid todo ID" });
            }
            const updates: UpdateTodoData = req.body;
            const todo = await todoService.updateTodo(userId, todoId, updates);
            if (!todo) {
                return res.status(404).json({ error: "Todo not found" });
            }
            res.status(200).json({
                message: "Todo updated successfully",
                todo
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Handles requests to delete a specific todo item.
     * Validates user ownership before deletion.
     * @param req - Express request object with todo ID in params
     * @param res - Express response object
     * @returns JSON response with success message or error
     */
    static async deleteTodo(req: Request, res: Response) {
        try {
            const userId = (req as any).user?.id;
            if (!userId) {
                return res.status(401).json({ error: "User not authenticated" });
            }
            const todoId = parseInt(req.params.id);
            if (isNaN(todoId)) {
                return res.status(400).json({ error: "Invalid todo ID" });
            }
            const deleted = await todoService.deleteTodo(userId, todoId);
            if (!deleted) {
                return res.status(404).json({ error: "Todo not found" });
            }
            res.status(200).json({ message: "Todo deleted successfully" });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}