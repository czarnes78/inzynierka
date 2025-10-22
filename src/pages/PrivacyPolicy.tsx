import React from 'react';
import { Shield, Eye, Lock, Database, Mail, Phone } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Polityka Prywatności</h1>
            <p className="text-gray-600">Ostatnia aktualizacja: 1 stycznia 2024</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 text-blue-600 mr-2" />
                1. Informacje ogólne
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych 
                użytkowników serwisu TravelPL, dostępnego pod adresem travel.pl, świadczonego przez 
                TravelPL Sp. z o.o. z siedzibą w Warszawie.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Administratorem Państwa danych osobowych jest TravelPL Sp. z o.o., ul. Podróżnicza 123, 
                00-001 Warszawa, NIP: 1234567890, REGON: 123456789.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 text-blue-600 mr-2" />
                2. Jakie dane zbieramy
              </h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Dane podawane dobrowolnie:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Imię i nazwisko</li>
                  <li>Adres e-mail</li>
                  <li>Numer telefonu</li>
                  <li>Adres zamieszkania</li>
                  <li>Data urodzenia</li>
                  <li>Preferencje podróży</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Dane zbierane automatycznie:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Adres IP</li>
                  <li>Typ przeglądarki i systemu operacyjnego</li>
                  <li>Czas i data wizyty</li>
                  <li>Odwiedzone strony</li>
                  <li>Źródło ruchu (skąd przyszedł użytkownik)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="h-6 w-6 text-blue-600 mr-2" />
                3. Cel przetwarzania danych
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Realizacja usług:</h3>
                  <ul className="list-disc list-inside text-green-800 text-sm space-y-1">
                    <li>Obsługa rezerwacji</li>
                    <li>Kontakt z klientem</li>
                    <li>Realizacja płatności</li>
                    <li>Wysyłka dokumentów podróży</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Marketing:</h3>
                  <ul className="list-disc list-inside text-purple-800 text-sm space-y-1">
                    <li>Newsletter z ofertami</li>
                    <li>Spersonalizowane rekomendacje</li>
                    <li>Badania satysfakcji</li>
                    <li>Programy lojalnościowe</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Podstawa prawna</h2>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium text-gray-900">Wykonanie umowy (art. 6 ust. 1 lit. b RODO)</p>
                  <p className="text-gray-600 text-sm">Przetwarzanie niezbędne do realizacji rezerwacji i świadczenia usług turystycznych</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium text-gray-900">Zgoda (art. 6 ust. 1 lit. a RODO)</p>
                  <p className="text-gray-600 text-sm">Marketing, newsletter, cookies analityczne</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <p className="font-medium text-gray-900">Prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO)</p>
                  <p className="text-gray-600 text-sm">Bezpieczeństwo serwisu, analityka, dochodzenie roszczeń</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Udostępnianie danych</h2>
              <p className="text-gray-700 mb-4">Państwa dane mogą być udostępniane następującym kategoriom odbiorców:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-yellow-900 mb-2">Partnerzy turystyczni</h3>
                  <p className="text-yellow-800 text-sm">Hotele, linie lotnicze, organizatorzy wycieczek</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-red-900 mb-2">Dostawcy płatności</h3>
                  <p className="text-red-800 text-sm">Operatorzy kart płatniczych, banki</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-indigo-900 mb-2">Dostawcy IT</h3>
                  <p className="text-indigo-800 text-sm">Hosting, systemy CRM, analityka</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Okres przechowywania</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Dane klientów:</h3>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Konta użytkowników: do usunięcia konta</li>
                      <li>• Historia rezerwacji: 10 lat (przepisy podatkowe)</li>
                      <li>• Dane płatności: zgodnie z wymogami bankowymi</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Dane marketingowe:</h3>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Newsletter: do wycofania zgody</li>
                      <li>• Cookies: zgodnie z polityką cookies</li>
                      <li>• Logi serwera: 12 miesięcy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Państwa prawa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Prawo dostępu</p>
                      <p className="text-gray-600 text-sm">Do swoich danych osobowych</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Prawo sprostowania</p>
                      <p className="text-gray-600 text-sm">Poprawiania nieprawidłowych danych</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Prawo usunięcia</p>
                      <p className="text-gray-600 text-sm">"Prawo do bycia zapomnianym"</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Prawo ograniczenia</p>
                      <p className="text-gray-600 text-sm">Przetwarzania danych</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Prawo przenoszenia</p>
                      <p className="text-gray-600 text-sm">Danych do innego administratora</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-gray-900">Prawo sprzeciwu</p>
                      <p className="text-gray-600 text-sm">Wobec przetwarzania danych</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Bezpieczeństwo</h2>
              <p className="text-gray-700 mb-4">Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Państwa danych:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Szyfrowanie</h3>
                  <p className="text-green-800 text-sm">SSL/TLS dla transmisji danych, szyfrowanie baz danych</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Kontrola dostępu</h3>
                  <p className="text-blue-800 text-sm">Autoryzacja, uwierzytelnianie, logi dostępu</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Kopie zapasowe</h3>
                  <p className="text-purple-800 text-sm">Regularne backupy, plan odzyskiwania danych</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="h-6 w-6 text-blue-600 mr-2" />
                9. Kontakt
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  W sprawach dotyczących ochrony danych osobowych można się kontaktować:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700">rodo@travel.pl</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700">+48 123 456 789</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  Mają Państwo również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Zmiany polityki</h2>
              <p className="text-gray-700">
                Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. 
                O wszelkich zmianach będziemy informować użytkowników za pośrednictwem serwisu 
                oraz poczty elektronicznej. Zmiany wchodzą w życie po upływie 14 dni od ich publikacji.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;