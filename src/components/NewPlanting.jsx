import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useData } from '../context/DataContext';
import useNotify from "../hooks/useNotify";
import { useParams } from 'react-router-dom';

const NewPlanting = ({ onSubmit }) => {
  const { successMessage, errorMessage } = useNotify();
  const { plots } = useData();
  const { idPlot } = useParams();
  const [plantingData, setPlantingData] = useState({
    idPlanting: 0,
    crop: 0,
    season: "",
    deep: 0,
    distance: "",
    size: 0,
    startDate: "",
    endDate: "",
    cost: 0,
    idPlot: idPlot // Usar el primer lote por defecto, cambiar si es necesario
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza la llamada al backend para agregar el planting utilizando Axios
      const response = await axios.post('https://campoadmin.somee.com/CreatePlanting', plantingData);

      // Llama a onSubmit solo si la llamada al backend fue exitosa
      onSubmit();
      successMessage("El planting se creó con éxito");
    } catch (error) {
      errorMessage("Ocurrió un error al crear el planting");
    }
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="crop" className="form-label">
          Cultivo
        </label>
        <input
          type="text"
          className="form-control"
          id="crop"
          name="crop"
          placeholder='Nombre del cultivo'
          value={plantingData.crop}
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
          value={plantingData.season}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="deep" className="form-label">
          Profundidad
        </label>
        <input
          type="number"
          className="form-control"
          id="deep"
          name="deep"
          value={plantingData.deep}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="distance" className="form-label">
          Distancia
        </label>
        <input
          type="text"
          className="form-control"
          id="distance"
          name="distance"
          placeholder='Ingresar distancia'
          value={plantingData.distance}
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
          value={plantingData.size}
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
          value={plantingData.startDate}
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
          value={plantingData.endDate}
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
          value={plantingData.cost}
          onChange={handleChange}
        />
      </div>
      <div className="col-12">
        <Button variant="dark" type="submit">
          Agregar Siembra
        </Button>
      </div>
    </form>
  );
};

export default NewPlanting;