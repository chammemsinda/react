import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container>
        <Navbar.Brand as={NavLink} to={'/'}>Gestion Propriétés</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={'/'}>Accueil</Nav.Link>
            <Nav.Link as={NavLink} to={'/properties'}>Propriétés</Nav.Link>
            <Nav.Link as={NavLink} to={'/reservation'}>Nouvelle Réservation</Nav.Link>
            <Nav.Link as={NavLink} to={'/reservations'}>Liste des Réservations</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
