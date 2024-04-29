import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import useNotify from "../hooks/useNotify"

const EditPlot = ({ onSubmit, plot }) => {
    const { successMessage, errorMessage } = useNotify();
    const {user} = useAuth();
    const [plotData, setPlotData] = useState({
        idPlot: plot.idPlot,
        plotName: plot.plotName,
        size: plot.size,
        groundType: plot.groundType,
        owner: plot.owner,
        notes: plot.notes,
        state: plot.state,
        idUser: plot.idUser

    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setPlotData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        // Realiza la llamada al backend para agregar el plot utilizando Axios
        const response = await axios.post('http://campoadmin.somee.com/ModifyPlot', plotData);
      
        // Llama a onSubmit solo si la llamada al backend fue exitosa
        onSubmit();
        successMessage("El plot se edito con exito");
      } catch (error) {
        errorMessage("Ocurrio un error al editar el plot");
      }
    };

    return (
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="plotName" className="form-label">
            Nombre del lote
          </label>
          <input
            type="text"
            className="form-control"
            id="plotName"
            name="plotName"
            placeholder= {plotData.plotName}
            value={plotData.plotName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="notes" className="form-label">
            Descripcion
          </label>
          <input
            type="text"
            className="form-control"
            id="notes"
            name="notes"
            placeholder={plotData.notes}
            value={plotData.notes}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="owner" className="form-label">
            Propietario
          </label>
          <input
            type="text"
            className="form-control"
            id="owner"
            name="owner"
            placeholder={plotData.owner}
            value={plotData.owner}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="size" className="form-label">
            Tamanio
          </label>
          <input
            type="text"
            className="form-control"
            id="size"
            name="size"
            value={plotData.size}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="groundType" className="form-label">
            Tipo de suelo
          </label>
          <select
            id="groundType"
            className="form-select"
            name="groundType"
            value={plotData.groundType}
            onChange={handleChange}
          >
            <option value="1">Arcilloso</option>
            <option value="2">Arcilloso</option>
            <option value="3">Limoso</option>
            <option value="4">Aluvial</option>
            <option value="5">Organico</option>
            <option value="6">Volcanico</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="state" className="form-label">
            Estado del lote
          </label>
          {/* Reemplaza "options" con las opciones reales para tu caso */}
          <select
            id="state"
            className="form-select"
            name="state"
            value={plotData.state}
            onChange={handleChange}
          >
            <option value="1">Cultivado</option>
            <option value="2">Barbecho</option>
            <option value="3">Preparación</option>
            <option value="4">Crecimiento</option>
            <option value="5">Floración</option>
            <option value="6">Fructificación</option>
            <option value="7">En cosecha</option>
            <option value="8">Sin cultivo</option>
            <option value="9">Cambio de cultivo</option>
            <option value="10">Descanso rotativo</option>
          </select>
        </div>
        <div className="col-12">
          <Button variant="dark" type="submit">
                Editar lote
          </Button>
        </div>
      </form>
    );
};

export default EditPlot;
