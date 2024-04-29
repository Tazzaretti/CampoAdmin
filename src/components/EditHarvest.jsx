import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import useNotify from "../hooks/useNotify"

const EditHarvest = ({ onSubmit, harvest }) => {
    const { successMessage, errorMessage } = useNotify();
    const {user} = useAuth();
    const [harvestData, setHarvestData] = useState({
        idHarvest: harvest.idHarvest,
        idPlanting: harvest.idPlanting,
        season: harvest.season,
        method: harvest.method,
        ripeness: harvest.ripeness,
        yield: harvest.yield,
        notes: harvest.notes,
        size: harvest.size,
        startDate: harvest.startDate,
        endDate: harvest.endDate,
        cost: harvest.cost,
        crop: harvest.crop,
        idPlot: harvest.idPlot,
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
        // Realiza la llamada al backend para agregar el plot utilizando Axios
        const response = await axios.post('https://campoadmin.somee.com/ModifyHarvest', harvestData);
      
        // Llama a onSubmit solo si la llamada al backend fue exitosa
        onSubmit();
        successMessage("El harvest se edito con exito");
      } catch (error) {
        errorMessage("Ocurrio un error al editar el harvest");
      }
    };

    return (
        <form className="row g-3" onSubmit={handleSubmit}>

            <div className="col-md-6">
                <label htmlFor="season" className="form-label">
                    Temporada
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="season"
                    name="season"
                    placeholder={harvestData.season}
                    value={harvestData.season}
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
                    placeholder={harvestData.method}
                    value={harvestData.method}
                    onChange={handleChange}
                />
            </div>

            <div className="col-md-6">
                <label htmlFor="ripeness" className="form-label">
                    Madurez
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="ripeness"
                    name="ripeness"
                    placeholder={harvestData.ripeness}
                    value={harvestData.ripeness}
                    onChange={handleChange}
                />
            </div>

            <div className="col-md-6">
                <label htmlFor="yield" className="form-label">
                    Rendimiento
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="yield"
                    name="yield"
                    placeholder={harvestData.yield}
                    value={harvestData.yield}
                    onChange={handleChange}
                />
            </div>

            <div className="col-md-6">
                <label htmlFor="notes" className="form-label">
                    Notas
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="notes"
                    name="notes"
                    placeholder={harvestData.notes}
                    value={harvestData.notes}
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

            <div className="col-md-6">
                <label htmlFor="crop" className="form-label">
                    Cultivo
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="crop"
                    name="crop"
                    placeholder={harvestData.crop}
                    value={harvestData.crop}
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

export default EditHarvest;
