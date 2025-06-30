# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the LatSpace ESG Management System.

## Project Overview

LatSpace is an Agentic AI Sustainability Management Software built with React and TypeScript. It helps organizations collect, manage, and visualize their ESG (Environmental, Social, Governance) data through an intuitive web interface.

## Build and Development Commands

- `npm start` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm test` - Run test suite

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context API
- **Authentication**: Mock authentication with localStorage

### Project Structure
```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout and navigation
│   ├── dashboard/      # Dashboard components
│   └── data-collection/ # ESG data entry forms
├── pages/              # Route components
├── context/            # React contexts
├── types/              # TypeScript interfaces
└── utils/              # Utilities and mock data
```

### User Roles
1. **Admin**: View all facilities, facility dashboards, and aggregated metrics
2. **Facility Head**: Manage single facility data, enter ESG metrics, upload documents

### Key Features
- Role-based authentication and routing
- Interactive dashboards with charts and metrics
- Multi-modal data entry (manual, document upload, bulk Excel)
- Progress tracking and data completeness monitoring
- Responsive design for all screen sizes

## Mock Data

The application uses mock data for demonstration:
- **Users**: admin/admin123, facility1/facility123, facility2/facility123
- **Facilities**: 4 sample facilities with ESG data
- **ESG Metrics**: Environmental, Social, and Governance data points

## Key Configuration Files

- **Tailwind CSS**: `tailwind.config.js` - Custom theme and styling
- **TypeScript**: `tsconfig.json` - Compiler options and paths
- **Package Management**: `package.json` - Dependencies and scripts
- **Environment**: `.env` (if exists) - API endpoints and configuration

## Development Guidelines

### Code Style
- Use functional components with TypeScript
- Implement proper type safety with interfaces
- Follow React best practices (hooks, composition)
- Maintain consistent file naming (PascalCase for components)

### State Management
- Use Context API for global state (auth, theme)
- Local state with useState for component-specific data
- Consider useReducer for complex state logic

### Performance
- Implement lazy loading for routes
- Use React.memo for expensive components
- Optimize re-renders with useCallback and useMemo

### Testing Approach
- Unit tests for utilities and helpers
- Component testing with React Testing Library
- Integration tests for critical user flows

## Development Notes

- Authentication state persists in localStorage
- Form data auto-saves as drafts during entry
- Charts render responsively using Recharts
- All routes are protected based on user roles
- Mock file processing simulates real upload workflows