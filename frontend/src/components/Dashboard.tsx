/**
 * Dashboard Component
 *
 * Purpose: Serves as the main application interface for authenticated users after login
 *
 * Key Responsibilities:
 * - Acts as the central hub for all authenticated user interactions
 * - Displays personalized welcome message with user information
 * - Provides access to all core todo management features
 * - Handles user logout functionality and session management
 * - Coordinates between different child components for seamless user experience
 * - Manages overall application layout and navigation for logged-in users
 *
 * Layout Structure:
 * - Header section with user info and logout controls
 * - Welcome section with personalized greeting
 * - Todo management section divided into form and list areas
 * - Responsive design that adapts to different screen sizes
 *
 * Child Components Integration:
 * - Header: Displays user info and logout button
 * - TodoForm: Allows creation of new todo items
 * - TodoList: Shows all user's existing todos
 * - Loading: Shows loading states during data operations
 *
 * State Management:
 * - Connects to Redux store to access current user information
 * - Dispatches logout actions to clear user session
 * - Handles loading states for smooth user experience
 * - Manages localStorage cleanup on logout
 *
 * User Experience Features:
 * - Personalized welcome message using user's name
 * - Clear visual separation between different functional areas
 * - Intuitive layout that guides users through todo management
 * - Consistent navigation and logout functionality
 * - Loading states to indicate background operations
 * - Error handling for failed operations
 *
 * Security Considerations:
 * - Only accessible to authenticated users
 * - Proper session cleanup on logout
 * - Secure token management and storage
 */