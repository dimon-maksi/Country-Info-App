import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { CountryService } from './country/country.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), CountryModule],
  controllers: [AppController],
  providers: [AppService, CountryService],
})
export class AppModule {}
