import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useData } from '../context/DataContext';
import useNotify from "../hooks/useNotify";
import { useParams } from 'react-router-dom';

const NewApplication = ({ onSubmit }) => {
    const { successMessage, errorMessage } = useNotify();
    const { idPlot } = useParams();
    const [applicationData, setApplicationData] = useState({
        idApplication: 0,
        cropType: "",
        startDate: "",
        endDate: "",
        method: "",
        notes: "",
        productType: "",
        dose: 0,
        brand: "",
        cost: 0,

        idPlot: idPlot // Usar el primer lote por defecto, cambiar si es necesario
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplicationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Realiza la llamada al backend para agregar el harvest utilizando Axios
          const response = await axios.post('http://campoadmin.somee.com/CreateApplication', applicationData);
    
          // Llama a onSubmit solo si la llamada al backend fue exitosa
          onSubmit();
          successMessage("El application se creó con éxito");
        } catch (error) {
          errorMessage("Ocurrió un error al crear el application");
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
              id="cropType"
              name="cropType"
              placeholder='Nombre del cultivo'
              value={applicationData.cropType}
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
              placeholder='Ingresar notas'
              value={applicationData.notes}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="product" className="form-label">
              Producto
            </label>
            <input
              type="text"
              className="form-control"
              id="product"
              name="product"
              placeholder='Ingresar producto'
              value={applicationData.product}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="brand" className="form-label">
              Marca
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              placeholder='Ingresar marca del producto'
              value={applicationData.brand}
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
              value={applicationData.method}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="dose" className="form-label">
              Dosis
            </label>
            <input
              type="number"
              className="form-control"
              id="dose"
              name="dose"
              value={applicationData.dose}
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
              value={applicationData.cost}
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
              value={applicationData.startDate}
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
              value={applicationData.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <Button variant="outline-success" type="submit">
              Agregar Aplicacion
            </Button>
          </div>
        </form>
    );
};

export default NewApplication;


