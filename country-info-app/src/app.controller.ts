import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CountryService } from './country/country.service';
import { Country, CountryInfo } from './public/model/country';
import { User } from './public/schema/user.schema';
import { UserService } from './user/user.service';
import { UserCalendarService } from './user-calendar/user-calendar.service';
import { UserCalendar } from './public/schema/user-calendar.schema';

@Controller()
export class AppController {
  constructor(private readonly countryService: CountryService, private readonly userService: UserService, private readonly userCalendarService: UserCalendarService) {}

  @Get('country/available')
  async getCountries(): Promise<Country[]> {
    return this.countryService.getAvailableCountries();
  }

  @Get('country/info/:countryCode')
  async getCountryInfo(@Param('countryCode')countryCode: string): Promise<CountryInfo> {
    return this.countryService.getCountryInfo(countryCode);
  }
  
  @Post('user/:userid/calendar')
  async createUserCalendar(
    @Param('userId') userId: string,
    @Body('countryCode') countryCode: string,
    @Body('year') year: number,
    @Body('holidays') holidays: string[],
  ): Promise<UserCalendar> {
    return this.userCalendarService.create(userId, countryCode, year, holidays);
  }

  @Post('user/:userId')
  async createUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.create(userId);
  }
}
