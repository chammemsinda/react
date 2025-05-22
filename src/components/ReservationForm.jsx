import React, { useState, useEffect } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { reservationSchema } from "../types/reservationFormSchema";

// Composant de formulaire de réservation
const ReservationForm = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  // Simuler un store comme dans votre exemple
  const addReservation = (data) => {
    console.log("Réservation ajoutée:", data);
    return { status: 201, data };
  };

  // Utiliser useForm avec zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(reservationSchema)
  });

  // Observer les changements sur le champ image pour la prévisualisation
  const imageFile = watch("image");

  // Mettre à jour la prévisualisation quand l'image change
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  // Fonction qui s'exécute quand le formulaire est soumis
  const submit = async (data) => {
    console.log(data);
    const { nom, prenom, email, telephone, dateDebut, dateFin, nombrePersonnes, image } = data;

    // Créer un objet avec les données de réservation (similaire à votre exemple)
    const result = await addReservation({
      nom,
      prenom,
      email,
      telephone,
      dateDebut,
      dateFin,
      nombrePersonnes,
      image: image[0].name
    });

    // Si la réservation est réussie, rediriger
    if (result.status === 201) {
      navigate('/reservations');
    }
  };

  return (
    <Container className="mt-5">
      <h1>Formulaire de Réservation</h1>

      <Form onSubmit={handleSubmit(submit)}>
        {/* Nom */}
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre nom"
            {...register('nom')}
          />
          {errors.nom && <p style={{color:"red"}}>{errors.nom.message}</p>}
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre email"
            {...register('email')}
          />
          {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}
        </Form.Group>

        {/* Téléphone */}
        <Form.Group className="mb-3">
          <Form.Label>Téléphone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Entrez votre numéro"
            {...register('telephone')}
          />
          {errors.telephone && <p style={{color:"red"}}>{errors.telephone.message}</p>}
        </Form.Group>

        {/* Image */}
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            {...register('image')}
          />
          <Form.Text className="text-muted">
            Sélectionnez une image pour votre réservation
          </Form.Text>
          {errors.image && <p style={{color:"red"}}>{errors.image.message}</p>}

          {/* Prévisualisation de l'image */}
          {imagePreview && (
            <div className="mt-3">
              <p>Prévisualisation:</p>
              <Image
                src={imagePreview}
                alt="Prévisualisation"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
                thumbnail
              />
            </div>
          )}
        </Form.Group>

        {/* Date de réservation */}
        <Form.Group className="mb-3">
          <Form.Label>Date de réservation</Form.Label>
          <Form.Control
            type="date"
            {...register('dateReservation')}
          />
          {errors.dateReservation && <p style={{color:"red"}}>{errors.dateReservation.message}</p>}
        </Form.Group>

        {/* Nombre de personnes */}
        <Form.Group className="mb-3">
          <Form.Label>Nombre de personnes</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="10"
            {...register('nombrePersonnes', { valueAsNumber: true })}
          />
          {errors.nombrePersonnes && <p style={{color:"red"}}>{errors.nombrePersonnes.message}</p>}
        </Form.Group>

        {/* Bouton de soumission */}
        <Button variant="primary" type="submit">
          Réserver
        </Button>
      </Form>
    </Container>
  );
};

export default ReservationForm;
