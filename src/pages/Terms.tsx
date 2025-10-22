import React from 'react';
import { FileText, AlertTriangle, CreditCard, Plane, Shield, Scale } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Regulamin Serwisu</h1>
            <p className="text-gray-600">Ostatnia aktualizacja: 1 stycznia 2024</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Scale className="h-6 w-6 text-blue-600 mr-2" />
                1. Postanowienia ogólne
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Niniejszy Regulamin określa zasady korzystania z serwisu internetowego TravelPL 
                  dostępnego pod adresem travel.pl oraz świadczenia usług turystycznych przez 
                  TravelPL Sp. z o.o.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">Organizator:</p>
                    <p className="text-gray-700">TravelPL Sp. z o.o.</p>
                    <p className="text-gray-700">ul. Podróżnicza 123</p>
                    <p className="text-gray-700">00-001 Warszawa</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dane rejestrowe:</p>
                    <p className="text-gray-700">NIP: 1234567890</p>
                    <p className="text-gray-700">REGON: 123456789</p>
                    <p className="text-gray-700">KRS: 0000123456</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Definicje</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold text-gray-900">Serwis</p>
                    <p className="text-gray-600 text-sm">Portal internetowy travel.pl</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-semibold text-gray-900">Użytkownik</p>
                    <p className="text-gray-600 text-sm">Osoba korzystająca z serwisu</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="font-semibold text-gray-900">Klient</p>
                    <p className="text-gray-600 text-sm">Osoba dokonująca rezerwacji</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <p className="font-semibold text-gray-900">Impreza turystyczna</p>
                    <p className="text-gray-600 text-sm">Pakiet usług turystycznych</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <p className="font-semibold text-gray-900">Rezerwacja</p>
                    <p className="text-gray-600 text-sm">Zamówienie imprezy turystycznej</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="font-semibold text-gray-900">Voucher</p>
                    <p className="text-gray-600 text-sm">Dokument potwierdzający rezerwację</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Plane className="h-6 w-6 text-blue-600 mr-2" />
                3. Zasady rezerwacji
              </h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Proces rezerwacji:</h3>
                  <ol className="list-decimal list-inside text-green-800 space-y-1 text-sm">
                    <li>Wybór oferty i terminu</li>
                    <li>Wypełnienie formularza rezerwacyjnego</li>
                    <li>Potwierdzenie warunków i regulaminu</li>
                    <li>Dokonanie płatności lub wpłaty zaliczki</li>
                    <li>Otrzymanie potwierdzenia rezerwacji</li>
                  </ol>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Ważne informacje:
                  </h3>
                  <ul className="list-disc list-inside text-yellow-800 space-y-1 text-sm">
                    <li>Rezerwacja jest wiążąca po dokonaniu płatności</li>
                    <li>Ceny mogą ulec zmianie do momentu potwierdzenia</li>
                    <li>Dostępność miejsc nie jest gwarantowana do momentu płatności</li>
                    <li>Wymagane są ważne dokumenty podróży</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
                4. Płatności i ceny
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Formy płatności:</h3>
                    <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                      <li>Karta płatnicza (Visa, Mastercard)</li>
                      <li>Przelew bankowy</li>
                      <li>Płatności ratalne (0% dla wybranych ofert)</li>
                      <li>Płatność w biurze (gotówka, karta)</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Terminy płatności:</h3>
                    <ul className="list-disc list-inside text-purple-800 text-sm space-y-1">
                      <li>Zaliczka: 30% wartości przy rezerwacji</li>
                      <li>Dopłata: 30 dni przed wyjazdem</li>
                      <li>Last Minute: 100% przy rezerwacji</li>
                      <li>Usługi dodatkowe: przy rezerwacji</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-900 mb-2">Ceny zawierają:</h3>
                    <ul className="list-disc list-inside text-red-800 text-sm space-y-1">
                      <li>Transport zgodny z opisem</li>
                      <li>Zakwaterowanie w wybranym hotelu</li>
                      <li>Wyżywienie zgodne z ofertą</li>
                      <li>Ubezpieczenie turystyczne</li>
                      <li>Opiekę pilota (dla wycieczek grupowych)</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-900 mb-2">Ceny nie zawierają:</h3>
                    <ul className="list-disc list-inside text-orange-800 text-sm space-y-1">
                      <li>Dopłat za pokoje jednoosobowe</li>
                      <li>Wycieczek fakultatywnych</li>
                      <li>Napojów (jeśli nie objęte wyżywieniem)</li>
                      <li>Opłat klimatycznych i lokalnych</li>
                      <li>Kosztów wizy (jeśli wymagana)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Rezygnacja i anulowanie</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Opłaty za rezygnację (% wartości imprezy):</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-green-100 rounded">
                      <span className="text-green-800 text-sm">Do 60 dni przed wyjazdem</span>
                      <span className="font-semibold text-green-900">10%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-yellow-100 rounded">
                      <span className="text-yellow-800 text-sm">59-30 dni przed wyjazdem</span>
                      <span className="font-semibold text-yellow-900">30%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-100 rounded">
                      <span className="text-orange-800 text-sm">29-14 dni przed wyjazdem</span>
                      <span className="font-semibold text-orange-900">50%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-red-100 rounded">
                      <span className="text-red-800 text-sm">13-7 dni przed wyjazdem</span>
                      <span className="font-semibold text-red-900">80%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-200 rounded">
                      <span className="text-red-800 text-sm">6-1 dni przed wyjazdem</span>
                      <span className="font-semibold text-red-900">90%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-300 rounded">
                      <span className="text-red-800 text-sm">W dniu wyjazdu i później</span>
                      <span className="font-semibold text-red-900">100%</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  * Dla ofert Last Minute obowiązują odrębne warunki anulowania
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                6. Ubezpieczenia
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Ubezpieczenie podstawowe (w cenie):</h3>
                  <ul className="list-disc list-inside text-green-800 text-sm space-y-1">
                    <li>Koszty leczenia do 50.000 EUR</li>
                    <li>Transport medyczny</li>
                    <li>Odpowiedzialność cywilna</li>
                    <li>Bagaż podróżny do 1.000 EUR</li>
                    <li>Następstwa nieszczęśliwych wypadków</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Ubezpieczenie rozszerzone (opcjonalnie):</h3>
                  <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                    <li>Koszty leczenia do 100.000 EUR</li>
                    <li>Rezygnacja z podróży</li>
                    <li>Skrócenie pobytu</li>
                    <li>Opóźnienie lotu</li>
                    <li>Sporty ekstremalne</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Reklamacje</h2>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Zasady składania reklamacji:</h3>
                    <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1">
                      <li>Termin: 30 dni od zakończenia imprezy</li>
                      <li>Forma: pisemna (e-mail, poczta, osobiście)</li>
                      <li>Zawartość: szczegółowy opis problemu</li>
                      <li>Załączniki: dokumenty, zdjęcia, świadkowie</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Rozpatrywanie reklamacji:</h3>
                    <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1">
                      <li>Czas rozpatrzenia: do 30 dni</li>
                      <li>Odpowiedź: pisemna z uzasadnieniem</li>
                      <li>Możliwe rozwiązania: zwrot, voucher, powtórna usługa</li>
                      <li>Odwołanie: sąd lub mediacja</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Odpowiedzialność</h2>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">Organizator nie odpowiada za:</h3>
                  <ul className="list-disc list-inside text-red-800 text-sm space-y-1">
                    <li>Szkody wynikające z nieprzestrzegania regulaminu</li>
                    <li>Utratę lub uszkodzenie bagażu przez przewoźnika</li>
                    <li>Opóźnienia lotów z przyczyn niezależnych</li>
                    <li>Szkody powstałe z winy uczestnika</li>
                    <li>Działania osób trzecich</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Ograniczenia odpowiedzialności:</h3>
                  <p className="text-blue-800 text-sm">
                    Odpowiedzialność organizatora jest ograniczona do wysokości ceny imprezy turystycznej, 
                    z wyłączeniem szkód na osobie, za które organizator odpowiada bez ograniczeń.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Postanowienia końcowe</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy 
                  Kodeksu Cywilnego oraz ustawy o imprezach turystycznych i powiązanych usługach turystycznych.
                </p>
                <p className="text-gray-700">
                  Wszelkie spory będą rozstrzygane przez sąd właściwy dla siedziby organizatora.
                </p>
                <p className="text-gray-700">
                  Regulamin wchodzi w życie z dniem publikacji i obowiązuje do odwołania.
                </p>
              </div>
            </section>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Kontakt w sprawie regulaminu:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-800">📧 regulamin@travel.pl</p>
                  <p className="text-blue-800">📞 +48 123 456 789</p>
                </div>
                <div>
                  <p className="text-blue-800">🏢 ul. Podróżnicza 123, 00-001 Warszawa</p>
                  <p className="text-blue-800">🕒 Pon-Pt: 9:00-17:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;