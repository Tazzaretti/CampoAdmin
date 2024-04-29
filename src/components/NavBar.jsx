import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const { isLogin, logout } = useAuth();  // Obtén el estado de inicio de sesión y la función de cierre de sesión del contexto
  const navigate = useNavigate ();

  const handleLogout = () => {
    logout();
    setIsLogin(False);
  };

  return (
    <Navbar sticky='top' expand="lg" className="bg-body-tertiary">
      <Navbar.Brand as={Link} to="/plots" className='m-1'>Campo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className='m-1' />
      <Navbar.Collapse id="basic-navbar-nav" className='justify-content-start m-1'>
        <Nav>
        {!isLogin ? (
          <>
            <Nav.Link as={Link} to="login">Login</Nav.Link>
            <Nav.Link as={Link} to="register">Register</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="plots">Lotes</Nav.Link>
            <Nav.Link as={Link} to="machinery">Maquinarias</Nav.Link>
            <Nav.Link as={Link} to="login" onClick={handleLogout}>Cerrar sesión</Nav.Link>
          </>
        )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
