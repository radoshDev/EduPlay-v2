<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { supabase } from './lib/supabaseClient'
import { useUserStore } from '@/stores/user/userStore'
import { useStudentStore } from '@/stores/student/studentStore'
import { useCreatureStore } from './stores/creature/creatureStore'
import useLibraryStore from './stores/library/libraryStore'

const userStore = useUserStore()
const studentStore = useStudentStore()
const creatureStore = useCreatureStore()
const libraryStore = useLibraryStore()

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log({ user: session?.user, event })

    if (
      creatureStore.creatures.data === null &&
      !creatureStore.creatures.isLoading
    ) {
      console.log('creatures', creatureStore.creatures)
      creatureStore.setCreatures()
    }
    if (libraryStore.tasks.data === null && !libraryStore.tasks.isLoading) {
      console.log('creatures', libraryStore.tasks)
      libraryStore.setTasks()
    }
    if (
      libraryStore.categories.data === null &&
      !libraryStore.categories.isLoading
    ) {
      console.log('creatures', libraryStore.categories)
      libraryStore.setCategories()
    }

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
  })
})
</script>

<template>
  <RouterView />
</template>
