import exp from "constants";

export interface Country {
    countryCode: string;
    name: string;
}

export interface Population {
    year: number;
    value: number;
}

export interface PopulationCount{
    year: number;
    value: number;
}

export interface CountryInfo {
    borderCountries: Country[];
    population: Population[];
    flagUrl: string;
}

export interface CountryInfoDto {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: CountryInfoDto[];
}

export interface PopulationDto {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationCount[];
}

export interface FlagDto {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
}

export interface CountryInfoPopulationResponseDto {
    erroe: boolean;
    msg: string;
    data: PopulationDto[];
}

export interface CountryInfoFlagResponseDto {
    erroe: boolean;
    msg: string;
    data: FlagDto[];
}