import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCalendar, UserCalendarDocument } from 'src/public/schema/user-calendar.schema';
import { IUserCalendarService } from './user-calendar.interface';
import { Logger } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserCalendarService implements IUserCalendarService {
    private readonly logger = new Logger(UserCalendarService.name);

    constructor(@InjectModel(UserCalendar.name) private userCalendarModel: Model<UserCalendarDocument>) {}

    async create(userId: string, countryCode: string, year: number, holidays: string[]): Promise<UserCalendar> {
        try {
            const existingUserCalendar = await this.userCalendarModel.findOne({ userId, year }).exec();

            if (existingUserCalendar) {
                const uniqueHolidays = Array.from(new Set([...existingUserCalendar.holidays, ...holidays]));
                existingUserCalendar.holidays = uniqueHolidays;
                return existingUserCalendar.save();
            } else {
                const newUserCalendar = new this.userCalendarModel({ userId, countryCode, year, holidays });
                return newUserCalendar.save();
            }
        } catch (error) {
            this.logger.error(`Failed to create or update user calendar for userId: ${userId}, year: ${year}`, error.stack);
            throw new HttpException('Failed to create or update user calendar', HttpStatus.BAD_REQUEST);
        }
    }
}