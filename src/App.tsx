import React, { useState, useEffect } from 'react';
import { CountryData } from './types';
import { fetchCountries } from './services/covidService';
import Map from './components/Map';
import './App.css';

const App: React.FC = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCases, setTotalCases] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        
        // Calculate totals
        const cases = data.reduce((sum, country) => sum + country.cases, 0);
        const deaths = data.reduce((sum, country) => sum + country.deaths, 0);
        const recovered = data.reduce((sum, country) => sum + country.recovered, 0);

        setTotalCases(cases);
        setTotalDeaths(deaths);
        setTotalRecovered(recovered);
        setLoading(false);
      } catch (err) {
        setError('Failed to load COVID-19 data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading COVID-19 data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>
          COVID-19 Global Dashboard
    
        </h1>
        <div className="stats-container">
          <div className="stat-card cases">
            <div className="stat-icon">🦠</div>
            <h3 className='stat-text'>Total Cases</h3>
            <p className="stat-number">{totalCases.toLocaleString()}</p>
          </div>
          <div className="stat-card deaths">
            <div className="stat-icon">💀</div>
            <h3 className='stat-text'>Total Deaths</h3>
            <p className="stat-number">{totalDeaths.toLocaleString()}</p>
          </div>
          <div className="stat-card recovered">
            <div className="stat-icon">❤️</div>
            <h3 className='stat-text'>Total Recovered</h3>
            <p className="stat-number">{totalRecovered.toLocaleString()}</p>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="map">
          <Map countries={countries} />
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Cases</th>
                <th>Deaths</th>
                <th>Recovered</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr key={country.country}>
                  <td>{country.country}</td>
                  <td>{country.cases.toLocaleString()}</td>
                  <td>{country.deaths.toLocaleString()}</td>
                  <td>{country.recovered.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">Created with ❤️ by Rubai Mandal</p>
          
        </div>
      </footer>
    </div>
  );
};

export default App; 