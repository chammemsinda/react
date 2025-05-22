import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();
  
  // Message d'erreur par défaut si aucun n'est fourni
  const errorMessage = message || "La page que vous recherchez n'existe pas.";

  return (
    <Container className="text-center py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="error-container p-4 border rounded shadow-sm">
            <h1 className="text-danger mb-4">Oops!</h1>
            <img 
              src="/images/notfound.jpeg" 
              alt="Erreur" 
              className="img-fluid mb-4" 
              style={{ maxHeight: '300px' }}
            />
            <h2 className="mb-3">Une erreur s'est produite</h2>
            <p className="lead mb-4">{errorMessage}</p>
            
            <div className="d-flex justify-content-center gap-3">
              <Button 
                variant="primary" 
                as={Link} 
                to="/"
              >
                Retour à l'accueil
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={() => navigate(-1)}
              >
                Retour
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
