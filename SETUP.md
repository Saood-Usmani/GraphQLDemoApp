# Authentication Setup Guide

✅ **Authentication is now configured!** Your Application ID and Tenant ID have been set.

## ✅ Step 1: Authentication Configuration Complete

Your `src/config/authConfig.js` has been updated with:
- **Application (client) ID**: `ca17a3b2-9019-4f82-9994-d405c6514ffd`
- **Directory (tenant) ID**: `b0a75258-c8b0-47b7-a11d-b8196c8a3f97`
- **Redirect URI**: `http://localhost:5173`

## Step 2: Verify Your App Registration Settings

Ensure your Microsoft Entra app has:

### API Permissions:
- **PowerBI Service** > **Delegated permissions** > **GraphQLApi.Execute.All**
- Admin consent granted (if required)

### Authentication Platform:
- **Single-page application** platform added
- Redirect URI: `http://localhost:5173`
- **Authorization code flow with PKCE** enabled

### Advanced Settings:
- **Allow public client flows**: Yes
- **Supported account types**: Accounts in this organizational directory only (or as needed)

## Step 3: Get Your Fabric GraphQL Endpoint

1. Go to your **Microsoft Fabric workspace**
2. Navigate to your **GraphQL API** item
3. Click on the **API item** toolbar and select **Copy endpoint**
4. Copy the endpoint URL - it should look like:
   ```
   https://api.fabric.microsoft.com/v1/workspaces/{workspace-id}/graphqlapis/{graphql-api-id}/graphql
   ```

## Step 4: Test the Application

1. Start the dev server: `npm run dev`
2. Open `http://localhost:5173`
3. **Enter your GraphQL endpoint URL** in the first text field
4. **Enter or modify the GraphQL query** in the second text field
5. Click **"Query Endpoint"** - this will:
   - Trigger a sign-in popup if you're not authenticated
   - Automatically execute the query after successful authentication
   - Display the results below

## Troubleshooting

### Common Authentication Issues:

1. **AADSTS50011: The redirect URI is missing**
   - Ensure `http://localhost:5173` is added as a redirect URI
   - Check that the port matches (Vite uses 5173 by default)

2. **AADSTS700016: Application not found**
   - Verify your client ID is correct
   - Ensure the app registration exists in the correct tenant

3. **AADSTS65001: The user or administrator has not consented**
   - Grant admin consent for the GraphQLApi.Execute.All permission
   - Or ensure user consent is allowed for the application

4. **CORS Issues**
   - Add the "Mobile and desktop applications" platform with the same redirect URI
   - Ensure "Allow public client flows" is enabled

### GraphQL Query Issues:

1. **401 Unauthorized**
   - Check that your token has the correct scope
   - Verify your user has access to the Fabric workspace and GraphQL API

2. **403 Forbidden**
   - Ensure your user has Execute permissions on the GraphQL API
   - Check workspace access permissions

3. **Invalid GraphQL Query**
   - Validate your query syntax
   - Use the API editor in Fabric to test queries first

## Sample Queries

### Simple Query:
```graphql
query {
    __schema {
        queryType {
            name
        }
    }
}
```

### Table Data Query (adjust table name as needed):
```graphql
query {
    your_table_name {
        items {
            # Add your field names here
        }
    }
}
```

For more details, refer to the [Microsoft Fabric GraphQL documentation](https://learn.microsoft.com/en-us/fabric/data-engineering/connect-apps-api-graphql).
