import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User as SBUser } from '@supabase/supabase-js'
import type { User } from '@/types/user'

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

  function $reset() {
    user.value = null
  }
  return { setCurrentUser, user, $reset }
})
