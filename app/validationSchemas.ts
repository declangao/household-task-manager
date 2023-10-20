import { Status } from '@prisma/client';
import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(65535, 'Description is too long').optional(),
});

export const patchTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title is too long')
    .optional(),
  description: z
    .string()
    .max(65535, 'Description is too long')
    .optional()
    .nullable(),
  status: z
    .enum(['NOT_STARTED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED'])
    .optional(),
});
