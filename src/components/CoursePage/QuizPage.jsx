import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courses from '../../data/courses.json';
import CourseSidebar from './CourseSidebar';
import './CoursePage.css';

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = parseInt(id);
  const course = courses.find(c => c.id === courseId);

  const [readLessons, setReadLessons] = useState({});
  const storedResult = localStorage.getItem(`quizResult-${courseId}`);
  const quizFinished = !!storedResult;

  useEffect(() => {
    const stored = localStorage.getItem(`readLessons-${courseId}`);
    if (stored) {
      setReadLessons(JSON.parse(stored));
    }
  }, [courseId]);

  if (!course) {
    return <div className="course-not-found">❌ Kurs nie został znaleziony</div>;
  }

  //Jeśli quiz zakończony
  if (quizFinished) {
    const result = JSON.parse(storedResult);
    const { questions = [], userAnswers = {} } = result;

    return (
      <div className="course-layout">
        <CourseSidebar />
        <main className="course-content">
          <h1>📊 Quiz zakończony</h1>
          <p><strong>Wynik:</strong> {result.score} / {result.total} punktów</p>
          <p><strong>Skuteczność:</strong> {result.percent}%</p>
          <p><strong>Data ukończenia:</strong> {new Date(result.date).toLocaleString()}</p>

          <hr style={{ margin: '2rem 0' }} />
          <h2>📋 Twoje odpowiedzi</h2>

          {questions.map((q, idx) => {
            const userAnswer = userAnswers[q.id] || [];
            const correctAnswers = q.correct || [];

            const isCorrect =
              userAnswer.length === correctAnswers.length &&
              userAnswer.every((val) => correctAnswers.includes(val));

            return (
              <div key={q.id} className="quiz-question" style={{ marginBottom: '2rem' }}>
                <div className="quiz-question-header">
                  Pytanie nr {idx + 1}
                  <span className="points">{q.points} pkt</span>
                </div>
                <div className="quiz-question-body">
                  <p className="question-text">{q.question}</p>
                  <ul className="quiz-options">
                    {q.answers.map((option, i) => {
                      const isSelected = userAnswer.includes(i);
                      const isCorrectAnswer = correctAnswers.includes(i);
                      const isWrong = isSelected && !isCorrectAnswer;

                      return (
                        <li key={i}>
                          <label style={{
                            fontWeight: isCorrectAnswer ? 'bold' : 'normal',
                            color: isWrong ? 'red' : isCorrectAnswer ? 'green' : undefined
                          }}>
                            <input
                              type="checkbox"
                              readOnly
                              checked={isSelected}
                              style={{ marginRight: '8px' }}
                            />
                            {option}
                            {isCorrectAnswer && !isSelected && (
                              <span style={{ marginLeft: '8px', color: 'green' }}>(poprawna)</span>
                            )}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  <div>
                    <strong>Status:</strong>{' '}
                    {isCorrect ? (
                      <span style={{ color: 'green' }}>✅ Poprawna odpowiedź</span>
                    ) : (
                      <span style={{ color: 'red' }}>❌ Błąd</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    );
  }

  //Jeśli quiz niezakończony
  const allLessons = course.modules.flatMap((m, modIdx) =>
    m.lessons.map((_, lessonIdx) => `${modIdx}-${lessonIdx}`)
  );

  const completedLessons = allLessons.filter(key => readLessons[key]);
  const allCompleted = completedLessons.length === allLessons.length;

  const handleStartQuiz = () => {
    navigate(`/kurs/${id}/quiz/pytania`);
  };

  return (
    <div className="course-layout">
      <CourseSidebar />
      <main className="course-content">
        <h1>🧠 Quiz końcowy</h1>

        {!allCompleted ? (
          <div className="quiz-lock">
            <p>🔒 Musisz najpierw ukończyć wszystkie lekcje, zanim rozpoczniesz quiz.</p>
            <p>✅ Ukończone: {completedLessons.length} / {allLessons.length}</p>
          </div>
        ) : (
          <div className="quiz-ready">
            <p>✅ Gratulacje! Ukończyłeś wszystkie lekcje.</p>
            <p>📋 Ten quiz składa się z <strong>{course.quiz.questions.length} pytań</strong>. Będziesz miał <strong>1 szansę</strong>.</p>
            <button onClick={handleStartQuiz} className="button-primary">
              Rozpocznij quiz
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizPage;
