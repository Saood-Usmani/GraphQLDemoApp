import React from 'react';
import { GraphQLQueryForm } from './components/GraphQLQueryForm';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

/**
 * Main App component - Single page with query form
 */
function App() {
  return (
    <>
      
      
      <Container fluid className="px-4" >
        <GraphQLQueryForm />
      </Container>
    </>
  );
}

export default App
