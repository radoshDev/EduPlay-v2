<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { supabase } from './lib/supabaseClient'
import { useUserStore } from '@/stores/user/userStore'
import { useStudentStore } from '@/stores/student/studentStore'
import { useCreatureStore } from '@/stores/creature/creatureStore'
import { useLibraryStore } from '@/stores/library/libraryStore'
import { setUITheme } from './helpers/setUITheme'
import type { ThemeName } from './types'

const userStore = useUserStore()
const studentStore = useStudentStore()
const creatureStore = useCreatureStore()
const libraryStore = useLibraryStore()

onMounted(() => {
  creatureStore.setCreatures()
  libraryStore.setTasks()
  libraryStore.setCategories()

  const theme = (localStorage.getItem('theme') as ThemeName) || 'night'
  setUITheme(theme)

  supabase.auth.onAuthStateChange((event, session) => {
    console.log({ event, session })

    if (!session) {
      setUITheme('custom')
      return
    }

    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
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
