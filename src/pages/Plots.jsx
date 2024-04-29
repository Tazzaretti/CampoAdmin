import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import PlotManagement from '../components/AddPlotModal';
import { Button, Modal, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EditPlot from '../components/EditPlot';

const Plots = () => {
  const { plots, getPlots, deletePlot } = useData();
  const [newPlotName, setNewPlotName] = useState('');
  const [error, setError] = useState(null);
  const [selectedPlotId, setSelectedPlotId] = useState(null);
  const [selectedPlotData, setSelectedPlotData] = useState(null);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  
  const handleDelete = async (plotId) => {
    try {
      await deletePlot(plotId);
      getPlots();
    } catch (error) {
      console.error('Error al eliminar plot:', error);
      setError('Error al eliminar plot');
    }
  };

  const handleEdit = (plot) => {
    console.log(plot);
    setSelectedPlotData(plot);
    setShowEditModal(true);
    
  };

  const handleNavHarvest = (plotId) => {
    setSelectedPlotId(plotId);
    navigate(`/plots/harvests/${plotId}`);
  };

  const handleNavApplications = (plotId) => {
    setSelectedPlotId(plotId);
    navigate(`/plots/applications/${plotId}`);
  };

  const handleNavPlantings = (plotId) => {
    setSelectedPlotId(plotId);
    navigate(`/plots/plantings/${plotId}`);
  };

  // Función para mapear los valores de los tipos de suelo a su descripción correspondiente
  const getGroundTypeDescription = (groundType) => {
    switch (groundType) {
      case 1:
        return 'Arcilloso';
      case 2:
        return 'Arcilloso';
      case 3:
        return 'Limoso';
      case 4:
        return 'Aluvial';
      case 5:
        return 'Orgánico';
      case 6:
        return 'Volcánico';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='row text-center m-2'>
        <h1>Lotes</h1>
      </div>
      <div className='row'>
        <PlotManagement />
      </div>
      <div className="row">
        {plots.map((plot) => (
          <div key={plot.idPlot} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <Card className="card m-2 text-center">
              <Card.Header>
                <Card.Title>{plot.plotName}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>Tamaño: {plot.size}ha</Card.Text>
                <Card.Text>Tipo de suelo: {getGroundTypeDescription(plot.groundType)}</Card.Text>
                <Card.Text>Ubicacion geográfica: {plot.latitude},{plot.longitude}</Card.Text>
                <div className='row'>
                  <Button
                    type="button"
                    className="btn m-1 col"
                    variant="outline-light"
                    size='sm'
                    onClick={() => handleNavHarvest(plot.idPlot)}
                  >
                    Cosechas
                  </Button>
                  <Button
                    type="button"
                    className="btn m-1 col"
                    variant="outline-light"
                    size='sm'
                    onClick={() => handleNavPlantings(plot.idPlot)}
                  >
                    Siembras
                  </Button>
                  <Button
                    type="button"
                    className="btn m-1 col"
                    variant="outline-light"
                    size='sm'
                    onClick={() => handleNavApplications(plot.idPlot)}
                  >
                    Aplicaciones
                  </Button>
                </div>

                <div className='row'>
                  <Button
                    type="button"
                    className="col btn m-1"
                    variant="outline-warning"
                    size='sm'
                    onClick={() => handleEdit(plot)}
                  >
                    Editar
                  </Button>
                  <Button
                    type="button"
                    className="col btn m-1"
                    variant='outline-danger'
                    size='sm'
                    onClick={() => handleDelete(plot.idPlot)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
            {/* Modal de edición dentro de cada tarjeta */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Editar Plot</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditPlot plot={selectedPlotData} onSubmit={() => setShowEditModal(false)} />
              </Modal.Body>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plots;
