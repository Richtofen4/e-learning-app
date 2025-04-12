1. Jak uruchomić projekt lokalnie

a) Przejdź do głównego katalogu projektu w terminalu

b) Zainstaluj zależności (tylko przy pierwszym uruchomieniu):

npm install

c) Uruchom aplikację:

npm start

d) Otwórz przeglądarkę i przejdź do adresu:

http://localhost:3000

2. Jak wyczyścić localStorage (do testów)

a) Otwórz stronę aplikacji w przeglądarc (http://localhost:3000)

b) Otwórz narzędzia deweloperskie (F12)

c) Przejdź do zakładki Console

d) Wklej poniższą komendę:
localStorage.clear();

3. Opis wyglądu projektu:

src/components/CategorySection/CategorySection.jsx
Odpowiada za wyświetlanie całej sekcji kategorii kursów na stronie głównej. Grupuje kursy według typu (np. programowanie, cloud) i renderuje je jako osobne sekcje z nagłówkiem.



src/components/CourseCard/CourseCard.jsx
Komponent odpowiedzialny za wygląd pojedynczej "karty" kursu – zawiera tytuł, kategorię, długość trwania i obrazek. Używany w widoku głównym do wyświetlania kursów.



src/components/CoursePage/CourseHome.jsx
Widok powitalny kursu – zawiera wprowadzenie oraz cele kursu.

src/components/CoursePage/CourseModules.jsx
Wyświetla wszystkie moduły w ramach danego kursu – pokazuje tytuły i opisy modułów.

src/components/CoursePage/CoursePage.jsx
Główny kontener strony kursu – zawiera komponenty takie jak sidebar, home i moduły w zależności od wybranej zakładki.

src/components/CoursePage/CourseSidebar.jsx
Sidebar nawigacyjny widoczny po lewej stronie kursu. Zawiera linki do sekcji: Strona główna, Moduły, Quiz, oraz powrót do strony głównej.

src/components/CoursePage/LessonPage.jsx
Wyświetla konkretną lekcję z modułu. Pokazuje tytuł, treść lekcji (HTML), obrazki, filmy, itd.

src/components/CoursePage/ModulePage.jsx
Wyświetla wszystkie lekcje z danego modułu – pokazuje, które są zakończone, a które nie.

src/components/CoursePage/QuizPage.jsx
Zarządza stanem quizu – sprawdza, czy można go rozpocząć (czy użytkownik ukończył lekcje) lub pokazuje podsumowanie, jeśli quiz został już zakończony.

src/components/CoursePage/QuizQuestions.jsx
Widok z pytaniami quizu. Użytkownik może zaznaczać odpowiedzi. Po zakończeniu quizu dane są zapisywane do localStorage.

src/components/CoursePage/Filters.jsx
Zawiera filtry widoczne na stronie głównej (czas trwania, kategoria). Odpowiada za filtrowanie kursów na żywo po kliknięciu.



src/data/courses.json
Główna baza danych kursów. Tutaj dodajesz nowy kurs w formacie JSON. Każdy kurs zawiera takie dane jak:

id – unikalny numer kursu

title – tytuł kursu

image – ścieżka do obrazka kursu (/images/nazwa.png)

duration – czas trwania

category – nazwa kategorii (np. Programowanie, Cloud Computing)

categoryGroup – klucz wewnętrzny używany do filtrowania (np. programowanie, cloud)

modules, quiz, welcomeMessage, objectives, itd.



public/images/
Katalog z obrazkami używanymi w kursach (np. do kart kursów). Wszystkie ścieżki w pliku courses.json odwołują się do tego folderu przez /images/nazwa.png.


4. Jak dodać nowy kurs

a) Otwórz plik: src/data/courses.json

b) Dodaj nowy obiekt JSON zgodnie z poniższym schematem:

{
  "id": 11,
  "title": "Tytuł kursu",
  "image": "/images/plik.png",
  "duration": "1-2 godziny",
  "category": "Programowanie",
  "categoryGroup": "programowanie"
}