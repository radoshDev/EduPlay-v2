<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { supabase } from './lib/supabaseClient'
import { useUserStore } from '@/stores/user/userStore'

const { setCurrentUser, user } = useUserStore()
onMounted(() => {
  supabase.auth.onAuthStateChange((_, session) => {
    console.log({ user: session?.user })

    if (session) {
      setCurrentUser(session.user)
    }
  })
})
</script>

<template>
  <RouterView />
</template>
