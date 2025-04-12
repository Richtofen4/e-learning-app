import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CoursePage from './components/CoursePage/CoursePage';
import LessonPage from './components/CoursePage/LessonPage';
import ModulePage from './components/CoursePage/ModulePage';
import QuizPage from './components/CoursePage/QuizPage';
import QuizQuestions from './components/CoursePage/QuizQuestions';
import Filters from './components/Filters';
import CategorySection from './components/CategorySection/CategorySection';
import courses from './data/courses.json';
import './App.css';

function HomePage() {
  const [selectedDurations, setSelectedDurations] = React.useState([]);
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const handleFilterChange = ({ czas, kategorie }) => {
    setSelectedDurations(czas);
    setSelectedCategories(kategorie);
  };

  const filteredCourses = courses.filter((course) => {
    const matchDuration = selectedDurations.length === 0 || selectedDurations.includes(course.duration);
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
    return matchDuration && matchCategory;
  });

  const grouped = {
    "Programowanie": {
      title: "Programowanie",
      description: "Rozpocznij przygodę z frontendem i backendem.",
      courses: filteredCourses.filter(c => c.category === "Programowanie"),
    },
    "Cloud Computing": {
      title: "Cloud Computing",
      description: "Poznaj podstawy chmury i jej zastosowania.",
      courses: filteredCourses.filter(c => c.category === "Cloud Computing"),
    },
    "Analityka": {
      title: "Analityka",
      description: "Narzędzia i techniki pracy z danymi.",
      courses: filteredCourses.filter(c => c.category === "Analityka"),
    },
    "Bazy danych": {
      title: "Bazy danych",
      description: "Zrozum relacje, tabele i język SQL.",
      courses: filteredCourses.filter(c => c.category === "Bazy danych"),
    },
    "DevOps": {
      title: "DevOps",
      description: "Automatyzuj procesy, testuj i wdrażaj efektywnie.",
      courses: filteredCourses.filter(c => c.category === "DevOps"),
    }
  };  

  return (
    <>
      <header className="banner">
        <h1>Twoja przygoda z nauką zaczyna się tutaj</h1>
        <p>Niezależnie od celu, zebraliśmy najlepsze materiały, by pomóc Ci się rozwijać.</p>
      </header>

      <div className="content">
        <aside className="filters-panel">
          <Filters onFilterChange={handleFilterChange} />
        </aside>
        <main className="category-panel">
          {Object.values(grouped).map(
            (section, idx) =>
              section.courses.length > 0 && (
                <CategorySection
                  key={idx}
                  title={section.title}
                  description={section.description}
                  courses={section.courses}
                />
              )
          )}
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/kurs/:id" element={<CoursePage />} />
      <Route path="/kurs/:id/modul" element={<ModulePage />} />
      <Route path="/kurs/:id/modul/:moduleId/lekcja/:lessonId" element={<LessonPage />} />
      <Route path="/kurs/:id/quiz" element={<QuizPage />} />
      <Route path="/kurs/:id/quiz/pytania" element={<QuizQuestions />} />
    </Routes>
  );
}

export default App;
