import axios from 'axios';
import { CountryData } from '../types';
import { covidData } from '../data';

export const fetchCountries = async (): Promise<CountryData[]> => {
  try {
    const response = await axios.get<CountryData[]>('https://disease.sh/v3/covid-19/countries');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data from API, using fallback data:', error);
    return covidData;
  }
}; 