import { Injectable } from '@nestjs/common';
import { CreateUser } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class usersService {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<User>,
  ) {}

  async signUp(data: CreateUser): Promise<User> {
    try {
      const securePassword = validator.escape(data.password);
      const hashedPassword = await bcrypt.hash(securePassword, 10);
      const secureData = {
        name: validator.escape(data.name),
        email: validator.normalizeEmail(data.email),
        password: hashedPassword,
        role: data.role.toLowerCase(),
      };
      const newUser = new this._userModel(secureData);
      return await newUser.save();
    } catch (error) {
      throw new Error(`sign up failed: ${error}`);
    }
  }

  async findAllUsers(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<[User[], number]> {
    const totalUsers = await this._userModel.countDocuments().exec();
    const getUsers = await this._userModel
    .find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec();
    return [getUsers, totalUsers];
  }
}
