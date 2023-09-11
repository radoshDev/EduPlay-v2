import { supabase } from '@/lib/supabaseClient'
import type { Creature } from '@/types/db'

const deleteCreatureHandler = async (
  creatureSlug: Creature['slug']
): Promise<void> => {
  const res = await supabase.from('creatures').delete().eq('slug', creatureSlug)
  if (res.error) throw new Error(res.error.message || 'Problem to delete:(')
}

export default deleteCreatureHandler
