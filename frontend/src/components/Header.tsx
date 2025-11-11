/**
 * Header Component
 *
 * Purpose: Provides consistent navigation and user information display across the application
 *
 * Key Responsibilities:
 * - Displays the application branding and title
 * - Shows current authenticated user's information (name and email)
 * - Provides logout functionality with user confirmation
 * - Creates a consistent header layout across all authenticated pages
 * - Handles responsive design for different screen sizes
 * - Manages user session termination securely
 *
 * Layout Structure:
 * - Left section: Application logo/title
 * - Right section: User information and logout controls
 * - Responsive design that adapts to mobile and desktop views
 *
 * User Information Display:
 * - Shows personalized welcome message with user's name
 * - Displays user's email address for identification
 * - Provides clear visual hierarchy for user data
 *
 * Logout Functionality:
 * - Logout button with confirmation dialog to prevent accidental logout
 * - Calls parent component's logout handler
 * - Ensures proper cleanup of user session and local storage
 * - Redirects user back to login page after logout
 *
 * UI/UX Features:
 * - Clean, professional header design
 * - Consistent branding across the application
 * - Intuitive logout placement and confirmation
 * - Responsive layout that works on all device sizes
 * - Accessibility support for screen readers and keyboard navigation
 * - Visual feedback for interactive elements
 *
 * Security Considerations:
 * - Only displays user information when user is authenticated
 * - Secure logout process that clears all session data
 * - Prevents unauthorized access to logout functionality
 */