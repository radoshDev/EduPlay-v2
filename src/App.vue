<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { supabase } from './lib/supabaseClient'
import { useUserStore } from '@/stores/user/userStore'
import { useStudentsStore } from '@/stores/students/studentsStore'

const { setCurrentUser, user } = useUserStore()
const { setStudents } = useStudentsStore()
onMounted(() => {
  supabase.auth.onAuthStateChange((_, session) => {
    console.log({ user: session?.user })

    if (session && !user) {
      console.log('currentUser & students settled')

      setCurrentUser(session.user)
      setStudents(session.user.id)
    }
  })
})
</script>

<template>
  <RouterView />
</template>
