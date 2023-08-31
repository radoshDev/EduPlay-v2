import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User as SBUser } from '@supabase/supabase-js'

type User = {
  email: string
  name: string
  id: string
  isAdmin: boolean
  imageUrl?: string
}

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User | null>(null)

  async function setCurrentUser(sbUser: SBUser) {
    user.value = {
      email: sbUser.email!,
      id: sbUser.id,
      name: sbUser.user_metadata.name,
      isAdmin: sbUser.app_metadata.role === 'admin',
      imageUrl: sbUser.user_metadata.avatar_url
    }
  }
  return { setCurrentUser, user }
})
