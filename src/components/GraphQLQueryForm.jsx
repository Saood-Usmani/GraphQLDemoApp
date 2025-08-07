import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useMsal } from '@azure/msal-react';
import { loginRequest, defaultGraphQLQuery } from '../config/authConfig';

/**
 * Component for inputting GraphQL endpoint and query, then executing with auth
 */
export const GraphQLQueryForm = () => {
    const { instance, accounts } = useMsal();
    const [endpoint, setEndpoint] = useState('');
    const [query, setQuery] = useState(defaultGraphQLQuery);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const executeQueryWithAuth = async () => {
        if (!endpoint.trim()) {
            setError('Please enter a GraphQL endpoint URL');
            return;
        }

        if (!query.trim()) {
            setError('Please enter a GraphQL query');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            let accessToken;
            accounts.length = 0; // Reset accounts to simulate no user logged in
            // Check if user is already authenticated
            if (accounts.length > 0) {
                // Try to get token silently
                try {
                    const response = await instance.acquireTokenSilent({
                        ...loginRequest,
                        account: accounts[0],
                    });
                    accessToken = response.accessToken;
                } catch {
                    // Silent token acquisition failed, use popup
                    const response = await instance.acquireTokenPopup(loginRequest);
                    accessToken = response.accessToken;
                }
            } else {
                // No accounts, show login popup
                const response = await instance.loginPopup(loginRequest);
                accessToken = response.accessToken;
            }

            // Execute GraphQL query with the token
            const graphqlResponse = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ 
                    query: query 
                })
            });

            const data = await graphqlResponse.json();
            
            if (!graphqlResponse.ok) {
                throw new Error(data.message || `HTTP ${graphqlResponse.status}: ${graphqlResponse.statusText}`);
            }

            setResult(data);
        } catch (err) {
            console.error('Error:', err);
            if (err.name === 'BrowserAuthError' || err.name === 'ClientAuthError') {
                setError('Authentication failed. Please try again.');
            } else {
                setError(err.message || 'An error occurred while executing the query');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <Card.Body>
                <Form style={{width: "1000px"}}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label><strong>GraphQL Endpoint URL</strong></Form.Label>
                                <Form.Control
                                    type="url"
                                    placeholder="https://api.fabric.microsoft.com/v1/workspaces/{workspace-id}/graphqlapis/{graphql-api-id}/graphql"
                                    value={endpoint}
                                    onChange={(e) => setEndpoint(e.target.value)}
                                    disabled={loading}
                                />
                                <Form.Text className="text-muted">
                                    Enter the complete Fabric GraphQL API endpoint URL
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label><strong>GraphQL Query</strong></Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={20}
                                    placeholder="Enter your GraphQL query here..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    disabled={loading}
                                    style={{ 
                                        fontFamily: 'monospace',
                                        fontSize: '14px',
                                        lineHeight: '1.4'
                                    }}
                                />
                                <Form.Text className="text-muted">
                                    Enter your GraphQL query. A sample query is pre-filled for reference.
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Button 
                                variant="primary" 
                                size="lg"
                                onClick={executeQueryWithAuth}
                                disabled={loading}
                                className="me-2"
                            >
                                {loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Processing...
                                    </>
                                ) : (
                                    'Query Endpoint'
                                )}
                            </Button>
                        </Col>
                    </Row>
                </Form>

                {error && (
                    <Alert variant="danger" className="mt-3">
                        <Alert.Heading>Error</Alert.Heading>
                        <p>{error}</p>
                    </Alert>
                )}

                {result && (
                    <Card className="mt-3">
                        <Card.Header>
                            <h5>Query Results</h5>
                        </Card.Header>
                        <Card.Body>
                            <pre style={{ 
                                backgroundColor: '#f8f9fa', 
                                padding: '15px', 
                                borderRadius: '5px', 
                                overflow: 'auto',
                                maxHeight: '400px',
                                textAlign: 'left',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }}>
                                {JSON.stringify(result, null, 2)}
                            </pre>
                        </Card.Body>
                    </Card>
                )}
            </Card.Body>
        </Card>
    );
};
