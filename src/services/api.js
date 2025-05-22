import axios from "axios";

// URLs de l'API
const url = "http://localhost:3001/properties";
const reservationUrl = "http://localhost:3001/reservations";

// Fonction pour récupérer toutes les propriétés ou une propriété spécifique
export const getallProperties = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};

// Fonction pour ajouter une propriété
export const addEvent = async (event) => {
  return await axios.post(url, event);
};

// Fonction pour modifier une propriété
export const editEvent = async (id, event) => {
  return await axios.put(`${url}/${id}`, event);
};

// Fonction pour supprimer une propriété
export const deleteEvent = async (id) => {
  return await axios.delete(`${url}/${id}`);
};

// Fonction pour ajouter une réservation
export const addReservation = async (reservation) => {
  return await axios.post(reservationUrl, reservation);
};

// Fonction pour récupérer toutes les réservations
export const getReservations = async () => {
  return await axios.get(reservationUrl);
};

// Fonction pour incrémenter le nombre de vues d'une propriété
export const incrementPropertyViews = async (property) => {
  try {
    // Créer une copie de la propriété avec le nombre de vues incrémenté
    const updatedProperty = {
      ...property,
      nbvue: property.nbvue + 1
    };

    // Mettre à jour la propriété dans la base de données
    const response = await editEvent(property.id, updatedProperty);
    return response;
  } catch (error) {
    alert("Erreur lors de l'incrémentation des vues");
    throw error;
  }
};