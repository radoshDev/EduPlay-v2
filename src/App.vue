<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { supabase } from './lib/supabaseClient'
import { useUserStore } from '@/stores/user/userStore'
import { useStudentStore } from '@/stores/student/studentStore'
import { useCreatureStore } from './stores/creature/creatureStore'

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    const { setCurrentUser, user } = useUserStore()
    const { setStudents, students } = useStudentStore()
    const { setCreatures, creatures } = useCreatureStore()
    console.log({ user: session?.user, event })
    if (!session) return
    if (event === 'SIGNED_IN') {
      console.log('currentUser', user)
      setCurrentUser(session.user)
    }
    if (students.data === null && !students.isLoading) {
      console.log('students', students)
      setStudents(session.user.id)
    }
    if (creatures.data === null && !creatures.isLoading) {
      console.log('creatures', creatures)
      setCreatures()
    }
  })
})
</script>

<template>
  <RouterView />
</template>
@/stores/student/studentsStore
