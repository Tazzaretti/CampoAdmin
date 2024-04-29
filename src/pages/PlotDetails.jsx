import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'; // Ajusta las importaciones según tus necesidades
import { useParams } from 'react-router-dom';
import PlantingManagement from '../components/AddPlantingModal';
import HarvestManagement from '../components/AddHarvestModal';
import NewPlot from '../components/NewPlot';
import PlantingsList from '../components/PlantingsList';  // Asegúrate de importar correctamente
import HarvestsList from '../components/HarvestsList';


const PlotDetails = () => {
  const { getPlantingsForPlot, getPlotById } = useData();
  const [plotDetails, setPlotDetails] = useState({});
  const [error, setError] = useState(null);
  const { idPlot } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener siembras para el lote utilizando el idPlot de la URL
        const plotData = await getPlotById(idPlot);
        setPlotDetails(plotData);
      } catch (error) {
        console.error('Error al obtener detalles del lote:', error);
        setError('Error al obtener detalles del lote');
      }
    };

    fetchData();
  }, [idPlot, getPlotById]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <h1>Eventos</h1>
      <PlantingManagement />
      <HarvestManagement/>
      <h1>Siembras</h1>
      <PlantingsList plotId={idPlot} />
      <h1>Cosechas</h1>
      <HarvestsList plotId={idPlot}/>

    </div>
  );
};

export default PlotDetails;