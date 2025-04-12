import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CoursePage.css';

const CourseModules = ({ course }) => {
  const { id: courseId } = useParams();

  const [readLessons, setReadLessons] = useState(() => {
    const stored = localStorage.getItem(`readLessons-${courseId}`);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(`readLessons-${courseId}`, JSON.stringify(readLessons));
  }, [readLessons, courseId]);

  const toggleReadStatus = (modIdx, lessonIdx) => {
    const key = `${modIdx}-${lessonIdx}`;
    setReadLessons(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="modules-container">
      {course.modules?.map((mod, i) => (
        <div key={i} className="module-box">
          <div className="module-header">
            <span className="module-title">
              ▾ Moduł {i + 1}: {mod.title}
            </span>
          </div>
          <div className="module-lessons">
            {mod.lessons.map((lesson, j) => {
              const key = `${i}-${j}`;
              const isRead = readLessons[key];

              return (
                <div key={j} className="lesson-item">
                  <Link to={`/kurs/${courseId}/modul/${i + 1}/lekcja/${j + 1}`}>

  {lesson.title}
</Link>

                  <span
                    className="lesson-icon"
                    role="button"
                    aria-label="Zmień status przeczytania"
                    onClick={() => toggleReadStatus(i, j)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  >
                    {isRead ? '✅' : '❌'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseModules;
