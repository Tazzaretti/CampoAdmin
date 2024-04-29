import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import EditApplication from './EditApplication';

const ApplicationCard = ({ application }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedApplicationData, setSelectedApplicationData] = useState(null);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleEdit = (application) => {
    console.log(application);
    setSelectedApplicationData(application);
    setShowEditModal(true);
    
  };

  return (
    <Card className='card m-2 text-center'>
      <Card.Body>
        <Card.Title>{application.startDate.split('T')[0]}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Temporada: {application.season}</Card.Subtitle>
        <div className='row'>
          <Button 
            className='col btn m-1'
            variant="outline-dark" 
            size='sm'
            onClick={handleShow}>
            Ver Detalles
          </Button>
          <Button
            type="button"
            className="col btn m-1"
            variant="outline-warning"
            size='sm'
            onClick={() => handleEdit(application)}
          >
            Editar
          </Button>
          </div>
      </Card.Body>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Cosecha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Fecha de Inicio:</strong> {application.startDate}</p>
          <p><strong>Fecha de Finalizacion:</strong> {application.endDate}</p>
          <p><strong>Metodo:</strong> {application.method}</p>
          <p><strong>Cultivo:</strong> {application.crop}</p>
          <p><strong>Notas:</strong> {application.notes}</p>
          <p><strong>Costo:</strong> {application.cost}</p>
          <p><strong>ID del Lote:</strong> {application.idPlot}</p>
          {/* Agrega más detalles según sea necesario */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal de edición dentro de cada tarjeta */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditApplication application={selectedApplicationData} onSubmit={() => setShowEditModal(false)} />
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default ApplicationCard;
