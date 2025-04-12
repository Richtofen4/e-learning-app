import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import courses from '../../data/courses.json';

import CourseHome from './CourseHome';
import CourseModules from './CourseModules';
import CourseSidebar from './CourseSidebar';

import './CoursePage.css';

const CoursePage = () => {
  const { id } = useParams();
  const courseId = parseInt(id);
  const course = courses.find((c) => parseInt(c.id) === courseId);
  const [activeTab, setActiveTab] = useState('home');

  if (!course) {
    return <div style={{ padding: '2rem', color: 'red' }}>❌ Kurs nie został znaleziony.</div>;
  }

  return (
    <div className="course-layout">
      <CourseSidebar
        courseId={courseId}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="course-content">
        {activeTab === 'home' && <CourseHome course={course} />}
        {activeTab === 'modules' && <CourseModules course={course} />}
      </main>
    </div>
  );
};

export default CoursePage;
