import React from 'react';
import { Plane, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Travel<span className="text-blue-400">PL</span></span>
            </div>
            <p className="text-gray-300 text-sm">
              Twój partner w organizacji niezapomnianych podróży. 
              Odkrywaj świat razem z nami od ponad 15 lat.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Szybkie linki</h3>
            <ul className="space-y-2">
              <li><a href="/offers" className="text-gray-300 hover:text-white transition-colors duration-200">Wszystkie oferty</a></li>
              <li><a href="/last-minute" className="text-gray-300 hover:text-white transition-colors duration-200">Last Minute</a></li>
              <li><a href="/seasonal" className="text-gray-300 hover:text-white transition-colors duration-200">Wycieczki sezonowe</a></li>
              <li><a href="/ai-assistant" className="text-gray-300 hover:text-white transition-colors duration-200">Asystent AI</a></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popularne kierunki</h3>
            <ul className="space-y-2">
              <li><a href="/offers?country=Grecja" className="text-gray-300 hover:text-white transition-colors duration-200">Grecja</a></li>
              <li><a href="/offers?country=Hiszpania" className="text-gray-300 hover:text-white transition-colors duration-200">Hiszpania</a></li>
              <li><a href="/offers?country=Włochy" className="text-gray-300 hover:text-white transition-colors duration-200">Włochy</a></li>
              <li><a href="/offers?country=Chorwacja" className="text-gray-300 hover:text-white transition-colors duration-200">Chorwacja</a></li>
              <li><a href="/offers?country=Egipt" className="text-gray-300 hover:text-white transition-colors duration-200">Egipt</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">ul. Podróżnicza 123<br />00-001 Warszawa</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">+48 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">kontakt@travel.pl</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 TravelPL. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Polityka prywatności
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Regulamin
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;