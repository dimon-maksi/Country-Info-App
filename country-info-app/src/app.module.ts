import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CountryModule } from './country/country.module';
import { CountryService } from './country/country.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserCalendarModule } from './user-calendar/user-calendar.module';
import { UserService } from './user/user.service';
import { UserCalendarService } from './user-calendar/user-calendar.service';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/default'), CountryModule, UserCalendarModule, UserModule],
  controllers: [AppController],
  providers: [CountryService, UserCalendarService, UserService],
})
export class AppModule {}
