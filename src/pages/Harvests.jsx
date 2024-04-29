import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useParams } from 'react-router-dom';
import HarvestManagement from '../components/AddHarvestModal';
import HarvestsList from '../components/HarvestsList';


const Harvests = () => {
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
      <div className='row text-center m-2'>
        <h1>Cosechas</h1>
      </div>
      <div className='row'>
        <HarvestManagement/>
      </div>
      <HarvestsList plotId={idPlot}/>


    </div>
  );
};

export default Harvests;