import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courses from '../../data/courses.json';
import './CoursePage.css';

const QuizQuestions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === parseInt(id));
  const [answers, setAnswers] = useState({});

  if (!course?.quiz || !Array.isArray(course.quiz.questions)) {
    return <div className="quiz-not-found">❌ Quiz nie został znaleziony.</div>;
  }

  const handleChange = (questionId, optionIndex, isMultiple) => {
    setAnswers(prev => {
      if (isMultiple) {
        const current = prev[questionId] || [];
        const updated = current.includes(optionIndex)
          ? current.filter(i => i !== optionIndex)
          : [...current, optionIndex];
        return { ...prev, [questionId]: updated };
      } else {
        return { ...prev, [questionId]: [optionIndex] };
      }
    });
  };

  const handleSubmit = () => {
    const total = course.quiz.questions.reduce((sum, q) => sum + (q.points || 1), 0);
    let score = 0;

    course.quiz.questions.forEach((q) => {
      const userAnswer = answers[q.id] || [];
      const correct =
        Array.isArray(q.correct) &&
        Array.isArray(userAnswer) &&
        q.correct.length === userAnswer.length &&
        q.correct.every(val => userAnswer.includes(val));

      if (correct) score += q.points || 1;
    });

    const result = {
      score,
      total,
      percent: Math.round((score / total) * 100),
      date: new Date().toISOString(),
      questions: course.quiz.questions,
      userAnswers: answers
    };

    localStorage.setItem(`quizResult-${id}`, JSON.stringify(result));
    navigate(`/kurs/${id}/quiz`);
  };

  return (
    <div className="quiz-questions">
      {course.quiz.questions.map((q, index) => {
        const selected = answers[q.id] || [];
        const isMultiple = Array.isArray(q.correct) && q.correct.length > 1;

        return (
          <div key={q.id} className="quiz-question">
            <div className="quiz-question-header">
              Pytanie nr {index + 1}
              <span className="points">{q.points || 1} pkt</span>
            </div>

            <div className="quiz-question-body">
              <p className="question-text">{q.question || 'Brak treści pytania.'}</p>
              <ul className="quiz-options">
                {(q.answers || []).map((option, idx) => (
                  <li key={idx}>
                    <label>
                      <input
                        type={isMultiple ? 'checkbox' : 'radio'}
                        name={`question-${q.id}`}
                        value={idx}
                        checked={selected.includes(idx)}
                        onChange={() => handleChange(q.id, idx, isMultiple)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}

      <button className="button-primary" onClick={handleSubmit}>
        Zakończ test
      </button>
    </div>
  );
};

export default QuizQuestions;
