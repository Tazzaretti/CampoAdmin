import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import HarvestCard from './HarvestCard';

const HarvestList = ({ plotId }) => {
  const { getHarvestsForPlot } = useData();
  const [harvests, setHarvests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const harvestsResponse = await getHarvestsForPlot(plotId);
        setHarvests(harvestsResponse);
      } catch (error) {
        console.error('Error al obtener siembras para el lote:', error);
      }
    };

    fetchData();
  }, [plotId, getHarvestsForPlot]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="row">
        {harvests.map((harvest) => (
          <div key={harvest.idHarvest} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <HarvestCard harvest={harvest}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HarvestList;
