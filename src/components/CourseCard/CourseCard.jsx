import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/kurs/${course.id}`} className="course-card">
      <div>
        <div className="course-image-container">
          <img src={course.image} className="course-image" />
        </div>
        <div className="course-content">
          <h3>{course.title}</h3>
          <p className="course-duration">⏱️ {course.duration}</p>
          <span className="course-category">{course.category}</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
