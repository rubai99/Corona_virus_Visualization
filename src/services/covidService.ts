import axios from 'axios';
import { CountryData } from '../types';
import { covidData } from '../data';

const API_URL = 'https://disease.sh/v3/covid-19/countries';

export const fetchCovidData = async (): Promise<CountryData[]> => {
  try {
    const response = await axios.get<CountryData[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API, using local data:', error);
    return covidData;
  }
}; 