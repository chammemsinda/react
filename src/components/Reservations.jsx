import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { getReservations } from '../services/api';
import ReservationCard from './ReservationCard';

const Reservations = () => {
  // État pour stocker les réservations
  const [reservations, setReservations] = useState([]);
  // État pour gérer le chargement
  const [loading, setLoading] = useState(true);
  // État pour gérer les erreurs
  const [error, setError] = useState(null);

  // Charger les réservations au chargement du composant
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await getReservations();
        setReservations(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des réservations");
        setLoading(false);
        console.error(err);
      }
    };

    fetchReservations();
  }, []);

  // Fonction pour supprimer une réservation de la liste (après suppression)
  const handleDeleteReservation = (id) => {
    setReservations(reservations.filter(reservation => reservation.id !== id));
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Liste des Réservations</h1>
      
      {loading && <p>Chargement des réservations...</p>}
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {!loading && !error && reservations.length === 0 && (
        <Alert variant="info">Aucune réservation trouvée.</Alert>
      )}
      
      <Row>
        {reservations.map(reservation => (
          <Col key={reservation.id} md={4} className="mb-4">
            <ReservationCard 
              reservation={reservation} 
              onDelete={handleDeleteReservation} 
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Reservations;
