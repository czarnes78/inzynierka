import React, { useState } from 'react';
import { Users, Package, BarChart3, Settings, Plus, CreditCard as Edit, Trash2, Eye, Search, Filter, Calendar, MapPin, Star, TrendingUp, DollarSign, Globe, Plane, Mail, Phone, CheckCircle, XCircle, Clock, AlertTriangle, X } from 'lucide-react';
import { mockOffers, mockReservations } from '../data/mockData';
import { Offer, Reservation, User } from '../types';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'offers' | 'reservations' | 'users' | 'analytics' | 'settings'>('dashboard');
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  // Mock users data
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'admin@travel.pl',
      name: 'Administrator',
      role: 'admin',
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      email: 'user@travel.pl',
      name: 'Jan Kowalski',
      role: 'client',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '3',
      email: 'anna.nowak@email.com',
      name: 'Anna Nowak',
      role: 'client',
      createdAt: new Date('2024-02-01')
    },
    {
      id: '4',
      email: 'piotr.wisniewski@email.com',
      name: 'Piotr Wiśniewski',
      role: 'client',
      createdAt: new Date('2024-02-15')
    }
  ];

  const [users, setUsers] = useState<User[]>(mockUsers);

  // Statistics
  const totalRevenue = reservations
    .filter(r => r.status === 'confirmed')
    .reduce((sum, r) => sum + r.totalPrice, 0);
  
  const totalReservations = reservations.length;
  const confirmedReservations = reservations.filter(r => r.status === 'confirmed').length;
  const pendingReservations = reservations.filter(r => r.status === 'blocked').length;

  const handleDeleteOffer = (id: string) => {
    if (confirm('Czy na pewno chcesz usunąć tę ofertę?')) {
      setOffers(offers.filter(offer => offer.id !== id));
    }
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
      setUsers(users.filter(user => user.id !== id));
      alert('Użytkownik został usunięty');
    }
  };

  const handleUpdateReservationStatus = (id: string, status: 'confirmed' | 'cancelled' | 'blocked') => {
    setReservations(reservations.map(r => 
      r.id === id ? { ...r, status } : r
    ));
    alert(`Status rezerwacji został zmieniony na: ${status === 'confirmed' ? 'Potwierdzona' : status === 'cancelled' ? 'Anulowana' : 'Zablokowana'}`);
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleViewOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowOfferModal(true);
  };

  const handleAddOffer = () => {
    // Mock add offer functionality
    const newOffer: Offer = {
      id: Date.now().toString(),
      title: 'Nowa oferta',
      description: 'Opis nowej oferty',
      shortDescription: 'Krótki opis',
      destination: 'Nowy kierunek',
      country: 'Nowy kraj',
      duration: 7,
      price: 2000,
      images: ['https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg'],
      meals: 'BB',
      tripType: 'relax',
      season: 'summer',
      isLastMinute: false,
      availableDates: [new Date()],
      itinerary: [],
      accommodation: 'Hotel 4*',
      transport: 'Samolot',
      rating: 4.0,
      reviewCount: 0,
      createdAt: new Date()
    };
    setOffers([...offers, newOffer]);
    setShowAddOfferModal(false);
    alert('Nowa oferta została dodana!');
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOffers = offers.filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Całkowity przychód</p>
              <p className="text-2xl font-bold text-green-600">
                {totalRevenue.toLocaleString('pl-PL')} zł
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rezerwacje</p>
              <p className="text-2xl font-bold text-blue-600">{totalReservations}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Potwierdzone</p>
              <p className="text-2xl font-bold text-green-600">{confirmedReservations}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Oczekujące</p>
              <p className="text-2xl font-bold text-orange-600">{pendingReservations}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ostatnie rezerwacje</h3>
          <div className="space-y-3">
            {reservations.slice(0, 5).map(reservation => {
              const offer = offers.find(o => o.id === reservation.offerId);
              return (
                <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{offer?.title}</p>
                    <p className="text-sm text-gray-600">
                      {reservation.totalPrice.toLocaleString('pl-PL')} zł
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    reservation.status === 'blocked' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {reservation.status === 'confirmed' ? 'Potwierdzona' :
                     reservation.status === 'blocked' ? 'Zablokowana' : 'Anulowana'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popularne oferty</h3>
          <div className="space-y-3">
            {offers.slice(0, 5).map(offer => (
              <div key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{offer.title}</p>
                  <p className="text-sm text-gray-600">{offer.destination}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">{offer.price.toLocaleString('pl-PL')} zł</p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{offer.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOffers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Zarządzanie ofertami</h2>
        <button
          onClick={() => setShowAddOfferModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Dodaj ofertę</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-2xl font-bold text-blue-600">{offers.length}</div>
          <div className="text-sm text-gray-600">Wszystkie oferty</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-2xl font-bold text-green-600">
            {offers.filter(o => !o.isLastMinute).length}
          </div>
          <div className="text-sm text-gray-600">Regularne</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-2xl font-bold text-red-600">
            {offers.filter(o => o.isLastMinute).length}
          </div>
          <div className="text-sm text-gray-600">Last Minute</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-2xl font-bold text-purple-600">
            {(offers.reduce((sum, o) => sum + o.rating, 0) / offers.length).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Średnia ocena</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj ofert..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Oferta</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Kierunek</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Cena</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Ocena</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map(offer => (
                <tr key={offer.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={offer.images[0]}
                        alt={offer.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{offer.title}</p>
                        <p className="text-sm text-gray-600">{offer.duration} dni</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-gray-900">{offer.destination}</p>
                    <p className="text-sm text-gray-600">{offer.country}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">
                      {offer.price.toLocaleString('pl-PL')} zł
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{offer.rating}</span>
                      <span className="text-gray-600">({offer.reviewCount})</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      offer.isLastMinute ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {offer.isLastMinute ? 'Last Minute' : 'Aktywna'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingOffer(offer)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edytuj ofertę"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleViewOffer(offer)}
                        className="text-green-600 hover:text-green-800"
                        title="Zobacz szczegóły"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Usuń ofertę"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Offer Modal */}
      {showAddOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dodaj nową ofertę</h3>
            <p className="text-gray-600 mb-6">
              Czy chcesz dodać nową ofertę do systemu?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleAddOffer}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Dodaj
              </button>
              <button
                onClick={() => setShowAddOfferModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderReservations = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Zarządzanie rezerwacjami</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj rezerwacji..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Wszystkie statusy</option>
            <option value="confirmed">Potwierdzone</option>
            <option value="blocked">Zablokowane</option>
            <option value="cancelled">Anulowane</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Oferta</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Klient</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Osoby</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Cena</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map(reservation => {
                const offer = offers.find(o => o.id === reservation.offerId);
                const user = users.find(u => u.id === reservation.userId);
                return (
                  <tr key={reservation.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{reservation.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{offer?.title}</p>
                      <p className="text-sm text-gray-600">{offer?.destination}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </td>
                    <td className="py-3 px-4">{reservation.guests}</td>
                    <td className="py-3 px-4 font-medium">
                      {reservation.totalPrice.toLocaleString('pl-PL')} zł
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'blocked' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reservation.status === 'confirmed' ? 'Potwierdzona' :
                         reservation.status === 'blocked' ? 'Zablokowana' : 'Anulowana'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {reservation.status === 'blocked' && (
                          <button
                            onClick={() => handleUpdateReservationStatus(reservation.id, 'confirmed')}
                            className="text-green-600 hover:text-green-800 text-xs px-2 py-1 bg-green-100 rounded"
                          >
                            Potwierdź
                          </button>
                        )}
                        {reservation.status !== 'cancelled' && (
                          <button
                            onClick={() => handleUpdateReservationStatus(reservation.id, 'cancelled')}
                            className="text-red-600 hover:text-red-800 text-xs px-2 py-1 bg-red-100 rounded"
                          >
                            Anuluj
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Zarządzanie użytkownikami</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj użytkowników..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Użytkownik</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Rola</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Data rejestracji</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Rezerwacje</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => {
                const userReservations = reservations.filter(r => r.userId === user.id);
                return (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role === 'admin' ? 'Administrator' : 'Klient'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {user.createdAt.toLocaleDateString('pl-PL')}
                    </td>
                    <td className="py-3 px-4 text-gray-900">{userReservations.length}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleViewUser(user)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Zobacz szczegóły"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Usuń użytkownika"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Szczegóły użytkownika</h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Informacje podstawowe</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Imię:</strong> {selectedUser.name}</div>
                    <div><strong>Email:</strong> {selectedUser.email}</div>
                    <div><strong>Rola:</strong> {selectedUser.role === 'admin' ? 'Administrator' : 'Klient'}</div>
                    <div><strong>Data rejestracji:</strong> {selectedUser.createdAt.toLocaleDateString('pl-PL')}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Statystyki</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Rezerwacje:</strong> {reservations.filter(r => r.userId === selectedUser.id).length}</div>
                    <div><strong>Wydane środki:</strong> {reservations.filter(r => r.userId === selectedUser.id && r.status === 'confirmed').reduce((sum, r) => sum + r.totalPrice, 0).toLocaleString('pl-PL')} zł</div>
                    <div><strong>Status:</strong> <span className="text-green-600">Aktywny</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analityka i raporty</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sprzedaż według miesięcy</h3>
          <div className="space-y-3">
            {['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj'].map((month, index) => (
              <div key={month} className="flex items-center justify-between">
                <span className="text-gray-600">{month}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(index + 1) * 20}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {((index + 1) * 15000).toLocaleString('pl-PL')} zł
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popularne kierunki</h3>
          <div className="space-y-3">
            {[
              { country: 'Grecja', bookings: 45, percentage: 35 },
              { country: 'Hiszpania', bookings: 32, percentage: 25 },
              { country: 'Włochy', bookings: 28, percentage: 22 },
              { country: 'Chorwacja', bookings: 15, percentage: 12 },
              { country: 'Egipt', bookings: 8, percentage: 6 }
            ].map(item => (
              <div key={item.country} className="flex items-center justify-between">
                <span className="text-gray-600">{item.country}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.bookings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kluczowe metryki</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
            <div className="text-gray-600">Współczynnik konwersji</div>
            <div className="text-xs text-gray-500 mt-1">↑ 5% vs poprzedni miesiąc</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
            <div className="text-gray-600">Średnia ocena</div>
            <div className="text-xs text-gray-500 mt-1">↑ 0.2 vs poprzedni miesiąc</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">2.3k</div>
            <div className="text-gray-600">Aktywni użytkownicy</div>
            <div className="text-xs text-gray-500 mt-1">↑ 12% vs poprzedni miesiąc</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ostatnia aktywność</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Nowa rezerwacja #12345</span>
            </div>
            <span className="text-xs text-gray-500">2 min temu</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Płatność potwierdzona #12344</span>
            </div>
            <span className="text-xs text-gray-500">5 min temu</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">Nowy użytkownik zarejestrowany</span>
            </div>
            <span className="text-xs text-gray-500">10 min temu</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">Oferta wygasła: Greckie Wakacje</span>
            </div>
            <span className="text-xs text-gray-500">1 godz temu</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Ustawienia systemu</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ustawienia ogólne</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nazwa firmy
              </label>
              <input
                type="text"
                defaultValue="TravelPL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email kontaktowy
              </label>
              <input
                type="email"
                defaultValue="kontakt@travel.pl"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                defaultValue="+48 123 456 789"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ustawienia płatności</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Płatności kartą</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Przelewy bankowe</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Raty 0%</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">PayPal</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Powiadomienia</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Nowe rezerwacje</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Anulowania</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Nowi użytkownicy</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Raporty dzienne</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup i bezpieczeństwo</h3>
          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Utwórz kopię zapasową
            </button>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
              Eksportuj dane
            </button>
            <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200">
              Sprawdź logi bezpieczeństwa
            </button>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status systemu</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-gray-700">Serwer</span>
            <span className="text-green-600 font-medium">Online</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-gray-700">Baza danych</span>
            <span className="text-green-600 font-medium">Połączona</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-gray-700">Płatności</span>
            <span className="text-green-600 font-medium">Aktywne</span>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'offers', name: 'Oferty', icon: Package },
    { id: 'reservations', name: 'Rezerwacje', icon: Calendar },
    { id: 'users', name: 'Użytkownicy', icon: Users },
    { id: 'analytics', name: 'Analityka', icon: TrendingUp },
    { id: 'settings', name: 'Ustawienia', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel Administratora</h1>
          <p className="text-gray-600 mt-2">Zarządzaj swoją platformą podróży</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-md p-4">
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
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'offers' && renderOffers()}
            {activeTab === 'reservations' && renderReservations()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;