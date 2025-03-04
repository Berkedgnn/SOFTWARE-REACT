import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Flightlistpage from './pages/Flightlistpage';
import SeatSelectionPage from './pages/seats';
import CheckoutPage from './pages/checkout'; 

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Flightlistpage />} />
        
        
        <Route path="/seats" element={<SeatSelectionPage />} />

        
        <Route path="/checkout" element={<CheckoutPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
