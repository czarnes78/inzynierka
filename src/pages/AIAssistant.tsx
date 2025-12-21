import React, { useState } from 'react';
import { Send, Sparkles, Loader, MapPin, Calendar, Users } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  country: string;
  destination: string;
  price: number;
  duration: string;
  image_url: string;
  trip_type: string;
  rating?: number;
  description?: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  offers?: Offer[];
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
    "Egipt",
    "Jaka wycieczka do Grecji?",
    "Maroko",
    "Pokaż oferty do Tajlandii",
    "Last minute do Hiszpanii",
    "Wycieczki do 2500 zł"
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
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-travel-assistant`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ message: currentInput })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      const aiResponse: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: data.response,
        offers: data.offers || [],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Przepraszam, wystąpił błąd podczas przetwarzania Twojego zapytania. Spróbuj ponownie za chwilę.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
          {messages.length > 0 && messages[messages.length - 1].offers && messages[messages.length - 1].offers!.length > 0 && (
            <div className="border-t p-6 bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Polecane oferty:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {messages[messages.length - 1].offers!.map(offer => (
                  <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <a href={`/offer/${offer.id}`} className="block">
                      <img
                        src={offer.image_url}
                        alt={offer.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{offer.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{offer.destination}, {offer.country}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{offer.duration}</span>
                          <span className="text-xl font-bold text-blue-600">
                            {offer.price.toLocaleString('pl-PL')} zł
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
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