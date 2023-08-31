import type { Database } from '@/types/db'
import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_SUPABASE_URL
const KEY = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient<Database>(URL, KEY)
