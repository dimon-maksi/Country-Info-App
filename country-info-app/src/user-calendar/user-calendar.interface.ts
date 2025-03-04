import { UserCalendar } from "src/public/schema/user-calendar.schema";

export interface IUserCalendarService {
  create(userId: string, countryCode: string, year: number, holidays: string[]): Promise<UserCalendar>;
}
