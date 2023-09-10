import { ZodType, z } from 'zod'
import { ImageFileSchema, validateImage } from './RootSchema'

const CreatureCategorySchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  sourceLink: z.string().optional(),
  imageUrl: z.string().optional()
})

export const CreatureCategoryFormSchema = CreatureCategorySchema.extend({
  imageFile: z.any().optional() as ZodType<FileList | undefined>
}).superRefine(validateImage)

export const CreatureCategoryInputSchema = CreatureCategorySchema.extend({
  imageFile: ImageFileSchema
}).refine((data) => data.imageUrl || data.imageFile, 'Either file or image URL')

export const CreatureGetSchema = z.object({
  id: z.string()
})

export const CreatureCategoryGetSchema = z.object({ slug: z.string() })

export const CreatureSchema = z.object({
  title: z.string().min(2),
  source: z.string().optional(),
  description: z.string().optional(),
  mainImage: z.string().optional(),
  media: z.array(z.string()).optional(),
  categorySlug: z.string()
})

export const CreatureFormSchema = CreatureSchema.extend({
  slug: z.string().optional()
})

export const CreatureInputSchema = CreatureSchema.extend({ slug: z.string() })

export type CreatureCategoryForm = z.infer<typeof CreatureCategoryFormSchema>
export type CreatureForm = z.infer<typeof CreatureSchema>
export type CreatureInput = z.infer<typeof CreatureInputSchema>
