import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CountryService } from './country/country.service';
import { Country, CountryInfo } from './public/model/country';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly countryService: CountryService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('country/available')
  async getCountries(): Promise<Country[]> {
    return this.countryService.getAvailableCountries();
  }

  @Get('country/info/:countryCode')
  async getCountryInfo(@Param('countryCode')countryCode: string): Promise<CountryInfo> {
    return this.countryService.getCountryInfo(countryCode);
  }
}
