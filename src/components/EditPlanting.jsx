import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import useNotify from "../hooks/useNotify"

const EditPlanting = ({ onSubmit, planting }) => {
    const { successMessage, errorMessage } = useNotify();
    const {user} = useAuth();
    const [plantingData, setPlantingData] = useState({
        idPlanting: planting.idPlanting,
        crop: planting.crop,
        season: planting.season,
        deep: planting.deep,
        distance: planting.distance,
        size: planting.size,
        startDate: planting.startDate,
        endDate: planting.endDate,
        cost: planting.cost,
        idPlot: planting.idPlot,
        

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
        // Realiza la llamada al backend para agregar el plot utilizando Axios
        const response = await axios.post('https://campoadmin.somee.com/ModifyPlanting', plantingData);
      
        // Llama a onSubmit solo si la llamada al backend fue exitosa
        onSubmit();
        successMessage("El planting se edito con exito");
      } catch (error) {
        errorMessage("Ocurrio un error al editar el planting");
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
                    placeholder={plantingData.crop}
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
                    placeholder={plantingData.season}
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
                    placeholder={plantingData.distance}
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
          
            <div className="col-12">
                <Button variant="dark" type="submit">
                    Editar Siembra
                </Button>
            </div>
        </form>
      );
};

export default EditPlanting;
