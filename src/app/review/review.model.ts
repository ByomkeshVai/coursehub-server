import { Schema, model } from 'mongoose';
import TReview from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course Id is required'],
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: [true, 'Review is required'] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    versionKey: false,
  },
);

const Review = model<TReview>('Review', reviewSchema);

export default Review;
