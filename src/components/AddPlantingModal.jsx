import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import NewPlanting from './NewPlanting';

const AddPlantingModal = ({ show, handleClose, handleAddPlanting }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar nueva siembra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Pasa la función handleAddPlanting directamente al componente NewPlot */}
        <NewPlanting onSubmit={handleAddPlanting} />
      </Modal.Body>
    </Modal>
  );
};

const PlantingManagement = () => {
  const [showAddPlantingModal, setShowAddPlantingModal] = useState(false);

  const handleAddPlanting = () => {
    // Lógica local después de agregar el plot (si es necesario)
    console.log('Planting agregado exitosamente');
    // Cierra el modal después de agregar el plot
    setShowAddPlantingModal(false);
  };

  return (
    <div>
      <Button variant="outline-light" className='m-2' onClick={() => setShowAddPlantingModal(true)}>
        Agregar Siembra
      </Button>

      <AddPlantingModal
        show={showAddPlantingModal}
        handleClose={() => setShowAddPlantingModal(false)}
        handleAddPlanting={handleAddPlanting}
      />
    </div>
  );
};

export default PlantingManagement;