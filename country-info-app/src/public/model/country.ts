export interface Country {
    countryCode: string;
    name: string;
}

export interface Population {
    year: number;
    value: number;
}

export interface CountryInfo {
    borderCountries: Country[];
    population: Population[];
    flagUrl: string;
}
