import React, { useState } from 'react';
import { Cookie, Settings, Eye, BarChart3, Target, Shield } from 'lucide-react';

const Cookies: React.FC = () => {
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: true,
    marketing: false,
    preferences: true
  });

  const handleSaveSettings = () => {
    // Here you would save the settings to localStorage or send to backend
    localStorage.setItem('cookieSettings', JSON.stringify(cookieSettings));
    alert('Ustawienia cookies zostały zapisane!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cookie className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Polityka Cookies</h1>
            <p className="text-gray-600">Ostatnia aktualizacja: 1 stycznia 2024</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Czym są cookies?</h2>
              <div className="bg-orange-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Cookies to małe pliki tekstowe, które są zapisywane na Państwa urządzeniu podczas 
                  odwiedzania naszej strony internetowej. Pomagają nam zapewnić lepsze doświadczenia 
                  użytkownika, analizować ruch na stronie i personalizować treści.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-orange-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Eye className="h-6 w-6 text-orange-800" />
                    </div>
                    <h3 className="font-semibold text-orange-900">Funkcjonalne</h3>
                    <p className="text-orange-800 text-sm">Zapamiętują Twoje preferencje</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <BarChart3 className="h-6 w-6 text-orange-800" />
                    </div>
                    <h3 className="font-semibold text-orange-900">Analityczne</h3>
                    <p className="text-orange-800 text-sm">Pomagają zrozumieć użytkowników</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Target className="h-6 w-6 text-orange-800" />
                    </div>
                    <h3 className="font-semibold text-orange-900">Marketingowe</h3>
                    <p className="text-orange-800 text-sm">Personalizują reklamy</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rodzaje cookies</h2>
              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="border border-green-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-900">Cookies niezbędne</h3>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Zawsze aktywne</span>
                      <input
                        type="checkbox"
                        checked={cookieSettings.necessary}
                        disabled
                        className="rounded border-gray-300"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Te cookies są niezbędne do prawidłowego funkcjonowania strony i nie można ich wyłączyć.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Przykłady:</h4>
                    <ul className="list-disc list-inside text-green-800 text-sm space-y-1">
                      <li>Sesja użytkownika i logowanie</li>
                      <li>Koszyk zakupów i proces rezerwacji</li>
                      <li>Ustawienia bezpieczeństwa</li>
                      <li>Preferencje językowe</li>
                    </ul>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-6 w-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-blue-900">Cookies analityczne</h3>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={cookieSettings.analytics}
                        onChange={(e) => setCookieSettings(prev => ({ ...prev, analytics: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Pomagają nam zrozumieć, jak użytkownicy korzystają z naszej strony, aby ją ulepszać.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Dostawcy:</h4>
                    <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                      <li>Google Analytics - analiza ruchu na stronie</li>
                      <li>Hotjar - mapy ciepła i nagrania sesji</li>
                      <li>Facebook Pixel - analiza konwersji</li>
                    </ul>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-purple-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Target className="h-6 w-6 text-purple-600" />
                      <h3 className="text-lg font-semibold text-purple-900">Cookies marketingowe</h3>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={cookieSettings.marketing}
                        onChange={(e) => setCookieSettings(prev => ({ ...prev, marketing: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Służą do wyświetlania spersonalizowanych reklam i śledzenia skuteczności kampanii.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Zastosowanie:</h4>
                    <ul className="list-disc list-inside text-purple-800 text-sm space-y-1">
                      <li>Remarketing - wyświetlanie reklam na innych stronach</li>
                      <li>Personalizacja treści reklamowych</li>
                      <li>Śledzenie konwersji z kampanii</li>
                      <li>Optymalizacja wydajności reklam</li>
                    </ul>
                  </div>
                </div>

                {/* Preferences Cookies */}
                <div className="border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Settings className="h-6 w-6 text-yellow-600" />
                      <h3 className="text-lg font-semibold text-yellow-900">Cookies preferencji</h3>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={cookieSettings.preferences}
                        onChange={(e) => setCookieSettings(prev => ({ ...prev, preferences: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Zapamiętują Państwa wybory i preferencje, aby zapewnić spersonalizowane doświadczenie.
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Funkcje:</h4>
                    <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1">
                      <li>Ulubione oferty i lista życzeń</li>
                      <li>Ostatnio przeglądane produkty</li>
                      <li>Preferencje wyświetlania (widok siatki/lista)</li>
                      <li>Ustawienia filtrów wyszukiwania</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Szczegółowa lista cookies</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Nazwa</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Typ</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Czas życia</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Cel</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">travel_session</td>
                      <td className="border border-gray-300 px-4 py-2">Niezbędne</td>
                      <td className="border border-gray-300 px-4 py-2">Sesja</td>
                      <td className="border border-gray-300 px-4 py-2">Identyfikacja sesji użytkownika</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-mono">user_preferences</td>
                      <td className="border border-gray-300 px-4 py-2">Preferencje</td>
                      <td className="border border-gray-300 px-4 py-2">1 rok</td>
                      <td className="border border-gray-300 px-4 py-2">Ustawienia użytkownika</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">_ga</td>
                      <td className="border border-gray-300 px-4 py-2">Analityczne</td>
                      <td className="border border-gray-300 px-4 py-2">2 lata</td>
                      <td className="border border-gray-300 px-4 py-2">Google Analytics - identyfikacja użytkownika</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-mono">_gid</td>
                      <td className="border border-gray-300 px-4 py-2">Analityczne</td>
                      <td className="border border-gray-300 px-4 py-2">24 godziny</td>
                      <td className="border border-gray-300 px-4 py-2">Google Analytics - identyfikacja sesji</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono">_fbp</td>
                      <td className="border border-gray-300 px-4 py-2">Marketingowe</td>
                      <td className="border border-gray-300 px-4 py-2">3 miesiące</td>
                      <td className="border border-gray-300 px-4 py-2">Facebook Pixel - śledzenie konwersji</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-mono">favorites</td>
                      <td className="border border-gray-300 px-4 py-2">Preferencje</td>
                      <td className="border border-gray-300 px-4 py-2">6 miesięcy</td>
                      <td className="border border-gray-300 px-4 py-2">Lista ulubionych ofert</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Zarządzanie cookies</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-4">Twoje ustawienia cookies:</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Cookies niezbędne</p>
                      <p className="text-sm text-gray-600">Wymagane do działania strony</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookieSettings.necessary}
                      disabled
                      className="rounded border-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Cookies analityczne</p>
                      <p className="text-sm text-gray-600">Pomagają ulepszać stronę</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookieSettings.analytics}
                      onChange={(e) => setCookieSettings(prev => ({ ...prev, analytics: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Cookies marketingowe</p>
                      <p className="text-sm text-gray-600">Personalizują reklamy</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookieSettings.marketing}
                      onChange={(e) => setCookieSettings(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Cookies preferencji</p>
                      <p className="text-sm text-gray-600">Zapamiętują Twoje wybory</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookieSettings.preferences}
                      onChange={(e) => setCookieSettings(prev => ({ ...prev, preferences: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSaveSettings}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Zapisz ustawienia
                </button>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Jak zarządzać cookies w przeglądarce</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Google Chrome</h3>
                    <p className="text-gray-700 text-sm">
                      Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie i inne dane witryn
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Mozilla Firefox</h3>
                    <p className="text-gray-700 text-sm">
                      Opcje → Prywatność i bezpieczeństwo → Pliki cookie i dane stron
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Safari</h3>
                    <p className="text-gray-700 text-sm">
                      Preferencje → Prywatność → Zarządzaj danymi witryn internetowych
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Microsoft Edge</h3>
                    <p className="text-gray-700 text-sm">
                      Ustawienia → Pliki cookie i uprawnienia witryny → Zarządzaj plikami cookie
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Konsekwencje wyłączenia cookies</h2>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Wyłączenie cookies analitycznych:</h3>
                    <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1">
                      <li>Brak wpływu na funkcjonalność strony</li>
                      <li>Nie będziemy mogli ulepszać serwisu</li>
                      <li>Brak danych o preferencjach użytkowników</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Wyłączenie cookies marketingowych:</h3>
                    <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1">
                      <li>Reklamy będą mniej dopasowane</li>
                      <li>Możesz widzieć te same reklamy wielokrotnie</li>
                      <li>Brak personalizacji treści reklamowych</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kontakt</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  W przypadku pytań dotyczących naszej polityki cookies, prosimy o kontakt:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700">📧 cookies@travel.pl</p>
                    <p className="text-gray-700">📞 +48 123 456 789</p>
                  </div>
                  <div>
                    <p className="text-gray-700">🏢 ul. Podróżnicza 123, 00-001 Warszawa</p>
                    <p className="text-gray-700">🕒 Pon-Pt: 9:00-17:00</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;