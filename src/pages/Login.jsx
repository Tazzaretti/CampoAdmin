import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { login, isLogin } = useAuth();  // Obtenemos la función de inicio de sesión del contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Llamamos a la función de inicio de sesión con el email y la contraseña
    await login(email, password);
  };
  
  const handleNavRegister = () =>{
    navigate('/register')
  }

  useEffect(() => {
    if (isLogin) {
      navigate('/plots')
    }
  },[isLogin])

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Card style={{ width: '20rem' }}>
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            
            <div>
              <Button className="btn m-1 col-5" size='md' variant="outline-success" type="submit">
                Ingresar
              </Button>
              <Button className="btn m-1 col-5" size='md' variant="outline-warning" type="button" onClick={handleNavRegister}>
                Registrarse
              </Button>
            </div>
            
            
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
