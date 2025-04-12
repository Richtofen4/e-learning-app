import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './CoursePage.css';

const CourseSidebar = () => {
  const { id } = useParams();

  return (
    <aside className="sidebar">
      <div className="sidebar-links">
        <ul>
          <li>
            <NavLink
              to={`/kurs/${id}`}
              end
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              Strona główna
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/kurs/${id}/modul`}
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              Moduły
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/kurs/${id}/quiz`}
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            >
              Quiz
            </NavLink>
          </li>
        </ul>

        <NavLink to="/" className="back-to-main">
          ← Powrót do strony głównej
        </NavLink>
      </div>
    </aside>
  );
};

export default CourseSidebar;
