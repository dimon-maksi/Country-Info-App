import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/public/schema/user.schema';
import { IUserService } from './user.interface';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger(UserService.name);
  
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(username: string): Promise<User> {
        try {
            const existingUser = await this.userModel.findOne({ username }).exec();
            if (existingUser) {
                throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
            }
            const newUser = new this.userModel({ username });
            return await newUser.save();
        } catch (error) {
            this.logger.error(`Error creating user`, error);
            throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<User[]> {
      return this.userModel.find().exec();
    }
}
