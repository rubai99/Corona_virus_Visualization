import React, { useEffect, useState } from 'react';
import { CountryData } from './types';
import { fetchCovidData } from './services/covidService';
import StatsCard from './components/StatsCard';
import CountryList from './components/CountryList';
import Map from './components/Map';
import './App.css';

function App() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCovidData();
        setCountries(data);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const globalStats = countries.reduce(
    (acc, country) => ({
      totalCases: acc.totalCases + country.cases,
      totalDeaths: acc.totalDeaths + country.deaths,
      totalRecovered: acc.totalRecovered + country.recovered,
    }),
    { totalCases: 0, totalDeaths: 0, totalRecovered: 0 }
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="App">
      <header>
        <h1>COVID-19 Global Statistics</h1>
      </header>
      
      <div className="stats-container">
        <StatsCard
          title="Total Cases"
          value={globalStats.totalCases}
          icon="cases"
          color="#ff6b6b"
        />
        <StatsCard
          title="Total Deaths"
          value={globalStats.totalDeaths}
          icon="deaths"
          color="#495057"
        />
        <StatsCard
          title="Total Recovered"
          value={globalStats.totalRecovered}
          icon="recovered"
          color="#51cf66"
        />
      </div>

      <div className="map-container">
        <h2>Global Distribution</h2>
        <Map countries={countries} />
      </div>

      <div className="country-list-container">
        <h2>Country-wise Statistics</h2>
        <CountryList countries={countries} />
      </div>

      <footer className="app-footer">
        Made with ❤️ by Rubai Mandal
      </footer>
    </div>
  );
}

export default App;
