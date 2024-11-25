import { z } from 'zod';

export const productValidationSchema = z.object({
  title: z.string().min(3),
  author: z.string().min(3),
  price: z.number().min(0, 'Price must be a positive number.'),
  category: z.enum([
    'Fiction',
    'Science',
    'SelfDevelopment',
    'Poetry',
    'Religious',
  ]),

  description: z.string().min(10),
  quantity: z.number().min(1, 'Quantity must be a positive number.'),
  inStock: z.boolean(),
});
