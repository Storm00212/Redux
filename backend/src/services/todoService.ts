import TodoRepository from "../repositories/todoRepository";
import { UserService } from "./userService";
import { CreateTodoData, UpdateTodoData, Todo } from "../types/todotypes";

/**
 * Service class handling todo-related business logic.
 * Provides CRUD operations for todos with user authorization checks.
 */
export class TodoService {
    private todoRepository: TodoRepository;
    private userService: UserService;

    /**
     * Initializes the service with TodoRepository and UserService instances.
     */
    constructor() {
        this.todoRepository = new TodoRepository();
        this.userService = new UserService();
    }

    /**
     * Creates a new todo item for a specific user.
     * Validates user existence before creating the todo.
     * @param userId - ID of the user creating the todo
     * @param todoData - Todo creation data (title, description)
     * @returns Promise<Todo> - Created todo object
     * @throws Error if user doesn't exist
     */
    async createTodo(userId: number, todoData: CreateTodoData): Promise<Todo> {
        await this.userService.ensureUserExists(userId);
        const createData: CreateTodoData = {
            user_id: userId,
            title: todoData.title,
            description: todoData.description
        };
        return await this.todoRepository.createTodo(createData);
    }

    /**
     * Retrieves all todo items for a specific user.
     * Validates user existence before fetching todos.
     * @param userId - ID of the user whose todos to retrieve
     * @returns Promise<Todo[]> - Array of user's todo items
     * @throws Error if user doesn't exist
     */
    async getTodos(userId: number): Promise<Todo[]> {
        await this.userService.ensureUserExists(userId);
        return await this.todoRepository.getTodos(userId);
    }

    /**
     * Updates a specific todo item for a user.
     * Validates user and todo ownership before updating.
     * @param userId - ID of the user requesting the update
     * @param todoId - ID of the todo to update
     * @param updates - Partial update data (title, description, completed)
     * @returns Promise<Todo | null> - Updated todo object or null
     * @throws Error if user doesn't exist or todo not found/owned by user
     */
    async updateTodo(userId: number, todoId: number, updates: UpdateTodoData): Promise<Todo | null> {
        await this.userService.ensureUserExists(userId);
        // First, check if the todo exists and belongs to the user
        const todos = await this.todoRepository.getTodos(userId);
        const todo = todos.find(t => t.id === todoId);
        if (!todo) {
            throw new Error("Todo not found or does not belong to user");
        }
        return await this.todoRepository.updateTodo(todoId, updates);
    }

    /**
     * Deletes a specific todo item for a user.
     * Validates user and todo ownership before deletion.
     * @param userId - ID of the user requesting the deletion
     * @param todoId - ID of the todo to delete
     * @returns Promise<boolean> - True if todo was deleted
     * @throws Error if user doesn't exist or todo not found/owned by user
     */
    async deleteTodo(userId: number, todoId: number): Promise<boolean> {
        await this.userService.ensureUserExists(userId);
        // Check if the todo exists and belongs to the user
        const todos = await this.todoRepository.getTodos(userId);
        const todo = todos.find(t => t.id === todoId);
        if (!todo) {
            throw new Error("Todo not found or does not belong to user");
        }
        return await this.todoRepository.deleteTodo(todoId);
    }
}