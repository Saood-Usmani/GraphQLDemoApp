# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React application that connects to Microsoft Fabric GraphQL APIs using MSAL authentication. 

## Key Technologies
- React with Vite
- MSAL (Microsoft Authentication Library) for Azure AD authentication
- React Bootstrap for UI components
- Microsoft Fabric GraphQL API integration

## Authentication Flow
- Uses MSAL with the scope `https://analysis.windows.net/powerbi/api/GraphQLApi.Execute.All`
- Requires Microsoft Entra app registration with proper permissions
- Implements PKCE flow for single-page applications

## Project Structure
- `/src/config/authConfig.js` - MSAL configuration and authentication settings
- `/src/components/` - React components for UI and functionality
- `/src/services/` - GraphQL service utilities

## Development Notes
- Follow React best practices and hooks patterns
- Use Bootstrap components for consistent styling
- Handle authentication states properly with MSAL React hooks
- Implement proper error handling for GraphQL requests
