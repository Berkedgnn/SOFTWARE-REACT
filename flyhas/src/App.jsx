import { useState } from 'react';
import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import backgroundImage from './assets/Background.png';

import { Routes, Route } from "react-router-dom";

import Flightlistpage from './pages/Flightlistpage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import CheckoutPage from './pages/CheckoutPage';
import RegisterPage from './pages/RegisterPage';
import PersonalInformationPage from './pages/PersonalInformationPage';
import AdminPage from './pages/AdminPage';
import AdminInfo from "./components/AdminInfo.jsx";
import AdminSupport from "./components/AdminSupport.jsx";
import AdminAddFlight from './components/AdminAddFlight.jsx';
import AdminAddDestination from './components/AdminAddDestination.jsx';
import AdminShowCustomer from './components/AdminShowCustomer.jsx';
import AdminShowEmployee from './components/AdminShowEmployee.jsx';
import UserPage from './pages/UserPage.jsx';
import UserReservations from './components/UserReservations.jsx';
import UserInfo from './components/UserInfo.jsx';
import UserSupport from './components/UserSupport.jsx';
import ServicesPage from './pages/ServicesPage';
import CityGuidePage from './pages/CityGuidePage';

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Box sx={{
          justifyContent: "space-evenly",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          alignItems: { md: "flex-start" },
          p: 2, gap: 2,
        }}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/FlightList' element={<Flightlistpage />} />
            <Route path='/Seats' element={<SeatSelectionPage />} />
            <Route path='/Checkout' element={<CheckoutPage />} />
            <Route path='/Register' element={<RegisterPage />} />
            <Route path='/PersonalInfo' element={<PersonalInformationPage />} />
            <Route path='/Services' element={<ServicesPage />} />
            <Route path='/CityGuide' element={<CityGuidePage />} />

            <Route path='/UserProfile/*' element={<UserPage />}>
              <Route path="MyProfile" element={<UserInfo />} />
              <Route path="Support" element={<UserSupport />} />
              <Route path="Reservations" element={<UserReservations />} />
            </Route>
            <Route path='/AdminProfile/*' element={<AdminPage />}>
              <Route path="MyProfile" element={<AdminInfo />} />
              <Route path="Support" element={<AdminSupport />} />
              <Route path="AddFlight" element={<AdminAddFlight />} />
              <Route path="AddDestination" element={<AdminAddDestination />} />
              <Route path="Customers" element={<AdminShowCustomer />} />
              <Route path="Employees" element={<AdminShowEmployee />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Box>
      </div>
    </>
  );
}

export default App;
