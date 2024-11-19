import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Landing from './pages/landing/Landing';
import HomeContainer from './pages/home_container/HomeContainer';
import Bus from './pages/bus/Bus';
import SeatSelection from './components/SeatSelection';
import CheckoutReceipt from './components/CheckoutReceipt';
import PopularRoutes from './pages/routes/PopularRoutes';
import Services from './pages/services/Services';
import TripTracker from './components/tracking/TripTracker';
import ManageBooking from './components/booking/ManageBooking';
import Checkout from './components/Checkout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

const AppContent = () => {
  const { user } = useAuth();

  return (
    <div className='w-full min-h-screen bg-neutral-950 text-neutral-300 flex flex-col overflow-hidden'>
      {user && <Navbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/home" /> : <Landing />} />
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup />} />

        {/* Protected Routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <HomeContainer />
          </ProtectedRoute>
        } />
        <Route path="/services" element={
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        } />
        <Route path="/bus" element={
          <ProtectedRoute>
            <Bus />
          </ProtectedRoute>
        } />
        <Route path="/routes" element={
          <ProtectedRoute>
            <PopularRoutes />
          </ProtectedRoute>
        } />
        <Route path="/track" element={
          <ProtectedRoute>
            <TripTracker />
          </ProtectedRoute>
        } />
        <Route path="/select-seat/:id" element={
          <ProtectedRoute>
            <SeatSelection />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/manage-booking" element={
          <ProtectedRoute>
            <ManageBooking />
          </ProtectedRoute>
        } />
      </Routes>

      {user && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
