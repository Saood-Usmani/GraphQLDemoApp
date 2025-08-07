# Fabric GraphQL Query Tool

A React application that allows users to query Microsoft Fabric GraphQL APIs using authenticated tokens through Microsoft Authentication Library (MSAL).

## Features

- 🔐 **Microsoft Entra Authentication** - Secure authentication using MSAL with PKCE flow
- 🔍 **GraphQL Query Interface** - User-friendly interface for entering GraphQL endpoints and queries
- 📊 **Real-time Results** - Execute queries and view formatted JSON responses
- 🎨 **Modern UI** - Clean, responsive design using React Bootstrap
- ⚡ **Fast Development** - Built with Vite for optimal development experience

## Prerequisites

Before running this application, ensure you have:

1. **Microsoft Entra App Registration** with:
   - Application (client) ID
   - Directory (tenant) ID  
   - `https://analysis.windows.net/powerbi/api/GraphQLApi.Execute.All` scope configured
   - Redirect URI set to `http://localhost:5173` for development

2. **Microsoft Fabric GraphQL API** set up and accessible

3. **Node.js** (v14 or higher) and npm installed

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Open `src/config/authConfig.js`
2. Replace the placeholder values:
   ```javascript
   export const msalConfig = {
       auth: {
           clientId: "Your_Application_Client_ID_Here",
           authority: "https://login.microsoftonline.com/Your_Tenant_ID_Here",
           redirectUri: "http://localhost:5173",
       },
       // ... rest of config
   };
   ```

## Development

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Usage

1. **Sign In**: Click the "Sign In" button in the navigation bar
2. **Enter Endpoint**: Provide your Fabric GraphQL API endpoint URL
3. **Write Query**: Enter your GraphQL query (a sample query is pre-filled)
4. **Execute**: Click "Execute Query" to run the query with your authenticated token
5. **View Results**: Results will be displayed in a formatted JSON viewer

## Project Structure

```
src/
├── components/
│   ├── GraphQLQueryForm.jsx    # Main query interface
│   ├── NavigationBar.jsx       # Authentication navigation
│   └── PageLayout.jsx          # Page layout wrapper
├── config/
│   └── authConfig.js           # MSAL configuration
├── services/
│   └── graphqlService.js       # GraphQL utility functions
├── App.jsx                     # Main application component
└── main.jsx                    # Application entry point
```

## Authentication Flow

This application uses the Microsoft Authentication Library (MSAL) with:
- **Public Client Application** for single-page apps
- **Authorization Code Flow with PKCE** for security
- **Silent token acquisition** for seamless API calls
- **Scoped permissions** specifically for Fabric GraphQL APIs

## Sample Queries

The application includes sample GraphQL queries for:
- Public holidays data
- GraphQL schema introspection

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify your client ID and tenant ID are correct
   - Ensure redirect URI matches exactly (including port)
   - Check that GraphQLApi.Execute.All scope is granted

2. **CORS Issues**
   - Add Mobile and desktop applications platform with the same redirect URI
   - Ensure "Allow public client flows" is enabled

3. **Query Errors**
   - Verify the GraphQL endpoint URL is correct
   - Check that your authenticated user has proper permissions
   - Ensure the query syntax is valid GraphQL

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and development server
- **MSAL React** - Microsoft authentication
- **React Bootstrap** - UI components
- **Bootstrap 5** - CSS framework

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For issues related to:
- **Microsoft Fabric GraphQL APIs**: Check the [official documentation](https://learn.microsoft.com/en-us/fabric/data-engineering/connect-apps-api-graphql)
- **MSAL Authentication**: Visit the [MSAL.js documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js)
- **This Application**: Open an issue in the repository+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
