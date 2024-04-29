import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'; // Ajusta las importaciones según tus necesidades
import { useParams } from 'react-router-dom';
import ApplicationManagement from '../components/AddApplicationModal';
import ApplicationList from '../components/ApplicationList'

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
      
      <div className='row text-center'>
        <h1>Aplicaciones</h1>
      </div>

      <div className='row'>
        <ApplicationManagement/>
      </div>

      <div className='row'>
        <div className='col'>
          <ApplicationList plotId={idPlot}/>
        </div>
      </div>

    </div>
  );
};

export default PlotDetails;