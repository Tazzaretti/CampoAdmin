import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import useNotify from "../hooks/useNotify"

const EditMachine = ({ onSubmit, machine }) => {
    const { successMessage, errorMessage } = useNotify();
    const {user} = useAuth();
    const [machineData, setMachineData] = useState({
        idMachine: machine.idMachine,
        name: machine.name,
        brand: machine.brand,
        model: machine.model,
        workingHours: machine.workingHours,
        idState: machine.idState
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setMachineData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        // Realiza la llamada al backend para modificar la machinery utilizando Axios
        const response = await axios.put('http://campoadmin.somee.com/api/Machinery/Update', machineData);
      
        // Llama a onSubmit solo si la llamada al backend fue exitosa
        onSubmit();
        console.log(response);
        successMessage("Machine succesfully updated", response);
      } catch (error) {
        console.log(error)
        errorMessage("An error ocurred while trying to update the machine data ", error);
      }
    };

    return (
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Nombre de la maquina
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder= {machineData.name}
            value={machineData.name}
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
            placeholder={machineData.brand}
            value={machineData.brand}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="model" className="form-label">
            Modelo
          </label>
          <input
            type="text"
            className="form-control"
            id="model"
            name="model"
            placeholder={machineData.model}
            value={machineData.model}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="workingHours" className="form-label">
            Horas
          </label>
          <input
            type="number"
            className="form-control"
            id="workingHours"
            name="workingHours"
            placeholder={machineData.workingHours}
            value={machineData.workingHours}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <Button variant="dark" type="submit">
                Editar maquina
          </Button>
        </div>
      </form>
    );
};

export default EditMachine;
