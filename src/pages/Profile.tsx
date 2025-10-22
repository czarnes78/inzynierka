import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Settings, Bell, Shield, CreditCard as Edit, Save, X, Eye, Download, Star, Clock, CheckCircle, AlertTriangle, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockReservations, mockOffers } from '../data/mockData';
import OfferCard from '../components/UI/OfferCard';

const Profile: React.FC = () => {
  const { user, favorites } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'reservations' | 'favorites' | 'settings' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+48 123 456 789',
    address: 'ul. Przykładowa 123, 00-001 Warszawa',
    birthDate: '1990-01-01',
    preferences: {
      newsletter: true,
      smsNotifications: false,
      emailNotifications: true,
      specialOffers: true
    }
  });

  const userReservations = mockReservations.filter(r => r.userId === user?.id);
  const favoriteOffers = mockOffers.filter(offer => favorites.includes(offer.id));

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    setIsEditing(false);
    alert('Profil został zaktualizowany!');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset to original data
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+48 123 456 789',
      address: 'ul. Przykładowa 123, 00-001 Warszawa',
      birthDate: '1990-01-01',
      preferences: {
        newsletter: true,
        smsNotifications: false,
        emailNotifications: true,
        specialOffers: true
      }
    });
  };

  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('Nowe hasła nie są identyczne');
      return;
    }
    if (passwordData.new.length < 6) {
      alert('Hasło musi mieć co najmniej 6 znaków');
      return;
    }
    // Mock password change
    alert('Hasło zostało zmienione!');
    setShowChangePasswordModal(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Informacje osobiste</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Edit className="h-4 w-4" />
              <span>Edytuj</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveProfile}
                className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                <span>Zapisz</span>
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
                <span>Anuluj</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imię i nazwisko
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center space-x-2 py-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">{profileData.name}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center space-x-2 py-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">{profileData.email}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center space-x-2 py-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">{profileData.phone}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data urodzenia
            </label>
            {isEditing ? (
              <input
                type="date"
                value={profileData.birthDate}
                onChange={(e) => setProfileData(prev => ({ ...prev, birthDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center space-x-2 py-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">
                  {new Date(profileData.birthDate).toLocaleDateString('pl-PL')}
                </span>
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adres
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.address}
                onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center space-x-2 py-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-900">{profileData.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ostatnia aktywność</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Nowa rezerwacja: Greckie Wakacje na Krecie</span>
            </div>
            <span className="text-xs text-gray-500">2 dni temu</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-4 w-4 text-green-600" />
              <span className="text-sm">Płatność potwierdzona</span>
            </div>
            <span className="text-xs text-gray-500">3 dni temu</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <User className="h-4 w-4 text-purple-600" />
              <span className="text-sm">Aktualizacja profilu</span>
            </div>
            <span className="text-xs text-gray-500">1 tydzień temu</span>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Łączne rezerwacje</p>
              <p className="text-2xl font-bold text-blue-600">{userReservations.length}</p>
              <p className="text-xs text-gray-500">+2 w tym miesiącu</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wydane środki</p>
              <p className="text-2xl font-bold text-green-600">
                {userReservations
                  .filter(r => r.status === 'confirmed')
                  .reduce((sum, r) => sum + r.totalPrice, 0)
                  .toLocaleString('pl-PL')} zł
              </p>
              <p className="text-xs text-gray-500">Średnio {Math.round(userReservations.filter(r => r.status === 'confirmed').reduce((sum, r) => sum + r.totalPrice, 0) / Math.max(userReservations.filter(r => r.status === 'confirmed').length, 1)).toLocaleString('pl-PL')} zł/rezerwacja</p>
            </div>
            <CreditCard className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Status konta</p>
              <p className="text-2xl font-bold text-purple-600">Premium</p>
              <p className="text-xs text-gray-500">Aktywne od 2024</p>
            </div>
            <Star className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Loyalty Program */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Program lojalnościowy</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Punkty lojalnościowe</span>
          <span className="text-2xl font-bold text-purple-600">2,450</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Silver (2,000 pkt)</span>
          <span>Do Gold: 550 pkt</span>
        </div>
        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-800">
            <strong>Twoje korzyści:</strong> 5% zniżki na wszystkie rezerwacje, priorytetowa obsługa
          </p>
        </div>
      </div>
    </div>
  );

  const renderReservations = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Moje rezerwacje</h2>

      {userReservations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nie masz jeszcze żadnych rezerwacji
          </h3>
          <p className="text-gray-600 mb-6">
            Przeglądaj nasze oferty i zarezerwuj swoją wymarzoną podróż
          </p>
          <a
            href="/offers"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Przeglądaj oferty
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {userReservations.map(reservation => {
            const offer = mockOffers.find(o => o.id === reservation.offerId);
            return (
              <div key={reservation.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                    <img
                      src={offer?.images[0]}
                      alt={offer?.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{offer?.title}</h3>
                      <p className="text-gray-600">{offer?.destination}, {offer?.country}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>ID: {reservation.id}</span>
                        <span>{reservation.guests} osób</span>
                        <span>{reservation.departureDate.toLocaleDateString('pl-PL')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:items-end space-y-2">
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        {reservation.totalPrice.toLocaleString('pl-PL')} zł
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {reservation.status === 'confirmed' && (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-green-600 font-medium">Potwierdzona</span>
                        </>
                      )}
                      {reservation.status === 'blocked' && (
                        <>
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span className="text-orange-600 font-medium">Zablokowana</span>
                        </>
                      )}
                      {reservation.status === 'cancelled' && (
                        <>
                          <X className="h-4 w-4 text-red-600" />
                          <span className="text-red-600 font-medium">Anulowana</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>Szczegóły</span>
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>Pobierz</span>
                      </button>
                    </div>
                  </div>
                </div>

                {reservation.status === 'blocked' && reservation.blockedUntil && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span className="text-orange-800 text-sm">
                        Rezerwacja zablokowana do: {reservation.blockedUntil.toLocaleString('pl-PL')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderFavorites = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Ulubione oferty</h2>

      {favoriteOffers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nie masz jeszcze ulubionych ofert
          </h3>
          <p className="text-gray-600 mb-6">
            Przeglądaj nasze oferty i dodawaj je do ulubionych klikając ikonę serca
          </p>
          <a
            href="/offers"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Przeglądaj oferty
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Masz {favoriteOffers.length} {favoriteOffers.length === 1 ? 'ulubioną ofertę' : favoriteOffers.length < 5 ? 'ulubione oferty' : 'ulubionych ofert'}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>Kliknij serce, aby usunąć z ulubionych</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteOffers.map(offer => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Ustawienia konta</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferencje powiadomień</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Newsletter</p>
              <p className="text-sm text-gray-600">Otrzymuj informacje o nowych ofertach</p>
            </div>
            <input
              type="checkbox"
              checked={profileData.preferences.newsletter}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                preferences: { ...prev.preferences, newsletter: e.target.checked }
              }))}
              className="rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Powiadomienia SMS</p>
              <p className="text-sm text-gray-600">Otrzymuj SMS o statusie rezerwacji</p>
            </div>
            <input
              type="checkbox"
              checked={profileData.preferences.smsNotifications}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                preferences: { ...prev.preferences, smsNotifications: e.target.checked }
              }))}
              className="rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Powiadomienia email</p>
              <p className="text-sm text-gray-600">Otrzymuj emaile o ważnych aktualizacjach</p>
            </div>
            <input
              type="checkbox"
              checked={profileData.preferences.emailNotifications}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                preferences: { ...prev.preferences, emailNotifications: e.target.checked }
              }))}
              className="rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Oferty specjalne</p>
              <p className="text-sm text-gray-600">Otrzymuj informacje o promocjach i zniżkach</p>
            </div>
            <input
              type="checkbox"
              checked={profileData.preferences.specialOffers}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                preferences: { ...prev.preferences, specialOffers: e.target.checked }
              }))}
              className="rounded"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferencje podróży</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferowany typ wycieczki
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Relaks</option>
              <option>Przygoda</option>
              <option>Kultura</option>
              <option>Rodzina</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferowane wyżywienie
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Inclusive</option>
              <option>Śniadania + obiad/kolacja</option>
              <option>Śniadania</option>
              <option>Bez wyżywienia</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budżet na osobę (zł)
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Do 1000</option>
              <option>1000 - 2000</option>
              <option>2000 - 3000</option>
              <option>Powyżej 3000</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferowany sezon
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Lato</option>
              <option>Zima</option>
              <option>Wiosna</option>
              <option>Jesień</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Bezpieczeństwo</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Zmiana hasła</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Obecne hasło
            </label>
            <input
              type="password"
              value={passwordData.current}
              onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nowe hasło
            </label>
            <input
              type="password"
              value={passwordData.new}
              onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Potwierdź nowe hasło
            </label>
            <input
              type="password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={handleChangePassword}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Zmień hasło
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktywność konta</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Ostatnie logowanie</p>
              <p className="text-sm text-gray-600">Dzisiaj o 14:30 z Chrome na Windows</p>
            </div>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Zmiana hasła</p>
              <p className="text-sm text-gray-600">15 dni temu</p>
            </div>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Aktualizacja profilu</p>
              <p className="text-sm text-gray-600">30 dni temu</p>
            </div>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dwuskładnikowe uwierzytelnianie</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Status: Wyłączone</p>
            <p className="text-sm text-gray-600">Zwiększ bezpieczeństwo swojego konta</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
            Włącz 2FA
          </button>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Eksport danych</h3>
        <p className="text-gray-600 mb-4">
          Pobierz kopię swoich danych osobowych i historii rezerwacji
        </p>
        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Pobierz dane osobowe (PDF)
          </button>
          <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
            Pobierz historię rezerwacji (CSV)
          </button>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'reservations', name: 'Rezerwacje', icon: Calendar },
    { id: 'favorites', name: 'Ulubione', icon: Heart },
    { id: 'settings', name: 'Ustawienia', icon: Settings },
    { id: 'security', name: 'Bezpieczeństwo', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mój profil</h1>
          <p className="text-gray-600 mt-2">Zarządzaj swoim kontem i preferencjami</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center space-x-3 mb-6 p-3 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'reservations' && renderReservations()}
            {activeTab === 'favorites' && renderFavorites()}
            {activeTab === 'settings' && renderSettings()}
            {activeTab === 'security' && renderSecurity()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;