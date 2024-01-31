import { Types } from 'mongoose';

interface TReview {
  courseId: Types.ObjectId;
  rating: number;
  review: string;
  createdBy?: string | Types.ObjectId;
}

export default TReview;
