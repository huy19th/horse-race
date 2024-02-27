import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(data: User): Promise<UserDocument> {
    return this.userModel.create(data);
  }

  updateToken(address: string, accessToken: string): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate(
      { address },
      { accessToken },
      { returnOriginal: false, upsert: true },
    );
  }

  findByAddress(address: string): Promise<UserDocument> {
    return this.userModel.findOne({ address });
  }

  async removeAccessToken(address: string): Promise<void> {
    await this.userModel.updateOne({ address }, { accessToken: null });
  }
}
