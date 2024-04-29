import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import useNotify from "../hooks/useNotify"
import Map from './Map';

const NewPlot = ({ onSubmit }) => {
    const { successMessage, errorMessage } = useNotify();
    const {user} = useAuth();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [plotData, setPlotData] = useState({
        idPlot: 0,  // Puedes dejarlo como 0 si el servidor asigna un ID
        plotName: "",
        longitude: 0,
        latitude: 0, // Reemplaza con el nombre real del lote
        size: 0,  // Reemplaza con el tamaño real del lote
        groundType: 1,  // Reemplaza con el tipo de suelo real
        owner: "",  // Reemplaza con el propietario real
        notes: "",  // Reemplaza con la descripción real
        state: 1,  // Reemplaza con el estado real
        idUser: user.idUser  // Reemplaza con el ID de usuario real
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
        const response = await axios.post('http://campoadmin.somee.com/CreatePlot', plotData);
      
        // Llama a onSubmit solo si la llamada al backend fue exitosa
        onSubmit();
        successMessage("El plot se creo con exito");
      } catch (error) {
        errorMessage("Ocurrio un error al crear el plot");
      }
    };

    const handleMapClick = (lat, lng) => {
      setLatitude(lat); // Update state with the clicked latitude
      setLongitude(lng); // Update state with the clicked longitude
      setPlotData(prevData => ({...prevData, latitude:lat, longitude:lng}));
      console.log(plotData);
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
            placeholder='Ingresar nombre'
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
            placeholder='Ingrese una descripcion'
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
            placeholder='Nombre del propietario'
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
        <div className="col-md-6">
          <label htmlFor="location" className="form-label">
            Ubicación geográfica
          </label>
          <label htmlFor="locationwarning" className="form-label">
            Una vez creado el lote no podra modificarse
          </label>
          <Map onMapClick={handleMapClick} />
          <p>Latitud: {latitude}</p>
          <p>Longitud: {longitude}</p>
        </div>
        <div className="col-12">
          <Button variant="dark" type="submit">
            Agregar lote
          </Button>
        </div>
      </form>
    );
};

export default NewPlot;
