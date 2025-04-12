import React from 'react';
import { useParams } from 'react-router-dom';
import courses from '../../data/courses.json';
import CourseSidebar from './CourseSidebar';
import CourseModules from './CourseModules';
import './CoursePage.css';

const ModulePage = () => {
  const { id } = useParams();
  const course = courses.find((c) => parseInt(c.id) === parseInt(id));

  if (!course) {
    return <div style={{ padding: '2rem', color: 'red' }}>❌ Nie znaleziono kursu.</div>;
  }

  return (
    <div className="course-layout">
      <CourseSidebar courseId={id} />
      <main className="course-content">
        <CourseModules course={course} />
      </main>
    </div>
  );
};

export default ModulePage;
