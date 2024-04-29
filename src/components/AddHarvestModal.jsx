import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import NewHarvest from './NewHarvest';

const AddHarvestModal = ({ show, handleClose, handleAddHarvest }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar nueva cosecha</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Pasa la función handleAddHarvest directamente al componente NewPlot */}
        <NewHarvest onSubmit={handleAddHarvest} />
      </Modal.Body>
    </Modal>
  );
};

const HarvestManagement = () => {
  const [showAddHarvestModal, setShowAddHarvestModal] = useState(false);

  const handleAddHarvest = () => {
    // Lógica local después de agregar el plot (si es necesario)
    console.log('Harvest agregado exitosamente');
    // Cierra el modal después de agregar el harvest
    setShowAddHarvestModal(false);
  };

  return (
    <div>
      <Button variant="outline-light" className='m-2' onClick={() => setShowAddHarvestModal(true)}>
        Agregar Cosecha
      </Button>

      <AddHarvestModal
        show={showAddHarvestModal}
        handleClose={() => setShowAddHarvestModal(false)}
        handleAddHarvest={handleAddHarvest}
      />
    </div>
  );
};

export default HarvestManagement;