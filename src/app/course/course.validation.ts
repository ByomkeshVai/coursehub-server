import { z } from 'zod';

export const TagValidation = z.object({
  name: z.string(),
  isDeleted: z.boolean().default(false),
});


export const DetailsValidation = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string(),
});

export const CreateCourseValidationSchema = z.object({
  title: z.string(),
  instructor: z.string(),
  categoryId: z.string(),
  price: z.number(),
  tags: z.array(TagValidation),
  startDate: z.string(),
  endDate: z.string(),
  language: z.string(),
  provider: z.string(),
  durationInWeeks: z.number().optional(),
  details: DetailsValidation,
});



export const UpdateTagValidation = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
});


export const UpdateDetailsValidation = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z.string().optional(),
});
export const UpdateCourseValidationSchema = z.object({
  title: z.string().optional(),
  instructor: z.string().optional(),
  categoryId: z.string().optional(),
  price: z.number().optional(),
  tags: z.array(UpdateTagValidation).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  language: z.string().optional(),
  provider: z.string().optional(),
  durationInWeeks: z.number().optional(),
  details: UpdateDetailsValidation.optional(),
});

export const CourseValidations = {
  TagValidation,
  DetailsValidation,
  CreateCourseValidationSchema,
  UpdateCourseValidationSchema
};
