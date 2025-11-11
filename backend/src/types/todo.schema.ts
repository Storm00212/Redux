/**
 * Todo-related TypeScript type definitions.
 * Defines the structure of todo data used throughout the application.
 */

/**
 * Represents a todo item entity from the database.
 * Contains todo information including creator reference via user ID.
 */
export type todo = {
    id: number,
    name: string,
    description: string,
    createdBy: number
}