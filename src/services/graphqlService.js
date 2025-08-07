/**
 * GraphQL service utilities for making authenticated requests to Fabric APIs
 */

/**
 * Execute a GraphQL query against a Fabric endpoint with authentication
 * @param {string} endpoint - The GraphQL endpoint URL
 * @param {string} query - The GraphQL query string
 * @param {string} accessToken - The authenticated access token
 * @param {Object} variables - Optional GraphQL variables
 * @returns {Promise<Object>} The GraphQL response
 */
export const executeGraphQLQuery = async (endpoint, query, accessToken, variables = null) => {
    const requestBody = { query };
    
    if (variables && Object.keys(variables).length > 0) {
        requestBody.variables = variables;
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
};

/**
 * Validate if a URL is a valid GraphQL endpoint format
 * @param {string} url - The URL to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidGraphQLEndpoint = (url) => {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.protocol === 'https:' && 
               (parsedUrl.hostname.includes('fabric.microsoft.com') || 
                parsedUrl.hostname.includes('api.fabric.microsoft.com'));
    } catch {
        return false;
    }
};

/**
 * Sample GraphQL queries for testing
 */
export const sampleQueries = {
    // Discover all available query types and fields
    schemaIntrospection: `query IntrospectionQuery {
    __schema {
        queryType {
            name
            fields {
                name
                description
                type {
                    name
                    kind
                    ofType {
                        name
                        kind
                    }
                }
            }
        }
    }
}`,

    // Discover all types in the schema
    allTypes: `query {
    __schema {
        types {
            name
            kind
            description
            fields {
                name
                type {
                    name
                    kind
                }
            }
        }
    }
}`,

    // Simple query to test connectivity
    simpleTest: `query {
    __typename
}`,

    // Example table query template (replace 'your_table_name' with actual table)
    tableTemplate: `query {
    your_table_name {
        items {
            # Add your field names here
            # You can discover field names using the schema introspection query above
        }
    }
}`,

    // Legacy public holidays example (for reference)
    publicHolidays: `query {
    publicholidays (filter: {countryRegionCode: {eq:"US"}, date: {gte: "2024-01-01T00:00:00.000Z", lte: "2024-12-31T00:00:00.000Z"}}) {
        items {
            countryOrRegion
            holidayName
            date
        }
    }
}`
};
