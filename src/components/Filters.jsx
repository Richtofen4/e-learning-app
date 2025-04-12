import React, { useState } from 'react';

const czasOpcje = [
  "Mniej niż 1 godzina",
  "1-2 godziny",
  "2-3 godziny",
  "3-5 godzin",
  "Ponad 5 godzin"
];

const kategorieOpcje = [
  "Programowanie",
  "Cloud Computing",
  "Analityka",
  "Bazy danych",
  "DevOps"
];

const Filters = ({ onFilterChange }) => {
  const [czas, setCzas] = useState([]);
  const [kategorie, setKategorie] = useState([]);

  const handleCzasChange = (option) => {
    const updated = czas.includes(option)
      ? czas.filter(item => item !== option)
      : [...czas, option];
    setCzas(updated);
    onFilterChange({ czas: updated, kategorie });
  };

  const handleKategorieChange = (option) => {
    const updated = kategorie.includes(option)
      ? kategorie.filter(item => item !== option)
      : [...kategorie, option];
    setKategorie(updated);
    onFilterChange({ czas, kategorie: updated });
  };

  return (
    <div>
      <h3>Filtry</h3>

      <div className="filter-section">
        <strong>Czas trwania</strong>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {czasOpcje.map(option => (
            <li key={option}>
              <label>
                <input
                  type="checkbox"
                  checked={czas.includes(option)}
                  onChange={() => handleCzasChange(option)}
                />
                {' '}
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section" style={{ marginTop: '2rem' }}>
        <strong>Kategoria</strong>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {kategorieOpcje.map(option => (
            <li key={option}>
              <label>
                <input
                  type="checkbox"
                  checked={kategorie.includes(option)}
                  onChange={() => handleKategorieChange(option)}
                />
                {' '}
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filters;
