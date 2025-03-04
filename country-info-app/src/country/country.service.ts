import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ICountryService } from './country.service.interface';
import { Country, CountryInfo, CountryInfoDto, CountryInfoFlagResponseDto, CountryInfoPopulationResponseDto, FlagDto, PopulationDto } from 'src/public/model/country';

@Injectable()
export class CountryService implements ICountryService {
    private readonly logger = new Logger(CountryService.name);

    async getAvailableCountries(): Promise<Country[]> {
        try {
            const nagerDateUri = `${process.env.NAGER_DATE_API_URL}/AvailableCountries`;
            const response = await axios.get<Country[]>(nagerDateUri);
            return response.data;
        } catch (error) {
            this.logger.error('Failed to fetch countries', error);
            throw new HttpException('Failed to fetch countries', HttpStatus.BAD_REQUEST);
        }
    }

    async getCountryInfo(countryCode: string): Promise<CountryInfo> {
        try {
            if (!countryCode) {
                throw new HttpException('Country code is required', HttpStatus.BAD_REQUEST);
            }

            const nagerDateUri = `${process.env.NAGER_DATE_API_URL}/CountryInfo/${countryCode}`;
            const borderCountriesResponse = await axios.get<CountryInfoDto>(nagerDateUri);
            const borderCountries: Country[] = borderCountriesResponse.data.borders.map((border: CountryInfoDto) => ({
                countryCode: border.countryCode,
                name: border.commonName,
            }));
            
            const countryName = borderCountriesResponse.data.commonName;
            
            // I hate the way I'm getting country population and flag by searching through the array
            // It can be improved by mapping country codes between the two APIs
            const countryPopulationUri = `${process.env.COUNTRY_INFO_API_URL}/countries/population`;
            const countryPopulationResponse = (await axios.get<CountryInfoPopulationResponseDto>(countryPopulationUri)).data.data;
            const countryPopulation = countryPopulationResponse.find((country: PopulationDto) => country.country === countryName)?.populationCounts;
            
            const countryFlagUri = `${process.env.COUNTRY_INFO_API_URL}/countries/flag/images`;
            const countryFlagResponse = (await axios.get<CountryInfoFlagResponseDto>(countryFlagUri)).data.data;
            const countryFlag = countryFlagResponse.find((flag: FlagDto) => flag.name === countryName)?.flag;
            
            const result: CountryInfo = {
                borderCountries: borderCountries,
                population: countryPopulation ?? [],
                flagUrl: countryFlag ?? ''
            }
            return result;
        } catch (error) {
            this.logger.error(`Failed to fetch country info for ${countryCode}`, error);
            throw new HttpException('Failed to fetch country info', HttpStatus.BAD_REQUEST);
        }
    }
}
