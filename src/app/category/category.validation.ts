import { z } from 'zod';

const CreateCategoryValidationSchema = z.object({
  name: z.string(),
});

export const CategoryValidations = {
  CreateCategoryValidationSchema,
};
