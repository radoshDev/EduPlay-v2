import { supabase } from '@/lib/supabaseClient'
import type { Action } from '@/types'
import type { TaskInsert, TaskUpdate, Values } from '@/types/db'

type Value = Values['task']

async function taskHandler<A extends Action, D extends Value[A]['input']>(
  action: A,
  data: D
): Promise<Value[A]['output']> {
  const db = supabase.from('tasks')
  switch (action) {
    case 'add': {
      const res = await db.insert(data as TaskInsert).select()
      if (res?.error) throw new Error(res.error.message)
      return res.data[0]
    }
    case 'update': {
      const input = data as TaskUpdate
      const res = await db.update(input).eq('id', input.id).select()
      if (res?.error) throw new Error(res.error.message)
      return res.data[0]
    }
    case 'delete': {
      const res = await db.delete().eq('id', data as string)
      if (res?.error) throw new Error(res.error.message)
      return
    }
    case 'getAll': {
      const res = await db.select(
        '*, subcategory: task_subcategories(difficulty)'
      )
      if (res?.error) throw new Error(res.error.message)
      return res.data
    }
  }
}

export default taskHandler
