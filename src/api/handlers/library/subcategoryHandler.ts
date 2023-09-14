import { supabase } from '@/lib/supabaseClient'
import type { Action } from '@/types'
import type {
  TaskSubcategoryInsert,
  TaskSubcategoryUpdate,
  Values
} from '@/types/db'

type Value = Values['subcategory']

async function subcategoryHandler<
  A extends Action,
  D extends Value[A]['input']
>(action: A, data: D): Promise<Value[A]['output']> {
  const db = supabase.from('task_subcategories')
  switch (action) {
    case 'add': {
      const res = await db.insert(data as TaskSubcategoryInsert).select()
      if (res?.error) throw new Error(res.error.message)
      return res.data[0]
    }
    case 'update': {
      const input = data as TaskSubcategoryUpdate
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
      const res = await db.select()
      if (res?.error) throw new Error(res.error.message)
      return res.data
    }
  }
}

export default subcategoryHandler
