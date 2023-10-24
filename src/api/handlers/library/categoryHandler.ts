import { supabase } from '@/lib/supabaseClient'
import type { TaskCategoryInsert, TaskCategoryUpdate, Values } from '@/types/db'

type Category = Values['category']

async function categoryHandler<
  A extends keyof Category,
  D extends Category[A]['input']
>(action: A, data: D): Promise<Category[A]['output']> {
  const db = supabase.from('task_categories')
  switch (action) {
    case 'add': {
      const res = await db.insert(data as TaskCategoryInsert).select()
      if (res?.error) throw new Error(res.error.message)
      return res.data[0]
    }
    case 'update': {
      const input = data as TaskCategoryUpdate
      const res = await db.update(input).eq('slug', input.slug).select()
      if (res?.error) throw new Error(res.error.message)
      return res.data[0]
    }
    case 'delete': {
      const res = await db.delete().eq('slug', data as string)
      if (res?.error) throw new Error(res.error.message)
      return
    }
    case 'getAll': {
      const res = await db.select(
        `*, 
          subcategories: task_subcategories!task_subcategories_parentSlug_fkey(slug, title, parentSlug, imageUrl, difficulty, position)`
      )
      if (res?.error) throw new Error(res.error.message)
      return res.data
    }
  }
}

export default categoryHandler
