import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import ApplicationCard from './ApplicationCard';

const ApplicationList = ({ plotId }) => {
  const { getApplicationsForPlot } = useData();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicationsResponse = await getApplicationsForPlot(plotId);
        setApplications(applicationsResponse);
      } catch (error) {
        console.error('Error al obtener aplicaciones para el lote:', error);
        setError('Error al obtener aplicaciones para el lote');
      }
    };

    fetchData();
  }, [plotId, getApplicationsForPlot]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="row">

        {applications.map((application) => (
          <div key={application.idApplication} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <ApplicationCard application={application} />
          </div>
        ))}

      </div>
    </div>
  );
};

export default ApplicationList;
