import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import AppRouter from './AppRouter.jsx';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <NavBar showLoginButton={true} showSignupButton={true} showPlotsButton={true} />
      <AppRouter/>
      <ToastContainer/>

    </div>
  );
}

export default App;
