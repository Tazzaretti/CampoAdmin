// DataContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user, isLogin } = useAuth();
  const [plots, setPlots] = useState([]);

  const getPlots = async () => {
    try {
      if (isLogin) {
        const response = await axios.get(
          `http://campoadmin.somee.com/UserPlots/${user.idUser}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response.data);
        setPlots([...response.data]);
      }
    } catch (error) {
      console.error('Error al obtener plots en DataContext:', error);
    }
  };

  const deletePlot = async (plotId) => {
    try {
      if (isLogin) {
        await axios.delete(`http://campoadmin.somee.com/DeletePlot/${plotId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        // Después de eliminar el plot, vuelve a obtener la lista actualizada
        getPlots();
      }
    } catch (error) {
      console.error(`Error al eliminar el plot ${plotId} en DataContext:`, error);
    }
  };

  const getPlantingsForPlot = async (plotId) => {
    try {
      const response = await axios.get(`http://campoadmin.somee.com/PlotPlantings/${plotId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener siembras para el lote:', error);
      throw new Error('Error al obtener siembras para el lote');
    }
  };

  const getHarvestsForPlot = async (plotId) => {
    try {
      const response = await axios.get(`http://campoadmin.somee.com/PlotHarvests/${plotId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener siembras para el lote:', error);
      throw new Error('Error al obtener siembras para el lote');
    }
  };

  const getApplicationsForPlot = async (plotId) => {
    try {
      const response = await axios.get(`http://campoadmin.somee.com/PlotApplications/${plotId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener aplicaciones para el lote:', error);
      throw new Error('Error al obtener aplicaciones para el lote');
    }
  };
  
  // Nueva función para obtener un lote por su ID
  const getPlotById = async (plotId) => {
    try {
      const response = await axios.get(`http://campoadmin.somee.com/api/Plot/GetPlotById/${plotId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el plot ${plotId} en DataContext:`, error);
      throw new Error(`Error al obtener el plot ${plotId}`);
    }
  };

  useEffect(() => {
    getPlots();
  }, [isLogin, user]);

  const contextValue = {
    plots,
    getPlots,
    deletePlot,
    getPlantingsForPlot,
    getHarvestsForPlot,
    getApplicationsForPlot,
    getPlotById, // Agrega la función getPlotById al contexto
    // Otras funciones y estados que quieras proporcionar
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe ser utilizado dentro de un DataProvider');
  }
  return context;
};
