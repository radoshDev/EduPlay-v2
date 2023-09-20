<script setup lang="ts">
import api from '@/api/api'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useUserStore } from '@/stores/user/userStore'
import { useStudentStore } from '@/stores/student/studentStore'
import { useRouter } from 'vue-router'
import { RouteName } from '@/utils/constants'

const loading = ref(false)
const $toast = useToast()
const userStore = useUserStore()
const studentsStore = useStudentStore()
const router = useRouter()

async function handleLogout() {
  try {
    loading.value = true
    const res = await api.logout()

    if (res.error) throw new Error(res.error.message)
    userStore.$reset()
    studentsStore.$reset()
    localStorage.clear()
    router.push({ name: RouteName.LOGIN })
  } catch (_error) {
    const error = _error as Error
    $toast.error(error.message || 'Problem to logout')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-btn :loading="loading" variant="success" @click="handleLogout">
    Вийти
  </v-btn>
</template>
