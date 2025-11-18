import TodoRepository from "../repositories/todoRepository";
import { UserService } from "./userService";
import { CreateTodoData, UpdateTodoData, Todo } from "../types/todotypes";

export class TodoService {
    private todoRepository: TodoRepository;
    private userService: UserService;

    constructor() {
        this.todoRepository = new TodoRepository();
        this.userService = new UserService();
    }

    async createTodo(userId: number, todoData: CreateTodoData): Promise<Todo> {
        await this.userService.ensureUserExists(userId);
        const createData: CreateTodoData = {
            user_id: userId,
            title: todoData.title,
            description: todoData.description
        };
        return await this.todoRepository.createTodo(createData);
    }

    async getTodos(userId: number): Promise<Todo[]> {
        await this.userService.ensureUserExists(userId);
        return await this.todoRepository.getTodos(userId);
    }

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