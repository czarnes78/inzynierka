import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import FloatingAIAssistant from './components/UI/FloatingAIAssistant';
import Home from './pages/Home';
import Offers from './pages/Offers';
import SeasonalOffers from './pages/SeasonalOffers';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Reservations from './pages/Reservations';
import Admin from './pages/Admin';
import AIAssistant from './pages/AIAssistant';
import OfferDetail from './pages/OfferDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/last-minute" element={<Offers />} />
              <Route path="/seasonal" element={<SeasonalOffers />} />
              <Route path="/offer/:id" element={<OfferDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
            </Routes>
          </main>
          <Footer />
          <FloatingAIAssistant />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;