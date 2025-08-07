import React from 'react';
import { Container } from 'react-bootstrap';
import { NavigationBar } from './NavigationBar';

/**
 * Renders the page layout with navigation
 */
export const PageLayout = ({ children }) => {
    return (
        <>
            <NavigationBar />
            <Container>
                {children}
            </Container>
        </>
    );
};
