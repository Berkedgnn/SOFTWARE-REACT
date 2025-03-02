import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Flightlistpage from './pages/Flightlistpage';
import SeatSelectionPage from './pages/seats';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route: Flight List Page */}
        <Route path="/" element={<Flightlistpage />} />
        
        {/* Seat selection page */}
        <Route path="/seats" element={<SeatSelectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;

