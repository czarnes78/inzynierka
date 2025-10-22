import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader } from 'lucide-react';
import OfferCard from './OfferCard';
import { mockOffers } from '../../data/mockData';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  offers?: typeof mockOffers;
  timestamp: Date;
}

const FloatingAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Cześć! Jestem Twoim asystentem podróży. Jak mogę Ci pomóc w znalezieniu idealnej wycieczki?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    "Szukam relaksujących wakacji nad morzem",
    "Jaka wycieczka będzie dobra dla rodziny z dziećmi?",
    "Chcę zwiedzić Włochy, co polecasz?",
    "Szukam przygodowej wycieczki w góry"
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

    if (lowerInput.includes('relaks') || lowerInput.includes('plaża') || lowerInput.includes('morze')) {
      response = 'Doskonały wybór! Dla relaksujących wakacji nad morzem polecam:';
      relevantOffers = mockOffers.filter(offer => 
        offer.tripType === 'relax' || 
        offer.destination.toLowerCase().includes('kreta') ||
        offer.country.toLowerCase().includes('grecja') ||
        offer.country.toLowerCase().includes('chorwacja')
      );
    } else if (lowerInput.includes('rodzin') || lowerInput.includes('dziec')) {
      response = 'Świetnie! Dla rodzinnych wakacji z dziećmi przygotowałem:';
      relevantOffers = mockOffers.filter(offer => offer.tripType === 'family');
    } else if (lowerInput.includes('włoch') || lowerInput.includes('rzym')) {
      response = 'Włochy to fantastyczny wybór! Oto oferty:';
      relevantOffers = mockOffers.filter(offer => offer.country === 'Włochy');
    } else if (lowerInput.includes('przygod') || lowerInput.includes('gór')) {
      response = 'Kochasz aktywny wypoczynek? Oto oferty pełne przygód:';
      relevantOffers = mockOffers.filter(offer => offer.tripType === 'adventure');
    } else {
      response = 'Oto kilka ofert, które mogą Cię zainteresować:';
      relevantOffers = mockOffers.slice(0, 2);
    }

    if (relevantOffers.length === 0) {
      relevantOffers = mockOffers.slice(0, 2);
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      offers: relevantOffers.slice(0, 2),
      timestamp: new Date()
    };
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">Asystent AI</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length <= 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 mb-2">Przykładowe pytania:</p>
                {sampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="text-left p-2 bg-blue-50 hover:bg-blue-100 rounded text-blue-700 text-xs w-full transition-colors duration-200"
                  >
                    "{question}"
                  </button>
                ))}
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="flex items-center space-x-1 mb-1">
                        <Sparkles className="h-3 w-3 text-purple-600" />
                        <span className="text-xs font-medium text-purple-600">AI</span>
                      </div>
                    )}
                    <p>{message.content}</p>
                  </div>
                </div>

                {/* Show offers */}
                {message.offers && (
                  <div className="mt-2 space-y-2">
                    {message.offers.map(offer => (
                      <div key={offer.id} className="bg-gray-50 rounded-lg p-2">
                        <div className="flex items-center space-x-2">
                          <img
                            src={offer.images[0]}
                            alt={offer.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">
                              {offer.title}
                            </h4>
                            <p className="text-xs text-gray-600">{offer.destination}</p>
                            <p className="text-xs font-bold text-blue-600">
                              {offer.price.toLocaleString('pl-PL')} zł
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Loader className="h-3 w-3 animate-spin text-purple-600" />
                    <span className="text-xs text-gray-600">Myślę...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Zadaj pytanie..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAIAssistant;