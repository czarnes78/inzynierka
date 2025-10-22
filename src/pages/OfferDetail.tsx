import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, Star, Clock, Utensils, 
  Car, Building, CheckCircle, Heart,
  ChevronLeft, ChevronRight, Lock, CreditCard, Plane
} from 'lucide-react';
import { mockOffers } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import PaymentModal from '../components/UI/PaymentModal';

const OfferDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isFavorite, addToFavorites, removeFromFavorites } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const offer = mockOffers.find(o => o.id === id);

  if (!offer) {
    return <Navigate to="/offers" replace />;
  }

  const getMealLabel = (meal: string) => {
    const labels = {
      'BB': 'Śniadania (BB)',
      'HB': 'Śniadania + obiad/kolacja (HB)', 
      'AI': 'All Inclusive',
      'none': 'Bez wyżywienia'
    };
    return labels[meal as keyof typeof labels] || meal;
  };

  const getTripTypeLabel = (type: string) => {
    const labels = {
      'relax': 'Relaks',
      'adventure': 'Przygoda',
      'culture': 'Kultura',
      'family': 'Rodzina'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const totalPrice = offer.price * guests;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === offer.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? offer.images.length - 1 : prev - 1
    );
  };

  const handleBookNow = () => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }
    
    if (!selectedDate) {
      alert('Wybierz datę wyjazdu');
      return;
    }

    setShowPaymentModal(true);
  };

  const handleBlockAndPay = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    
    if (!selectedDate) {
      alert('Wybierz datę wyjazdu');
      return;
    }

    // Mock blocking reservation for 3 hours
    alert('Oferta została zablokowana na 3 godziny. Możesz dokończyć płatność później.');
  };

  const handlePaymentSuccess = () => {
    alert('Płatność zakończona sukcesem! Szczegóły rezerwacji zostały wysłane na e-mail.');
  };

  const handleFavoriteClick = () => {
    if (!user) {
      alert('Zaloguj się, aby dodać ofertę do ulubionych');
      return;
    }
    
    if (isFavorite(offer.id)) {
      removeFromFavorites(offer.id);
    } else {
      addToFavorites(offer.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/offers" className="hover:text-blue-600">Oferty</a>
          <span className="mx-2">/</span>
          <span>{offer.destination}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{offer.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={offer.images[currentImageIndex]}
                  alt={offer.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                
                {offer.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image indicators */}
                {offer.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {offer.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  {offer.isLastMinute && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      LAST MINUTE
                    </span>
                  )}
                  {offer.originalPrice && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{Math.round((1 - offer.price / offer.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Offer Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{offer.destination}, {offer.country}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {offer.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{offer.rating}</span>
                      <span>({offer.reviewCount} opinii)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{offer.duration} dni</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  {offer.originalPrice && (
                    <div className="text-lg text-gray-400 line-through">
                      {offer.originalPrice.toLocaleString('pl-PL')} zł
                    </div>
                  )}
                  <div className="text-3xl font-bold text-blue-600">
                    {offer.price.toLocaleString('pl-PL')} zł
                  </div>
                  <div className="text-sm text-gray-600">za osobę</div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {offer.description}
              </p>

              {/* Trip Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Utensils className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Wyżywienie</div>
                    <div className="text-sm text-gray-600">{getMealLabel(offer.meals)}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Building className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Zakwaterowanie</div>
                    <div className="text-sm text-gray-600">{offer.accommodation}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Car className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Transport</div>
                    <div className="text-sm text-gray-600">{offer.transport}</div>
                  </div>
                </div>
              </div>

              {/* Trip Type */}
              <div className="mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {getTripTypeLabel(offer.tripType)}
                </span>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                
                {/* Favorite Button */}
                <button
                  onClick={handleFavoriteClick}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    user && isFavorite(offer.id)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${user && isFavorite(offer.id) ? 'fill-current' : ''}`} />
                  <span>
                    {user && isFavorite(offer.id) ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                  </span>
                </button>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rezerwacja</h3>
              
              {/* Date Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dostępne terminy
                </label>
                <div className="space-y-2">
                  {offer.availableDates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors duration-200 ${
                        selectedDate?.getTime() === date.getTime()
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            {format(date, 'd MMMM yyyy', { locale: pl })}
                          </div>
                          <div className="text-sm text-gray-500">
                            do {format(new Date(date.getTime() + (offer.duration - 1) * 24 * 60 * 60 * 1000), 'd MMMM yyyy', { locale: pl })}
                          </div>
                        </div>
                        {selectedDate?.getTime() === date.getTime() && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Liczba osób
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'osoba' : num < 5 ? 'osoby' : 'osób'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Cena za osobę:</span>
                  <span className="font-medium">{offer.price.toLocaleString('pl-PL')} zł</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Liczba osób:</span>
                  <span className="font-medium">{guests}</span>
                </div>
                <div className="h-px bg-gray-200 my-3"></div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Razem:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {totalPrice.toLocaleString('pl-PL')} zł
                  </span>
                </div>
              </div>

              {/* Booking Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBookNow}
                  disabled={!selectedDate}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Rezerwuj teraz</span>
                </button>
                
                <button
                  onClick={handleBlockAndPay}
                  disabled={!selectedDate}
                  className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Lock className="h-5 w-5" />
                  <span>Zablokuj na 3h</span>
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                * Bezpieczne płatności. Możliwość anulowania do 14 dni przed wyjazdem.
              </p>
            </div>
          </div>
        </div>

        {/* Practical Information */}
        <div className="space-y-8 mt-8">
          {/* Flight Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Plane className="h-6 w-6 text-blue-600" />
              <span>Informacje o locie</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Lot tam</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data:</span>
                    <span>{selectedDate ? format(selectedDate, 'd MMMM yyyy', { locale: pl }) : 'Wybierz termin'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Godzina odlotu:</span>
                    <span>06:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Przylot:</span>
                    <span>10:15 (czas lokalny)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Linia lotnicza:</span>
                    <span>LOT Polish Airlines</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Lot powrotny</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data:</span>
                    <span>{selectedDate ? format(new Date(selectedDate.getTime() + (offer.duration - 1) * 24 * 60 * 60 * 1000), 'd MMMM yyyy', { locale: pl }) : 'Wybierz termin'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Godzina odlotu:</span>
                    <span>14:45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Przylot:</span>
                    <span>18:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bagaż:</span>
                    <span>20kg + bagaż podręczny</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hotel Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Building className="h-6 w-6 text-blue-600" />
              <span>Hotel i zakwaterowanie</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Informacje o hotelu</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nazwa:</span>
                    <span>Hotel Paradise Beach Resort</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kategoria:</span>
                    <span>4* Superior</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Odległość od plaży:</span>
                    <span>50 metrów</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span>15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span>11:00</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Udogodnienia</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Basen zewnętrzny z brodzikiem</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Centrum SPA i wellness</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Siłownia i kort tenisowy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>WiFi w całym hotelu</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Klimatyzacja w pokojach</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Food & Bars */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Utensils className="h-6 w-6 text-blue-600" />
              <span>Wyżywienie i bary</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Restauracje</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Restauracja główna</div>
                    <div className="text-sm text-gray-600">Śniadania: 7:00-10:00</div>
                    <div className="text-sm text-gray-600">Obiad: 12:30-14:30</div>
                    <div className="text-sm text-gray-600">Kolacja: 18:30-21:30</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Restauracja à la carte</div>
                    <div className="text-sm text-gray-600">Kuchnia grecka: 19:00-22:00</div>
                    <div className="text-sm text-gray-600">Rezerwacja wymagana</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Bary</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Pool Bar</div>
                    <div className="text-sm text-gray-600">10:00-18:00</div>
                    <div className="text-sm text-gray-600">Napoje, koktajle, lekkie przekąski</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Lobby Bar</div>
                    <div className="text-sm text-gray-600">18:00-24:00</div>
                    <div className="text-sm text-gray-600">Koktajle, wina, muzyka na żywo</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">Beach Bar</div>
                    <div className="text-sm text-gray-600">10:00-sunset</div>
                    <div className="text-sm text-gray-600">Napoje chłodzące, soki, piwo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Attractions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-blue-600" />
              <span>Lokalizacja i atrakcje</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">W pobliżu hotelu</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Centrum miasta:</span>
                    <span>2 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lotnisko:</span>
                    <span>45 km (1h transferu)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Port:</span>
                    <span>3 km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sklepy:</span>
                    <span>500m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Apteka:</span>
                    <span>300m</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Atrakcje</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Pałac Knossos (45 min)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Akwarium CretAquarium (30 min)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Wąwóz Samaria (2h)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Plaża Balos (1.5h)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Chania - stare miasto (1h)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ważne informacje</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Bagaż i dokumenty</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Dowód osobisty lub paszport</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Bagaż rejestrowany: 20kg</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Bagaż podręczny: 8kg (55x40x23cm)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Ubezpieczenie turystyczne w cenie</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Przydatne informacje</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Waluta:</span>
                    <span>Euro (EUR)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Różnica czasu:</span>
                    <span>+1 godzina</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Język:</span>
                    <span>Grecki, angielski</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Napięcie:</span>
                    <span>230V (wtyczka EU)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pogoda:</span>
                    <span>25-30°C, słonecznie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          offerTitle={offer.title}
          totalPrice={totalPrice}
          guests={guests}
          departureDate={selectedDate!}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default OfferDetail;