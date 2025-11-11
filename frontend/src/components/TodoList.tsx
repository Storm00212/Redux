/**
 * TodoList Component
 *
 * Purpose: Displays a comprehensive list of todo items belonging to the authenticated user
 *
 * Key Responsibilities:
 * - Fetches and displays all todos for the current user from the Redux store
 * - Renders individual TodoItem components for each todo in the list
 * - Handles loading states while fetching todos from the backend
 * - Displays appropriate error messages if todo fetching fails
 * - Shows an empty state message when the user has no todos yet
 * - Automatically refreshes the todo list when new todos are added or existing ones are modified
 * - Provides a clean, organized layout for todo management
 *
 * State Management:
 * - Connects to Redux store to access todo data and loading states
 * - Dispatches actions to fetch todos when component mounts
 * - Re-renders automatically when todo data changes in the store
 *
 * User Experience:
 * - Shows loading spinner during data fetching
 * - Displays helpful empty state to encourage todo creation
 * - Provides clear visual hierarchy for todo organization
 */