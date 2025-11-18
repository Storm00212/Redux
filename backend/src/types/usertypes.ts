/**
 * Backend Type Definitions
 * TypeScript interfaces and types for the backend application.
 * Defines data structures for database entities and API payloads.
 */

export interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at: Date;
}

export interface RegisterData {
  email: string;
  password_hash: string;
}


