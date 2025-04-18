export interface CountryInfo {
  lat: number;
  long: number;
}


export interface CountryData {
  country: string;
  cases: number;
  deaths: number;
  recovered: number;
  countryInfo: CountryInfo;
} 