import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { deleteReservation } from '../services/api';

const ReservationCard = ({ reservation, onDelete }) => {
  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Fonction pour gérer la suppression d'une réservation
  const handleDeleteReservation = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      try {
        await deleteReservation(reservation.id);
        onDelete(reservation.id);
      } catch (error) {
        console.error('Erreur lors de la suppression de la réservation:', error);
        alert('Erreur lors de la suppression de la réservation');
      }
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img 
        variant="top" 
        src="/images/reservation.jpg" 
        alt="Réservation" 
      />
      <Card.Body>
        <NavLink to={`/reservations/${reservation.id}`}>
          <Card.Title>{reservation.nom}</Card.Title>
        </NavLink>
        
        <Card.Text>
          <strong>Téléphone:</strong> {reservation.telephone}
        </Card.Text>
        
        <Card.Text>
          <strong>Date de début:</strong> {formatDate(reservation.dateDebut)}
        </Card.Text>
        
        <Card.Text>
          <strong>Date de fin:</strong> {formatDate(reservation.dateFin)}
        </Card.Text>
        
        {reservation.dureeJours && (
          <Card.Text>
            <strong>Durée:</strong> {reservation.dureeJours} jours
          </Card.Text>
        )}
        
        {reservation.prixTotal && (
          <Card.Text>
            <strong>Prix total:</strong> {reservation.prixTotal} DT
          </Card.Text>
        )}
        
        <div className="d-flex justify-content-between mt-3">
          <Button 
            variant="danger" 
            onClick={handleDeleteReservation}
          >
            Supprimer
          </Button>
          
          <Button 
            variant="info" 
            as={NavLink} 
            to={`/reservations/update/${reservation.id}`}
          >
            Modifier
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReservationCard;
