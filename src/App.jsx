import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HomeContainer from './pages/home_container/HomeContainer';
import Bus from './pages/bus/Bus';
import SeatSelection from './components/SeatSelection';
import CheckoutReceipt from './components/CheckoutReceipt';
import PopularRoutes from './pages/routes/PopularRoutes';
import Services from './pages/services/Services';
import TripTracker from './components/tracking/TripTracker';
import ManageBooking from './components/booking/ManageBooking';
import Checkout from './components/Checkout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col overflow-hidden'>
          <Navbar />
          
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/bus" element={<Bus />} />
            <Route path="/routes" element={<PopularRoutes />} />
            <Route path="/services" element={<Services />} />
            <Route path="/track" element={<TripTracker />} />
            <Route path="/select-seat/:id" element={<SeatSelection />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/manage-booking" element={<ManageBooking />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
