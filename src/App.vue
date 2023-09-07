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
    if (
      creatureStore.creatures.data === null &&
      !creatureStore.creatures.isLoading
    ) {
      creatureStore.setCreatures()
    }
    if (libraryStore.tasks.data === null && !libraryStore.tasks.isLoading) {
      libraryStore.setTasks()
    }
    if (
      libraryStore.categories.data === null &&
      !libraryStore.categories.isLoading
    ) {
      libraryStore.setCategories()
    }

    if (!session) return

    if (event === 'SIGNED_IN') {
      userStore.setCurrentUser(session.user)
    }

    if (
      studentStore.students.data === null &&
      !studentStore.students.isLoading
    ) {
      studentStore.setStudents(session.user.id)
    }
  })
})
</script>

<template>
  <RouterView />
</template>
