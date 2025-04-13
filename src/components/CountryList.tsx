import React from 'react';
import { CountryData } from '../types';

interface CountryListProps {
  countries: CountryData[];
}

const CountryList: React.FC<CountryListProps> = ({ countries }) => {
  return (
    <div className="country-list">
      <table>
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
  );
};

export default CountryList; 