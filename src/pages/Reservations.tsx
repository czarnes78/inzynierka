import React, { useState, useEffect } from 'react';
import {
  Calendar, MapPin, Users, CreditCard, Clock, CheckCircle,
  XCircle, AlertTriangle, Eye, Download, Filter, Search,
  Star, Plane, Phone, Mail, Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { fetchUserReservations, deleteReservation, updateReservationStatus } from '../services/reservationService';
import { fetchOfferById } from '../services/offerService';
import { Reservation, Offer } from '../types';

const Reservations: React.FC = () => {
  const { user } = useAuth();
  const [userReservations, setUserReservations] = useState<Reservation[]>([]);
  const [offers, setOffers] = useState<Map<string, Offer>>(new Map());
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadReservations();
    }
  }, [user]);

  const loadReservations = async () => {
    if (!user) return;

    setLoading(true);
    const reservations = await fetchUserReservations(user.id);
    setUserReservations(reservations);

    const offersMap = new Map<string, Offer>();
    for (const reservation of reservations) {
      if (!offersMap.has(reservation.offerId)) {
        const offer = await fetchOfferById(reservation.offerId);
        if (offer) {
          offersMap.set(reservation.offerId, offer);
        }
      }
    }
    setOffers(offersMap);
    setLoading(false);
  };

  const filteredReservations = userReservations.filter(reservation => {
    const offer = offers.get(reservation.offerId);
    const matchesSearch = offer?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer?.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'blocked':
        return <Clock className="h-5 w-5 text-orange-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Potwierdzona';
      case 'blocked':
        return 'Zablokowana';
      case 'cancelled':
        return 'Anulowana';
      default:
        return 'Nieznany';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'blocked':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  const handleDownloadVoucher = (reservationId: string) => {
    // Mock download functionality
    alert(`Pobieranie vouchera dla rezerwacji ${reservationId}`);
  };

  const handleCancelReservation = (reservationId: string) => {
    setReservationToCancel(reservationId);
    setShowCancelModal(true);
  };

  const confirmCancelReservation = async () => {
    if (reservationToCancel) {
      const success = await updateReservationStatus(reservationToCancel, 'cancelled');
      if (success) {
        alert(`Rezerwacja ${reservationToCancel} została anulowana`);
        await loadReservations();
      } else {
        alert('Nie udało się anulować rezerwacji');
      }
      setShowCancelModal(false);
      setReservationToCancel(null);
    }
  };

  const renderReservationModal = () => {
    if (!selectedReservation) return null;

    const offer = offers.get(selectedReservation.offerId);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Szczegóły rezerwacji</h3>
              <button
                onClick={() => setSelectedReservation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Reservation Header */}
            <div className="flex items-start space-x-4">
              <img
                src={offer?.images[0]}
                alt={offer?.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900">{offer?.title}</h4>
                <p className="text-gray-600">{offer?.destination}, {offer?.country}</p>
                <div className="flex items-center space-x-2 mt-2">
                  {getStatusIcon(selectedReservation.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedReservation.status)}`}>
                    {getStatusText(selectedReservation.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Reservation Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Informacje o rezerwacji</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID rezerwacji:</span>
                      <span className="font-mono">{selectedReservation.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data rezerwacji:</span>
                      <span>{selectedReservation.createdAt.toLocaleDateString('pl-PL')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data wyjazdu:</span>
                      <span>{selectedReservation.departureDate.toLocaleDateString('pl-PL')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Liczba osób:</span>
                      <span>{selectedReservation.guests}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Szczegóły wycieczki</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Czas trwania:</span>
                      <span>{offer?.duration} dni</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wyżywienie:</span>
                      <span>{offer?.meals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transport:</span>
                      <span>{offer?.transport}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zakwaterowanie:</span>
                      <span>{offer?.accommodation}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Płatność</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cena za osobę:</span>
                      <span>{offer?.price.toLocaleString('pl-PL')} zł</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Liczba osób:</span>
                      <span>{selectedReservation.guests}</span>
                    </div>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between font-semibold">
                      <span>Łączna kwota:</span>
                      <span className="text-blue-600">
                        {selectedReservation.totalPrice.toLocaleString('pl-PL')} zł
                      </span>
                    </div>
                  </div>
                </div>

                {selectedReservation.status === 'blocked' && selectedReservation.blockedUntil && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-orange-800 text-sm font-medium">Rezerwacja zablokowana</p>
                        <p className="text-orange-700 text-xs">
                          Do: {selectedReservation.blockedUntil.toLocaleString('pl-PL')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedReservation.paymentDeadline && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-blue-800 text-sm font-medium">Termin płatności</p>
                        <p className="text-blue-700 text-xs">
                          {selectedReservation.paymentDeadline.toLocaleDateString('pl-PL')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-3">Kontakt w sprawie rezerwacji</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span>+48 123 456 789</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span>rezerwacje@travel.pl</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {selectedReservation.status === 'confirmed' && (
                <button
                  onClick={() => handleDownloadVoucher(selectedReservation.id)}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Download className="h-4 w-4" />
                  <span>Pobierz voucher</span>
                </button>
              )}
              
              {selectedReservation.status === 'blocked' && (
                <button className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  <CreditCard className="h-4 w-4" />
                  <span>Dokończ płatność</span>
                </button>
              )}

              {selectedReservation.status !== 'cancelled' && (
                <button 
                  onClick={() => handleCancelReservation(selectedReservation.id)}
                  className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Anuluj rezerwację</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Moje rezerwacje</h1>
          <p className="text-gray-600 mt-2">Zarządzaj swoimi rezerwacjami podróży</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wszystkie</p>
                <p className="text-2xl font-bold text-gray-900">{userReservations.length}</p>
                <p className="text-xs text-gray-500">Łącznie rezerwacji</p>
              </div>
              <Calendar className="h-8 w-8 text-gray-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Potwierdzone</p>
                <p className="text-2xl font-bold text-green-600">
                  {userReservations.filter(r => r.status === 'confirmed').length}
                </p>
                <p className="text-xs text-gray-500">Gotowe do wyjazdu</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Zablokowane</p>
                <p className="text-2xl font-bold text-orange-600">
                  {userReservations.filter(r => r.status === 'blocked').length}
                </p>
                <p className="text-xs text-gray-500">Oczekują płatności</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wydane</p>
                <p className="text-2xl font-bold text-blue-600">
                  {userReservations
                    .filter(r => r.status === 'confirmed')
                    .reduce((sum, r) => sum + r.totalPrice, 0)
                    .toLocaleString('pl-PL')} zł
                </p>
                <p className="text-xs text-gray-500">Za potwierdzone</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Szybkie akcje</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <Plus className="h-4 w-4" />
              <span>Nowa rezerwacja</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200">
              <Download className="h-4 w-4" />
              <span>Pobierz wszystkie vouchery</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200">
              <Mail className="h-4 w-4" />
              <span>Wyślij podsumowanie</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
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
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
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
          </div>
        </div>

        {/* Reservations List */}
        {filteredReservations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {userReservations.length === 0 
                ? 'Nie masz jeszcze żadnych rezerwacji'
                : 'Nie znaleziono rezerwacji'
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {userReservations.length === 0
                ? 'Przeglądaj nasze oferty i zarezerwuj swoją wymarzoną podróż'
                : 'Spróbuj zmienić kryteria wyszukiwania'
              }
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
            {filteredReservations.map(reservation => {
              const offer = offers.get(reservation.offerId);
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
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{offer?.destination}, {offer?.country}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {reservation.departureDate.toLocaleDateString('pl-PL')} - {new Date(reservation.departureDate.getTime() + ((offer?.duration || 7) - 1) * 24 * 60 * 60 * 1000).toLocaleDateString('pl-PL')}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{reservation.guests} osób</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Plane className="h-4 w-4" />
                            <span>{offer?.duration} dni</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:items-end space-y-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {reservation.totalPrice.toLocaleString('pl-PL')} zł
                        </p>
                        <p className="text-sm text-gray-600">ID: {reservation.id}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(reservation.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(reservation.status)}`}>
                          {getStatusText(reservation.status)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(reservation)}
                          className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Szczegóły</span>
                        </button>
                        
                        {reservation.status === 'confirmed' && (
                          <button
                            onClick={() => handleDownloadVoucher(reservation.id)}
                            className="text-green-600 hover:text-green-700 text-sm flex items-center space-x-1"
                          >
                            <Download className="h-4 w-4" />
                            <span>Voucher</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {reservation.status === 'blocked' && reservation.blockedUntil && (
                    <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
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

        {/* Reservation Details Modal */}
        {renderReservationModal()}

        {/* Cancel Reservation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Anuluj rezerwację</h3>
              <p className="text-gray-600 mb-6">
                Czy na pewno chcesz anulować tę rezerwację? Ta akcja jest nieodwracalna.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={confirmCancelReservation}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Anuluj rezerwację
                </button>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Zachowaj
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;