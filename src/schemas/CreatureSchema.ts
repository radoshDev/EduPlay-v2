import { z } from 'zod'

export const CreatureCategorySchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  sourceLink: z.string().optional(),
  imageUrl: z.string().optional()
})

export const CreatureCategoryInputSchema = CreatureCategorySchema.extend({
  slug: z.string()
})
export const CreatureCategoryFormSchema = CreatureCategorySchema.extend({
  slug: z.string().optional()
})

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

export type CreatureForm = z.infer<typeof CreatureSchema>
export type CreatureInput = z.infer<typeof CreatureInputSchema>
export type CreatureCategoryInput = z.infer<typeof CreatureCategoryInputSchema>
