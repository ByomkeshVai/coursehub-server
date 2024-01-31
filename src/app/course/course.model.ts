import { Schema, UpdateQuery, model } from 'mongoose';
import { CourseModel, TCourse, TDetails, TTag } from './course.interface';

const tagSchema = new Schema<TTag>({
  name: { type: String, required: [true, 'Tag Name is required'] },
  isDeleted: { type: Boolean, default: false },
});

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: [true, 'level is required'],
  },
  description: { type: String, required: [true, 'Description is required'] },
});

const courseSchema = new Schema<TCourse, CourseModel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
    },
    instructor: { type: String, required: [true, 'instructor is required'] },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'category Id is required'],
    },
    price: { type: Number, required: [true, 'price Id is required'] },
    tags: [tagSchema],
    startDate: { type: String, required: [true, 'startDate is required'] },
    endDate: { type: String, required: [true, 'endDate required'] },
    language: { type: String, required: [true, 'language is required'] },
    provider: { type: String, required: [true, 'provider is required'] },
    durationInWeeks: { type: Number },
    details: detailsSchema,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

courseSchema.pre('save', async function (next) {
  try {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    const durationInWeeks = Math.ceil(
      timeDifference / (1000 * 60 * 60 * 24 * 7),
    );

    this.durationInWeeks = durationInWeeks;

    next();
  } catch (error: any) {
    next(error);
  }
});

courseSchema.pre(['findOneAndUpdate', 'updateOne'], async function (next) {
  try {
    const update = this.getUpdate() as UpdateQuery<TCourse>;
    const { startDate, endDate } = update;

    if (startDate || endDate) {
      const existingCourse = await Course.findById(this.getQuery());

      if (existingCourse) {
        const newStartDate = startDate || existingCourse.startDate;
        const newEndDate = endDate || existingCourse.endDate;

        const timeDifference = Math.abs(
          new Date(newEndDate).getTime() - new Date(newStartDate).getTime(),
        );
        const durationInWeeks = Math.ceil(
          timeDifference / (1000 * 60 * 60 * 24 * 7),
        );

        this.set('durationInWeeks', durationInWeeks);
      }
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

courseSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.details._id;
    const removeIds = (obj: Record<string, any>) => {
      if (obj instanceof Array) {
        obj.forEach(removeIds);
      } else if (obj && typeof obj === 'object') {
        delete obj._id;
        Object.keys(obj).forEach((key) => removeIds(obj[key]));
      }
    };

    removeIds(ret);

    return ret;
  },
});

export const Course = model<TCourse, CourseModel>('Course', courseSchema);
