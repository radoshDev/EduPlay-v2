import { supabase } from '@/lib/supabaseClient'
import type { CreatureInput } from '@/schemas/CreatureSchema'
import type { Creature } from '@/types/db'

const updateCreatureHandler = async (
  input: CreatureInput
): Promise<Creature> => {
  const res = await supabase.from('creatures').update(input).select()
  if (res.error) throw new Error(res.error.message)
  return res.data[0]
}

export default updateCreatureHandler
