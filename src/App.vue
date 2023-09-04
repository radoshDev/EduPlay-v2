<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { supabase } from './lib/supabaseClient'
import { useUserStore } from '@/stores/user/userStore'
import { useStudentStore } from '@/stores/student/studentStore'
import { useCreatureStore } from './stores/creature/creatureStore'
import { useTaskStore } from './stores/task/taskStore'

const userStore = useUserStore()
const studentStore = useStudentStore()
const creatureStore = useCreatureStore()
const taskStore = useTaskStore()

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log({ user: session?.user, event })
    if (!session) return

    if (event === 'SIGNED_IN') {
      console.log('currentUser', userStore.user)
      userStore.setCurrentUser(session.user)
    }

    if (
      studentStore.students.data === null &&
      !studentStore.students.isLoading
    ) {
      console.log('students', studentStore.students)
      studentStore.setStudents(session.user.id)
    }

    if (
      creatureStore.creatures.data === null &&
      !creatureStore.creatures.isLoading
    ) {
      console.log('creatures', creatureStore.creatures)
      creatureStore.setCreatures()
    }
    if (taskStore.tasks.data === null && !taskStore.tasks.isLoading) {
      console.log('creatures', taskStore.tasks)
      taskStore.setTasks()
    }
  })
})
</script>

<template>
  <RouterView />
</template>
