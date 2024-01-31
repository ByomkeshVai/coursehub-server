import { Types } from 'mongoose';

export interface TCategory {
  name: string;
  createdBy?: string | Types.ObjectId;
}
