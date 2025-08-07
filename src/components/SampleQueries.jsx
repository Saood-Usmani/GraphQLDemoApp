import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { sampleQueries } from '../services/graphqlService';

/**
 * Component showing sample queries that users can copy
 */
export const SampleQueries = ({ onQuerySelect }) => {
    const queryExamples = [
        {
            name: "Schema Discovery",
            description: "Discover all available query types and fields in your API",
            query: sampleQueries.schemaIntrospection
        },
        {
            name: "All Types",
            description: "View all types and their fields in the schema",
            query: sampleQueries.allTypes
        },
        {
            name: "Simple Test",
            description: "Basic connectivity test",
            query: sampleQueries.simpleTest
        },
        {
            name: "Table Template",
            description: "Template for querying a table (replace 'your_table_name')",
            query: sampleQueries.tableTemplate
        }
    ];

    return (
        <Card className="mt-3">
            <Card.Header>
                <h6>Sample Queries</h6>
                <small className="text-muted">Click to use these queries for discovering your API schema</small>
            </Card.Header>
            <Card.Body>
                <Row>
                    {queryExamples.map((example, index) => (
                        <Col md={6} key={index} className="mb-2">
                            <div className="d-grid">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => onQuerySelect(example.query)}
                                    title={example.description}
                                >
                                    {example.name}
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );
};
