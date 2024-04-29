import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Plots from './pages/Plots.jsx';
import PlotDetails from './pages/PlotDetails.jsx';
import Plantings from './pages/Plantings.jsx'
import Harvests from './pages/Harvests.jsx';
import Applications from './pages/Applications.jsx';
import Machinery from './pages/Machinery.jsx'
import Consumes from './pages/Consumes.jsx';

const AppRouter = () => {
  return (
      <Routes basename="/CampoAdmin">
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/plots" element={<Plots />} />
        <Route path="/machinery" element={<Machinery/>}/>
        <Route path="/machinery/maintenances"/>
        <Route path="/machinery/consumes/:idMachine" element={<Consumes/>}/>
        <Route path="/plots/plantings/:idPlot" element={<Plantings />} />
        <Route path="/plots/harvests/:idPlot" element={<Harvests />} />
        <Route path="/plots/applications/:idPlot" element={<Applications />} />
        <Route path="/plots/:idPlot" element={<PlotDetails />} />
      </Routes>
   
  );
};

export default AppRouter;