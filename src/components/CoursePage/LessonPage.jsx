import React from 'react';
import { useParams } from 'react-router-dom';
import courses from '../../data/courses.json';
import './CoursePage.css';
import CourseSidebar from './CourseSidebar';

const LessonPage = () => {
  const { id, moduleId, lessonId } = useParams();

  const course = courses.find((c) => c.id === parseInt(id));
  const moduleIndex = parseInt(moduleId) - 1;
  const lessonIndex = parseInt(lessonId) - 1;

  const module = course?.modules?.[moduleIndex];
  const lesson = module?.lessons?.[lessonIndex];

  if (!course || !module || !lesson) {
    return <div style={{ padding: "2rem" }}>🔍 Nie znaleziono lekcji.</div>;
  }

  return (
    <div className="course-layout">
      <CourseSidebar />

      <main className="course-content">
        <div className="lesson-page">
          <h1>{lesson.title}</h1>
          <h3>{course.title} – {module.title}</h3>
          <div
            className="lesson-content"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </div>
      </main>
    </div>
  );
};

export default LessonPage;
