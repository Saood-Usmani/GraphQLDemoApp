import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../config/authConfig';

/**
 * Renders the navbar component with a sign-in/sign-out button
 */
export const NavigationBar = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch(e => {
            console.error(e);
        });
    }

    const handleLogout = () => {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        });
    }

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
            <Navbar.Brand href="#home" className="ms-3">
                <strong>Fabric GraphQL Query Tool</strong>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav className="me-3">
                    <AuthenticatedTemplate>
                        <Button variant="outline-light" onClick={handleLogout}>
                            Sign Out
                        </Button>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        <Button variant="outline-light" onClick={handleLogin}>
                            Sign In
                        </Button>
                    </UnauthenticatedTemplate>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
