import React, { useState } from 'react';
import { Send, Sparkles, Loader, MapPin, Calendar, Users } from 'lucide-react';
import OfferCard from '../components/UI/OfferCard';
import { mockOffers } from '../data/mockData';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  offers?: typeof mockOffers;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Witaj! Jestem Twoim osobistym doradcą podróży. Powiedz mi, jakiego rodzaju wycieczkę planujesz, a ja pomogę Ci znaleźć idealne oferty. Możesz zapytać o konkretny kraj, typ wypoczynku, budżet czy wszystko co Cię interesuje!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    "Szukam relaksujących wakacji nad morzem do 3000 zł",
    "Jaka wycieczka będzie dobra dla rodziny z dziećmi?",
    "Chcę zwiedzić Włochy, co polecasz?",
    "Szukam przygodowej wycieczki w góry",
    "Gdzie najlepiej jechać w grudniu?"
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();
    let response = '';
    let relevantOffers = [];

    // Simple keyword matching for demo
    if (lowerInput.includes('relaks') || lowerInput.includes('plaża') || lowerInput.includes('morze')) {
      response = 'Doskonały wybór! Dla relaksujących wakacji nad morzem polecam następujące oferty:';
      relevantOffers = mockOffers.filter(offer => 
        offer.tripType === 'relax' || 
        offer.destination.toLowerCase().includes('kreta') ||
        offer.country.toLowerCase().includes('grecja') ||
        offer.country.toLowerCase().includes('chorwacja')
      );
    } else if (lowerInput.includes('rodzin') || lowerInput.includes('dziec')) {
      response = 'Świetnie! Dla rodzinnych wakacji z dziećmi przygotowałem specjalne oferty, które zapewnią rozrywkę dla całej rodziny:';
      relevantOffers = mockOffers.filter(offer => offer.tripType === 'family');
    } else if (lowerInput.includes('włoch') || lowerInput.includes('rzym') || lowerInput.includes('wenecj')) {
      response = 'Włochy to fantastyczny wybór! Oto oferty, które pozwolą Ci odkryć piękno tego kraju:';
      relevantOffers = mockOffers.filter(offer => offer.country === 'Włochy');
    } else if (lowerInput.includes('przygod') || lowerInput.includes('aktywn') || lowerInput.includes('gór')) {
      response = 'Kochasz aktywny wypoczynek? Oto oferty pełne przygód:';
      relevantOffers = mockOffers.filter(offer => offer.tripType === 'adventure');
    } else if (lowerInput.includes('grudzień') || lowerInput.includes('zim')) {
      response = 'W grudniu polecam ciepłe kraje, gdzie możesz uciec od zimy:';
      relevantOffers = mockOffers.filter(offer => 
        offer.country === 'Egipt' || 
        offer.season === 'winter'
      );
    } else if (lowerInput.includes('budżet') || lowerInput.includes('tani') || lowerInput.includes('zł')) {
      const budgetMatch = lowerInput.match(/(\d+)\s*zł/);
      const budget = budgetMatch ? parseInt(budgetMatch[1]) : 2000;
      response = `Znalazłem oferty w Twoim budżecie do ${budget} zł:`;
      relevantOffers = mockOffers.filter(offer => offer.price <= budget);
    } else {
      response = 'Dziękuję za Twoje pytanie! Na podstawie tego co napisałeś, oto kilka ofert, które mogą Cię zainteresować:';
      relevantOffers = mockOffers.slice(0, 3);
    }

    if (relevantOffers.length === 0) {
      relevantOffers = mockOffers.slice(0, 2);
      response += ' Chociaż nie znalazłem dokładnie tego czego szukasz, oto kilka popularnych ofert:';
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      offers: relevantOffers.slice(0, 3),
      timestamp: new Date()
    };
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Centrum Asystenta AI</h1>
          <p className="text-lg text-gray-600">
            Tutaj możesz prowadzić dłuższe rozmowy z naszym asystentem podróży
          </p>
        </div>

        {/* Sample Questions */}
        {messages.length <= 1 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Przykładowe pytania:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-blue-700 text-sm"
                >
                  "{question}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.type === 'ai' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-600">AI Doradca</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Loader className="h-4 w-4 animate-spin text-purple-600" />
                    <span className="text-sm text-gray-600">AI analizuje Twoje zapytanie...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Show offers from last AI message */}
          {messages.length > 0 && messages[messages.length - 1].offers && (
            <div className="border-t p-6 bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Polecane oferty:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {messages[messages.length - 1].offers!.map(offer => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Opisz swoją wymarzoną podróż..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Kierunki</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Terminy</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>Liczba osób</span>
              </div>
            </div>
            <span>Naciśnij Enter aby wysłać</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;