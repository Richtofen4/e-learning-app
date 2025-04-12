import React, { useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';

import './CategorySection.css';

const CategorySection = ({ title, description, courses }) => {
  const [page, setPage] = useState(0);
  const perPage = 5;
  const totalPages = Math.ceil(courses.length / perPage);

  const paginatedCourses = courses.slice(page * perPage, (page + 1) * perPage);

  const prevPage = () => setPage((p) => Math.max(p - 1, 0));
  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  return (
    <div className="category-section">
      <div className="header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="courses-carousel">
        {paginatedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={page === 0}>
            ←
          </button>
          <span>
            {page + 1} / {totalPages}
          </span>
          <button onClick={nextPage} disabled={page === totalPages - 1}>
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySection;
