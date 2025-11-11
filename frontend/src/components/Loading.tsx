/**
 * Loading Component
 *
 * Purpose: Provides visual feedback during asynchronous operations and loading states
 *
 * Key Responsibilities:
 * - Displays animated loading spinner to indicate background processes
 * - Shows customizable loading messages to inform users of current operation
 * - Supports multiple sizes for different use cases and contexts
 * - Provides consistent loading experience across the application
 * - Handles accessibility requirements for screen readers
 * - Prevents user interaction during loading states when needed
 *
 * Visual Design:
 * - Animated spinner with smooth rotation animation
 * - Centered layout with proper spacing and alignment
 * - Customizable size variants (small, medium, large)
 * - Consistent styling that matches application theme
 * - Overlay capability for full-screen loading states
 *
 * Customization Options:
 * - Message prop for contextual loading text
 * - Size prop for different loading contexts
 * - Optional overlay mode for blocking interactions
 * - Custom styling through CSS class overrides
 *
 * Usage Scenarios:
 * - API calls and data fetching operations
 * - Form submissions and user actions
 * - Page transitions and route changes
 * - Initial application loading
 * - Authentication processes
 *
 * Accessibility Features:
 * - Screen reader announcements for loading states
 * - ARIA labels and roles for assistive technologies
 * - Keyboard navigation support where applicable
 * - High contrast support for visibility
 * - Reduced motion preferences respect
 *
 * Performance Considerations:
 * - Lightweight component with minimal DOM impact
 * - CSS-only animations for better performance
 * - Lazy loading support for code splitting
 * - Memory efficient with proper cleanup
 *
 * Integration Points:
 * - Redux loading states from async thunks
 * - API service loading indicators
 * - Route transitions and navigation guards
 * - Form submission states
 */