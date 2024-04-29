import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useData } from '../context/DataContext';
import useNotify from "../hooks/useNotify";
import { useParams } from 'react-router-dom';

const NewHarvest = ({ onSubmit }) => {
  const { successMessage, errorMessage } = useNotify();
  const { plots } = useData();
  const { idPlot } = useParams();
  const [harvestData, setHarvestData] = useState({
    idHarvest: 0,
    idPlanting: 0,
    season: "",
    method: "",
    ripeness: "",
    yield: 0,
    notes: "",
    size: 0,
    startDate: "",
    endDate: "",
    cost: 0,
    crop: 0,
    idPlot: idPlot // Usar el primer lote por defecto, cambiar si es necesario
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHarvestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza la llamada al backend para agregar el harvest utilizando Axios
      const response = await axios.post('http://campoadmin.somee.com/CreateHarvest', harvestData);

      // Llama a onSubmit solo si la llamada al backend fue exitosa
      onSubmit();
      successMessage("El harvest se creó con éxito");
    } catch (error) {
      errorMessage("Ocurrió un error al crear el harvest");
    }
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="crop" className="form-label">
          Cultivo
        </label>
        <input
          type="number"
          className="form-control"
          id="crop"
          name="crop"
          placeholder='Nombre del cultivo'
          value={harvestData.crop}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="season" className="form-label">
          Temporada
        </label>
        <input
          type="text"
          className="form-control"
          id="season"
          name="season"
          placeholder='Ingresar temporada'
          value={harvestData.season}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="deep" className="form-label">
          Madurez
        </label>
        <input
          type="text"
          className="form-control"
          id="ripeness"
          name="ripeness"
          value={harvestData.ripeness}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="distance" className="form-label">
          Rendimiento
        </label>
        <input
          type="text"
          className="form-control"
          id="yield"
          name="yield"
          placeholder='Ingresar rendimiento'
          value={harvestData.yield}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="distance" className="form-label">
          Notas
        </label>
        <input
          type="text"
          className="form-control"
          id="notes"
          name="notes"
          placeholder='Ingresar notas'
          value={harvestData.notes}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="method" className="form-label">
          Metodo
        </label>
        <input
          type="text"
          className="form-control"
          id="method"
          name="method"
          placeholder='Ingresar metodo'
          value={harvestData.method}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="size" className="form-label">
          Tamaño
        </label>
        <input
          type="number"
          className="form-control"
          id="size"
          name="size"
          value={harvestData.size}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="startDate" className="form-label">
          Fecha de Inicio
        </label>
        <input
          type="datetime-local"
          className="form-control"
          id="startDate"
          name="startDate"
          value={harvestData.startDate}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="endDate" className="form-label">
          Fecha de Fin
        </label>
        <input
          type="datetime-local"
          className="form-control"
          id="endDate"
          name="endDate"
          value={harvestData.endDate}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="cost" className="form-label">
          Costo
        </label>
        <input
          type="number"
          className="form-control"
          id="cost"
          name="cost"
          value={harvestData.cost}
          onChange={handleChange}
        />
      </div>
      <div className="col-12">
        <Button variant="dark" type="submit">
          Agregar Cosecha
        </Button>
      </div>
    </form>
  );
};

export default NewHarvest;