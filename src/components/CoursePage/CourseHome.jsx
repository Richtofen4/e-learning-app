import React from 'react';

const CourseHome = ({ course }) => {
  if (!course) return <p>Ładowanie kursu...</p>;

  return (
    <div className="course-home">
      <h2>{course.title}</h2>
      <p>{course.welcomeMessage}</p>

      {course.objectives && course.objectives.length > 0 && (
        <>
          <h3>Czego się nauczysz:</h3>
          <ul>
            {course.objectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </>
      )}

      {course.modules && course.modules.length > 0 && (
        <>
          <h3>Moduły kursu:</h3>
          <ul>
            {course.modules.map((mod, idx) => (
              <li key={idx}>
                <strong>Moduł {idx + 1}:</strong> {mod.title}
                <ul>
                  {mod.lessons.map((lesson, j) => (
                    <li key={j}>{lesson.title}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CourseHome;
