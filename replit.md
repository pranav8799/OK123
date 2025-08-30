# Overview

This is a full-stack KYC (Know Your Customer) CRM application built with React and Express. The application provides a comprehensive multi-step KYC onboarding process for businesses, complete with dashboard analytics, document management, and reporting features. Users can submit KYC applications through a guided 5-step process that collects personal details, documents, shop information, business documents, and final declarations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components with Radix UI primitives for accessible, composable components
- **Styling**: Tailwind CSS with custom CSS variables for theming and dark/light mode support
- **State Management**: React Hook Form for form handling with Zod validation schemas
- **Data Fetching**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **File Structure**: Component-based architecture with separate directories for pages, components, hooks, and utilities

## Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Development Setup**: Uses Vite middleware in development for hot module replacement
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) that can be easily swapped for database implementations
- **Route Structure**: Modular route registration system with centralized error handling
- **Build Process**: esbuild for server bundling with ESM module format

## Multi-Step KYC Process
- **Step 1**: Personal details collection with OTP verification for mobile/email/Aadhaar, live selfie capture, and bank details
- **Step 2**: Personal document uploads (Aadhaar, PAN, cancelled cheque, ITR, etc.)
- **Step 3**: Shop information including business type selection and shop-specific bank details
- **Step 4**: Business document uploads that vary based on business type (proprietorship, partnership, private limited)
- **Step 5**: Final review and declarations with submission to LOS (Loan Origination System)

## Dashboard and Analytics
- **Mock Data Visualization**: Pie charts for application status distribution and bar charts for monthly trends
- **Statistics Cards**: Real-time display of total applications, approval rates, rejection rates, and processing status
- **Reports Section**: Comprehensive reporting with filtering capabilities and export functionality

## Design System
- **Theme Support**: Built-in light/dark mode with CSS custom properties
- **Component Library**: Comprehensive UI component system using shadcn/ui with consistent styling
- **Responsive Design**: Mobile-first approach with responsive navigation and layouts
- **Color Scheme**: Professional green primary color (#16a34a) with neutral grays for secondary elements

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18 with TypeScript, React DOM, and React Hook Form for form management
- **Build Tools**: Vite for frontend bundling, esbuild for server bundling, and PostCSS for CSS processing
- **Database ORM**: Drizzle ORM with PostgreSQL dialect configured for type-safe database operations
- **Validation**: Zod for runtime type checking and form validation schemas

## UI and Styling Dependencies
- **Component System**: Radix UI primitives for accessible headless components
- **Styling**: Tailwind CSS for utility-first styling with class-variance-authority for component variants
- **Icons**: Lucide React for consistent iconography
- **Charts**: Recharts for data visualization in dashboard and reports

## Database and Storage
- **Database**: PostgreSQL with Neon serverless database provider (@neondatabase/serverless)
- **ORM**: Drizzle ORM for type-safe database queries and migrations
- **Session Storage**: connect-pg-simple for PostgreSQL-backed session storage

## Development and Utilities
- **Date Handling**: date-fns for date manipulation and formatting
- **Query Management**: TanStack React Query for server state management
- **File Handling**: Built-in file upload components with drag-and-drop support
- **Camera Integration**: Custom camera capture component for live selfie functionality
- **Routing**: Wouter for lightweight client-side routing without the overhead of React Router