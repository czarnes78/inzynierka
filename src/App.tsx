import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import FloatingAIAssistant from './components/UI/FloatingAIAssistant';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Offers from './pages/Offers';
import OfferDetail from './pages/OfferDetail';
import Profile from './pages/Profile';
import Reservations from './pages/Reservations';
import AIAssistant from './pages/AIAssistant';
import Admin from './pages/Admin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/offer/:id" element={<OfferDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/admin" element={<Admin />} />
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
};

export default App;