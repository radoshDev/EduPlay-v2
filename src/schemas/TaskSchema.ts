import { z } from 'zod'
import { DifficultySchema } from './RootSchema'

const TaskCategorySchema = z.object({
  title: z.string().nonempty('Title is required'),
  imageUrl: z.string().optional(),
  position: z.number().optional()
})

export const TaskCategoryInputSchema = TaskCategorySchema.extend({
  slug: z.string()
})

export const TaskCategoryFormSchema = TaskCategorySchema.extend({
  slug: z.string().optional()
})

const TaskSubcategorySchema = TaskCategorySchema.extend({
  difficulty: DifficultySchema,
  parentSlug: z.string()
})

export const TaskSubcategoryInputSchema = TaskSubcategorySchema.extend({
  slug: z.string()
})

export const TaskSubcategoryFormSchema = TaskSubcategorySchema.extend({
  slug: z.string().optional()
})

const TaskSchema = z.object({
  type: z.string(),
  value: z.string().nonempty('Value is required'),
  subcategorySlug: z.string(),
  result: z.string().optional()
})

export const TaskFormSchema = TaskSchema.extend({ id: z.string().optional() })
export const TaskInputSchema = TaskSchema.extend({ id: z.string() })

export type TaskCategoryInput = z.infer<typeof TaskCategoryInputSchema>
export type TaskSubcategoryInput = z.infer<typeof TaskSubcategoryInputSchema>
export type TaskInput = z.infer<typeof TaskInputSchema>
export type TaskForm = z.infer<typeof TaskFormSchema>
