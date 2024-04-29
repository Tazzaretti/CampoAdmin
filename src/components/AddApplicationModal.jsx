import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import NewApplication from './NewApplication';

const AddApplicationModal = ({ show, handleClose, handleAddApplication }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar nueva aplicacion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Pasa la función handleAddApplication directamente al componente NewPlot */}
        <NewApplication onSubmit={handleAddApplication} />
      </Modal.Body>
    </Modal>
  );
};

const ApplicationManagement = () => {
  const [showAddApplicationModal, setShowAddApplicationModal] = useState(false);

  const handleAddApplication = () => {
    // Lógica local después de agregar el plot (si es necesario)
    console.log('Application agregado exitosamente');
    // Cierra el modal después de agregar el Application
    setShowAddApplicationModal(false);
  };

  return (
    <div>
      <Button variant="outline-success" className='m-2' onClick={() => setShowAddApplicationModal(true)}>
        Agregar Aplicacion
      </Button>

      <AddApplicationModal
        show={showAddApplicationModal}
        handleClose={() => setShowAddApplicationModal(false)}
        handleAddApplication={handleAddApplication}
      />
    </div>
  );
};

export default ApplicationManagement;