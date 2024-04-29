import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import useNotify from "../hooks/useNotify"

const EditApplication = ({ onSubmit, application }) => {
    const { successMessage, errorMessage } = useNotify();
    const {user} = useAuth();
    const [applicationData, setApplicationData] = useState({
        idApplication: application.idApplication,
        cropType: application.cropType,
        startDate: application.startDate,
        endDate: application.endDate,
        method: application.method,
        notes: application.notes,
        productType: application.productType,
        dose: application.dose,
        brand: application.brand,
        cost: application.cost,

        idPlot: application.idPlot // Usar el primer lote por defecto, cambiar si es necesario
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
        // Realiza la llamada al backend para agregar el plot utilizando Axios
        const response = await axios.post('https://campoadmin.somee.com/ModifyApplication', applicationData);
      
        // Llama a onSubmit solo si la llamada al backend fue exitosa
        onSubmit();
        successMessage("El application se edito con exito");
      } catch (error) {
        errorMessage("Ocurrio un error al editar el application");
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
              placeholder={applicationData.cropType}
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
              placeholder={applicationData.notes}
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
              id="productType"
              name="productType"
              placeholder={applicationData.productType}
              value={applicationData.productType}
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
              placeholder={applicationData.brand}
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
              placeholder={applicationData.method}
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
            <Button variant="dark" type="submit">
              Editar Aplicacion
            </Button>
          </div>
        </form>
    );
};

export default EditApplication;
