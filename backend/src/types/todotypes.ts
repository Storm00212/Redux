/**
 * Data required to create a new todo item.
 * Used when a user creates a new todo through the API.
 */
export interface CreateTodoData {
   user_id: number;         // ID of the user creating the todo
   title: string;           // Required title of the todo
   description?: string;    // Optional detailed description
}

/**
 * Data for updating an existing todo item.
 * All fields are optional since updates can be partial.
 */
export interface UpdateTodoData {
   title?: string;          // New title (optional)
   description?: string;    // New description (optional)
   completed?: boolean;     // Completion status (optional)
}

/**
 * Represents a complete todo entity from the database.
 * Contains all todo information with timestamps.
 */
export interface Todo {
   id: number;              // Unique identifier for the todo
   user_id: number;         // ID of the user who owns this todo
   title: string;           // Todo title
   description?: string;    // Optional detailed description
   completed: boolean;      // Whether the todo is completed
   created_at: Date;        // Timestamp when todo was created
   updated_at: Date;        // Timestamp when todo was last updated
}
