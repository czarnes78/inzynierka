import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, Star, Clock, Utensils, Heart } from 'lucide-react';
import { Offer } from '../../types';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useAuth } from '../../contexts/AuthContext';

interface OfferCardProps {
  offer: Offer;
  className?: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, className = '' }) => {
  const { user, isFavorite, addToFavorites, removeFromFavorites } = useAuth();

  const getMealLabel = (meal: string) => {
    const labels = {
      'BB': 'Śniadania',
      'HB': 'Śniadania + obiad/kolacja', 
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

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      {/* Image */}
      <div className="relative">
        <img
          src={offer.images[0]}
          alt={offer.title}
          className="w-full h-48 object-cover"
        />
        {offer.isLastMinute && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            LAST MINUTE
          </div>
        )}
        {offer.originalPrice && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{Math.round((1 - offer.price / offer.originalPrice) * 100)}%
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
            user && isFavorite(offer.id)
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white bg-opacity-80 text-gray-600 hover:bg-opacity-100 hover:text-red-500'
          }`}
          title={user && isFavorite(offer.id) ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        >
          <Heart className={`h-4 w-4 ${user && isFavorite(offer.id) ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{offer.destination}, {offer.country}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{offer.rating} ({offer.reviewCount})</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {offer.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {offer.shortDescription}
        </p>

        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{offer.duration} dni</span>
          </div>
          <div className="flex items-center space-x-1">
            <Utensils className="h-4 w-4" />
            <span>{getMealLabel(offer.meals)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {getTripTypeLabel(offer.tripType)}
          </span>
          {offer.availableDates.length > 0 && (
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>
                {format(offer.availableDates[0], 'd MMM', { locale: pl })} - {format(new Date(offer.availableDates[0].getTime() + (offer.duration - 1) * 24 * 60 * 60 * 1000), 'd MMM', { locale: pl })}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {offer.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {offer.originalPrice.toLocaleString('pl-PL')} zł
              </span>
            )}
            <span className="text-xl font-bold text-blue-600">
              {offer.price.toLocaleString('pl-PL')} zł
            </span>
            <span className="text-xs text-gray-500">za osobę</span>
          </div>
          
          <Link
            to={`/offer/${offer.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Zobacz więcej
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;