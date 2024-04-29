import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import axios from 'axios';
import useNotify from '../hooks/useNotify';

const Register = (onSubmit) => {
  const { successMessage, errorMessage } = useNotify(); // Importa las funciones de notificación
  const [userData, setUserData] = useState({
    idUser: 0,
    password: '',
    name: '',
    lastName: '',
    userRole: 1,
    userType: 0,
    email: '',
    phone: 0,
    adress: '',
    experience: '',
    education: '',
    state: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const RegisterFunction = async () => {
    console.log('dentro de data context')
    console.log(userData);
    try {
      const response = await axios.post('http://campoadmin.somee.com/api/Auth/Registro', userData);
      successMessage('El usuario se creo con exito');
    } catch (error) {
      console.log(error)
      errorMessage('Hubo un error al crear el usuario', error)
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    console.log('dentro de handle submit');
    try {
      await RegisterFunction(userData);
      console.log('después de enviar datos');
    } catch (error) {
      console.error('Error al crear usuario', error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center m-3" style={{ height: '100vh' }}>
      <form className="row g-3" onSubmit={handleSubmit}>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder='Ingresar email'
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="notes" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder='Ingrese su clave'
            value={userData.password}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder='Nombre'
            value={userData.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">
            Telefono
          </label>
          <input
            type="number"
            className="form-control"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="adress" className="form-label">
            Direccion
          </label>
          <input
            type="text"
            className="form-control"
            id="adress"
            name="adress"
            value={userData.adress}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="experience" className="form-label">
            Experiencia
          </label>
          <input
            type="text"
            className="form-control"
            id="experience"
            name="experience"
            value={userData.experience}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="education" className="form-label">
            Educacion
          </label>
          <input
            type="text"
            className="form-control"
            id="education"
            name="education"
            value={userData.education}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="userType" className="form-label">
            Ocupacion
          </label>
          <select
            id="userType"
            className="form-select"
            name="userType"
            value={userData.userType}
            onChange={handleChange}
          >
            <option value="1">Agricultor</option>
            <option value="2">Ingeniero</option>
            <option value="3">Investigador</option>
            <option value="4">Transportista</option>
            <option value="5">Empleado</option>
          </select>
        </div>

        <div className="col-12">
          <Button variant="outline-light" type="submit">
                Registrarse
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;