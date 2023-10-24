import { z } from 'zod'

export const SearchSchema = z.object({
  search: z.string().min(3).max(40)
})

export type SearchInput = z.infer<typeof SearchSchema>
