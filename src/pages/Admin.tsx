import React, { useState, useEffect } from 'react';
import { Users, Package, BarChart3, Settings, Plus, CreditCard as Edit, Trash2, Eye, Search, Filter, Calendar, MapPin, Star, TrendingUp, DollarSign, Globe, Plane, Mail, Phone, CheckCircle, XCircle, Clock, AlertTriangle, X } from 'lucide-react';
import { Offer, Reservation, User } from '../types';
import { fetchAllOffers, fetchOfferById } from '../services/offerService';
import { fetchAllReservations, updateReservationStatus } from '../services/reservationService';
import { fetchAllUsers, deleteUser as deleteUserService, getUserStats } from '../services/userService';
import { fetchAdminStats, deleteOffer as deleteOfferService, AdminStats } from '../services/adminService';
import { supabase } from '../lib/supabase';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'offers' | 'reservations' | 'users' | 'analytics' | 'settings'>('dashboard');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddOfferModal, setShowAddOfferModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserStats, setSelectedUserStats] = useState<{ reservationsCount: number; totalSpent: number } | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [reservationOffers, setReservationOffers] = useState<{ [key: string]: Offer }>({});

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setSearchTerm('');
    setFilterStatus('all');
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    const [offersData, reservationsData, usersData, statsData] = await Promise.all([
      fetchAllOffers(),
      fetchAllReservations(),
      fetchAllUsers(),
      fetchAdminStats()
    ]);

    setOffers(offersData);
    setReservations(reservationsData);
    setUsers(usersData);
    setStats(statsData);

    const offersMap: { [key: string]: Offer } = {};
    for (const reservation of reservationsData) {
      if (!offersMap[reservation.offerId]) {
        const offer = await fetchOfferById(reservation.offerId);
        if (offer) {
          offersMap[reservation.offerId] = offer;
        }
      }
    }
    setReservationOffers(offersMap);

    setLoading(false);
  };

  const totalRevenue = stats?.totalRevenue || 0;
  const totalReservations = stats?.totalReservations || 0;
  const confirmedReservations = stats?.confirmedReservations || 0;
  const pendingReservations = stats?.blockedReservations || 0;

  const handleDeleteOffer = async (id: string) => {
    if (confirm('Czy na pewno chcesz usunąć tę ofertę?')) {
      const success = await deleteOfferService(id);
      if (success) {
        setOffers(offers.filter(offer => offer.id !== id));
        alert('Oferta została usunięta');
      } else {
        alert('Nie udało się usunąć oferty');
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
      const success = await deleteUserService(id);
      if (success) {
        setUsers(users.filter(user => user.id !== id));
        alert('Użytkownik został usunięty');
      } else {
        alert('Nie udało się usunąć użytkownika');
      }
    }
  };

  const handleUpdateReservationStatus = async (id: string, status: 'confirmed' | 'cancelled' | 'blocked') => {
    const success = await updateReservationStatus(id, status);
    if (success) {
      setReservations(reservations.map(r =>
        r.id === id ? { ...r, status } : r
      ));
      alert(`Status rezerwacji został zmieniony na: ${status === 'confirmed' ? 'Potwierdzona' : status === 'cancelled' ? 'Anulowana' : 'Zablokowana'}`);
      loadData();
    } else {
      alert('Nie udało się zmienić statusu rezerwacji');
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewUser = async (user: User) => {
    setSelectedUser(user);
    const stats = await getUserStats(user.id);
    setSelectedUserStats(stats);
    setShowUserModal(true);
  };

  const handleViewOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowOfferModal(true);
  };

  const handleAddOffer = () => {
    setShowAddOfferModal(false);
    alert('Funkcja dodawania ofert będzie wkrótce dostępna');
  };

  const handleEditOffer = (offer: Offer) => {
    setEditingOffer(offer);
  };

  const handleSaveOffer = async () => {
    if (!editingOffer) return;

    const { data, error } = await supabase
      .from('offers')
      .update({
        title: editingOffer.title,
        description: editingOffer.description,
        short_description: editingOffer.shortDescription,
        destination: editingOffer.destination,
        country: editingOffer.country,
        duration: editingOffer.duration,
        price: editingOffer.price,
        meals: editingOffer.meals,
        trip_type: editingOffer.tripType,
        season: editingOffer.season,
        is_last_minute: editingOffer.isLastMinute,
        accommodation: editingOffer.accommodation,
        transport: editingOffer.transport
      })
      .eq('id', editingOffer.id);

    if (error) {
      alert('Nie udało się zaktualizować oferty');
      console.error('Error updating offer:', error);
      return;
    }

    setOffers(offers.map(o => o.id === editingOffer.id ? editingOffer : o));
    setEditingOffer(null);
    alert('Oferta została zaktualizowana');
    loadData();
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
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
              </div>
            ) : reservations.slice(0, 5).map(reservation => {
              const offer = reservationOffers[reservation.offerId];
              return (
                <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{offer?.title || 'Ładowanie...'}</p>
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
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
              </div>
            ) : offers.slice(0, 5).map(offer => (
              <div key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{offer.title}</p>
                  <p className="text-sm text-gray-600">{offer.destination}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">{offer.price.toLocaleString('pl-PL')} zł</p>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{offer.rating?.toFixed(1) || '0.0'}</span>
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
          <div className="text-2xl font-bold text-blue-600">{stats?.totalOffers || 0}</div>
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
            {offers.length > 0 ? (offers.reduce((sum, o) => sum + (o.rating || 0), 0) / offers.length).toFixed(1) : '0.0'}
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p className="text-gray-600">Ładowanie ofert...</p>
                  </td>
                </tr>
              ) : filteredOffers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <p className="text-gray-600">Brak ofert do wyświetlenia</p>
                  </td>
                </tr>
              ) : filteredOffers.map(offer => (
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
                        onClick={() => handleEditOffer(offer)}
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

      {/* Edit Offer Modal */}
      {editingOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Edytuj ofertę</h3>
              <button
                onClick={() => setEditingOffer(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tytuł</label>
                <input
                  type="text"
                  value={editingOffer.title}
                  onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kierunek</label>
                <input
                  type="text"
                  value={editingOffer.destination}
                  onChange={(e) => setEditingOffer({ ...editingOffer, destination: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kraj</label>
                <input
                  type="text"
                  value={editingOffer.country}
                  onChange={(e) => setEditingOffer({ ...editingOffer, country: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Czas trwania (dni)</label>
                <input
                  type="number"
                  value={editingOffer.duration}
                  onChange={(e) => setEditingOffer({ ...editingOffer, duration: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cena (zł)</label>
                <input
                  type="number"
                  value={editingOffer.price}
                  onChange={(e) => setEditingOffer({ ...editingOffer, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wyżywienie</label>
                <select
                  value={editingOffer.meals}
                  onChange={(e) => setEditingOffer({ ...editingOffer, meals: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="BB">BB - Śniadania</option>
                  <option value="HB">HB - Śniadania i obiadokolacje</option>
                  <option value="FB">FB - Pełne wyżywienie</option>
                  <option value="AI">AI - All Inclusive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Typ wycieczki</label>
                <select
                  value={editingOffer.tripType}
                  onChange={(e) => setEditingOffer({ ...editingOffer, tripType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relax">Relax</option>
                  <option value="adventure">Przygoda</option>
                  <option value="city">Miasto</option>
                  <option value="culture">Kultura</option>
                  <option value="nature">Natura</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sezon</label>
                <select
                  value={editingOffer.season}
                  onChange={(e) => setEditingOffer({ ...editingOffer, season: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="summer">Lato</option>
                  <option value="winter">Zima</option>
                  <option value="spring">Wiosna</option>
                  <option value="autumn">Jesień</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zakwaterowanie</label>
                <input
                  type="text"
                  value={editingOffer.accommodation}
                  onChange={(e) => setEditingOffer({ ...editingOffer, accommodation: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transport</label>
                <input
                  type="text"
                  value={editingOffer.transport}
                  onChange={(e) => setEditingOffer({ ...editingOffer, transport: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Krótki opis</label>
                <textarea
                  value={editingOffer.shortDescription}
                  onChange={(e) => setEditingOffer({ ...editingOffer, shortDescription: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pełny opis</label>
                <textarea
                  value={editingOffer.description}
                  onChange={(e) => setEditingOffer({ ...editingOffer, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isLastMinute"
                  checked={editingOffer.isLastMinute}
                  onChange={(e) => setEditingOffer({ ...editingOffer, isLastMinute: e.target.checked })}
                  className="rounded mr-2"
                />
                <label htmlFor="isLastMinute" className="text-sm font-medium text-gray-700">
                  Last Minute
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
              <button
                onClick={() => setEditingOffer(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Anuluj
              </button>
              <button
                onClick={handleSaveOffer}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Zapisz zmiany
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
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Data wyjazdu</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Osoby</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Cena</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p className="text-gray-600">Ładowanie rezerwacji...</p>
                  </td>
                </tr>
              ) : filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <p className="text-gray-600">Brak rezerwacji do wyświetlenia</p>
                  </td>
                </tr>
              ) : filteredReservations.map(reservation => {
                const offer = reservationOffers[reservation.offerId];
                const user = users.find(u => u.id === reservation.userId);
                return (
                  <tr key={reservation.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{reservation.id.substring(0, 8)}...</td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{offer?.title || 'Ładowanie...'}</p>
                      <p className="text-sm text-gray-600">{offer?.destination || '-'}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{user?.name || 'Brak danych'}</p>
                      <p className="text-sm text-gray-600">{user?.email || '-'}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-gray-900">{reservation.departureDate.toLocaleDateString('pl-PL')}</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-2xl font-bold text-blue-600">{users.length}</div>
          <div className="text-sm text-gray-600">Wszyscy użytkownicy</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-2xl font-bold text-green-600">
            {users.filter(u => u.role === 'client').length}
          </div>
          <div className="text-sm text-gray-600">Klienci</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-2xl font-bold text-purple-600">
            {users.filter(u => u.role === 'admin').length}
          </div>
          <div className="text-sm text-gray-600">Administratorzy</div>
        </div>
      </div>

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
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p className="text-gray-600">Ładowanie użytkowników...</p>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <p className="text-gray-600">Brak użytkowników do wyświetlenia</p>
                  </td>
                </tr>
              ) : filteredUsers.map(user => {
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
                    <div><strong>Rezerwacje:</strong> {selectedUserStats?.reservationsCount || 0}</div>
                    <div><strong>Wydane środki:</strong> {(selectedUserStats?.totalSpent || 0).toLocaleString('pl-PL')} zł</div>
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

  const renderAnalytics = () => {
    const monthlyStats = reservations
      .filter(r => r.status === 'confirmed')
      .reduce((acc, r) => {
        const monthKey = `${r.createdAt.getFullYear()}-${String(r.createdAt.getMonth() + 1).padStart(2, '0')}`;
        const monthName = r.createdAt.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long' });

        if (!acc[monthKey]) {
          acc[monthKey] = { name: monthName, revenue: 0, count: 0 };
        }
        acc[monthKey].revenue += r.totalPrice;
        acc[monthKey].count += 1;
        return acc;
      }, {} as { [key: string]: { name: string; revenue: number; count: number } });

    const sortedMonths = Object.entries(monthlyStats)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 6);

    const maxRevenue = Math.max(...sortedMonths.map(([_, data]) => data.revenue), 1);

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Analityka i raporty</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sprzedaż według miesięcy</h3>
            {sortedMonths.length === 0 ? (
              <p className="text-gray-600 text-center py-8">Brak potwierdzonych rezerwacji</p>
            ) : (
              <div className="space-y-3">
                {sortedMonths.map(([key, data]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">{data.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 min-w-[80px] text-right">
                        {data.revenue.toLocaleString('pl-PL')} zł
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popularne kierunki</h3>
          <div className="space-y-3">
            {(() => {
              const countryStats = reservations.reduce((acc, reservation) => {
                const offer = reservationOffers[reservation.offerId];
                if (offer) {
                  const country = offer.country;
                  if (!acc[country]) {
                    acc[country] = 0;
                  }
                  acc[country]++;
                }
                return acc;
              }, {} as { [key: string]: number });

              const sortedCountries = Object.entries(countryStats)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);

              const maxCount = sortedCountries[0]?.[1] || 1;

              if (sortedCountries.length === 0) {
                return <p className="text-gray-600 text-center py-8">Brak danych o rezerwacjach</p>;
              }

              return sortedCountries.map(([country, count]) => (
                <div key={country} className="flex items-center justify-between">
                  <span className="text-gray-600">{country}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(count / maxCount) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{count} rez.</span>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kluczowe metryki</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats && stats.totalReservations > 0
                ? Math.round((stats.confirmedReservations / stats.totalReservations) * 100)
                : 0}%
            </div>
            <div className="text-gray-600">Współczynnik konwersji</div>
            <div className="text-xs text-gray-500 mt-1">
              Potwierdzone / Wszystkie rezerwacje
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {offers.length > 0
                ? (offers.reduce((sum, o) => sum + (o.rating || 0), 0) / offers.length).toFixed(1)
                : '0.0'}
            </div>
            <div className="text-gray-600">Średnia ocena</div>
            <div className="text-xs text-gray-500 mt-1">Na podstawie {offers.length} ofert</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {stats?.totalClients || 0}
            </div>
            <div className="text-gray-600">Aktywni klienci</div>
            <div className="text-xs text-gray-500 mt-1">Zarejestrowani użytkownicy</div>
          </div>
        </div>
      </div>

      {/* Recent Reservations Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ostatnia aktywność rezerwacji</h3>
        {reservations.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Brak rezerwacji</p>
        ) : (
          <div className="space-y-3">
            {reservations.slice(0, 5).map((reservation) => {
              const offer = reservationOffers[reservation.offerId];
              const user = users.find(u => u.id === reservation.userId);
              const timeDiff = Date.now() - reservation.createdAt.getTime();
              const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
              const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
              const timeAgo = daysAgo > 0 ? `${daysAgo} dni temu` : `${hoursAgo} godz temu`;

              return (
                <div key={reservation.id} className={`flex items-center justify-between p-3 rounded-lg ${
                  reservation.status === 'confirmed' ? 'bg-green-50' :
                  reservation.status === 'blocked' ? 'bg-orange-50' :
                  'bg-red-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      reservation.status === 'confirmed' ? 'bg-green-500' :
                      reservation.status === 'blocked' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}></div>
                    <div>
                      <span className="text-sm font-medium">{offer?.title || 'Ładowanie...'}</span>
                      <p className="text-xs text-gray-500">
                        {user?.name || 'Nieznany użytkownik'} • {reservation.totalPrice.toLocaleString('pl-PL')} zł
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{timeAgo}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
    );
  };

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