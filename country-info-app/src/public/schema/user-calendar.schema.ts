import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';


@Schema({ collection: 'user_calendars' })
export class UserCalendar {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  countryCode: string;

  @Prop({ required: true })
  year: number;

  @Prop({ type: [String], default: [] })
  holidays: string[];
}

export type UserCalendarDocument = HydratedDocument<UserCalendar>;
export const UserCalendarSchema = SchemaFactory.createForClass(UserCalendar);
