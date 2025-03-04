import { Country, CountryInfo } from "src/public/model/country";

export interface ICountryService {
    getAvailableCountries(): Promise<Country[]>;
    getCountryInfo(countryCode: string): Promise<CountryInfo>;
}
