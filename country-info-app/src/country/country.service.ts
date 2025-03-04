import { Injectable } from '@nestjs/common';
import { ICountryService } from './country.service.interface';
import { Country, CountryInfo } from 'src/public/model/country';

@Injectable()
export class CountryService implements ICountryService {
    getAvailableCountries(): Promise<Country[]> {
        throw new Error('Method not implemented.');
    }
    getCountryInfo(countryCode: string): Promise<CountryInfo> {
        throw new Error('Method not implemented.');
    }
}
