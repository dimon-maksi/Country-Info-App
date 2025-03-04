import { Module } from '@nestjs/common';
import { UserCalendarService } from './user-calendar.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCalendar, UserCalendarSchema } from 'src/public/schema/user-calendar.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserCalendar.name, schema: UserCalendarSchema }])],
    providers: [UserCalendarService],
    exports: [UserCalendarService],
  })
export class UserCalendarModule {}
