import React, { useState } from 'react';
import { X, CreditCard, Lock, Calendar, User } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerTitle: string;
  totalPrice: number;
  guests: number;
  departureDate: Date;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  offerTitle,
  totalPrice,
  guests,
  departureDate,
  onPaymentSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'installments'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
      onClose();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Płatność</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-gray-50">
          <h4 className="font-semibold text-gray-900 mb-3">Podsumowanie zamówienia</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Wycieczka:</span>
              <span className="font-medium">{offerTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data wyjazdu:</span>
              <span className="font-medium">
                {departureDate.toLocaleDateString('pl-PL')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Liczba osób:</span>
              <span className="font-medium">{guests}</span>
            </div>
            <div className="h-px bg-gray-200 my-3"></div>
            <div className="flex justify-between text-lg font-bold">
              <span>Razem:</span>
              <span className="text-blue-600">
                {totalPrice.toLocaleString('pl-PL')} zł
              </span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Sposób płatności</h4>
          
          <div className="space-y-3 mb-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                className="text-blue-600"
              />
              <CreditCard className="h-5 w-5 text-gray-600" />
              <span>Karta płatnicza</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="transfer"
                checked={paymentMethod === 'transfer'}
                onChange={(e) => setPaymentMethod(e.target.value as 'transfer')}
                className="text-blue-600"
              />
              <span>Przelew bankowy</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="installments"
                checked={paymentMethod === 'installments'}
                onChange={(e) => setPaymentMethod(e.target.value as 'installments')}
                className="text-blue-600"
              />
              <span>Raty 0% (3 raty)</span>
            </label>
          </div>

          {/* Card Payment Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numer karty
                </label>
                <input
                  type="text"
                  value={cardData.number}
                  onChange={(e) => setCardData(prev => ({ 
                    ...prev, 
                    number: formatCardNumber(e.target.value) 
                  }))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data ważności
                  </label>
                  <input
                    type="text"
                    value={cardData.expiry}
                    onChange={(e) => setCardData(prev => ({ 
                      ...prev, 
                      expiry: formatExpiry(e.target.value) 
                    }))}
                    placeholder="MM/RR"
                    maxLength={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cardData.cvv}
                    onChange={(e) => setCardData(prev => ({ 
                      ...prev, 
                      cvv: e.target.value.replace(/\D/g, '').substring(0, 3) 
                    }))}
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imię i nazwisko na karcie
                </label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => setCardData(prev => ({ 
                    ...prev, 
                    name: e.target.value 
                  }))}
                  placeholder="Jan Kowalski"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Transfer Payment Info */}
          {paymentMethod === 'transfer' && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                Po potwierdzeniu otrzymasz dane do przelewu na e-mail. 
                Płatność należy zrealizować w ciągu 24 godzin.
              </p>
            </div>
          )}

          {/* Installments Info */}
          {paymentMethod === 'installments' && (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800 mb-2">
                <strong>Raty 0% - bez dodatkowych kosztów!</strong>
              </p>
              <div className="text-sm text-green-700">
                <p>• 1. rata: {Math.round(totalPrice / 3).toLocaleString('pl-PL')} zł (dziś)</p>
                <p>• 2. rata: {Math.round(totalPrice / 3).toLocaleString('pl-PL')} zł (za 30 dni)</p>
                <p>• 3. rata: {Math.round(totalPrice / 3).toLocaleString('pl-PL')} zł (za 60 dni)</p>
              </div>
            </div>
          )}

          {/* Security Info */}
          <div className="flex items-center space-x-2 mt-4 p-3 bg-gray-50 rounded-lg">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-sm text-gray-600">
              Płatność jest zabezpieczona SSL i 3D Secure
            </span>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing || (paymentMethod === 'card' && (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name))}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed mt-6"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Przetwarzanie...</span>
              </div>
            ) : (
              `Zapłać ${totalPrice.toLocaleString('pl-PL')} zł`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;