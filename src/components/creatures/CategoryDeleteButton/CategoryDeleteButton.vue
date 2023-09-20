<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import api from '@/api/api'
import { useCreatureStore } from '@/stores/creature/creatureStore'
import type { CreatureCategory } from '@/types/db'

const props = defineProps<{ category: CreatureCategory }>()

const { updateCategory } = useCreatureStore()

const loading = ref(false)
const $toast = useToast({ position: 'top' })
const router = useRouter()

async function handleDelete() {
  try {
    loading.value = true
    const creatureTitle = props.category.title
    await api.creatures.deleteCategory(props.category.slug)
    updateCategory(props.category, 'delete')
    $toast.success(`${creatureTitle} видалено!`)
    router.push('/creatures')
  } catch (_error) {
    const error = _error as Error
    $toast.error(error.message || 'Something went wrong. Try to reload page')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-btn
    :disabled="loading"
    :icon="{ name: 'md-deleteforever-round', scale: 1.5 }"
    variant="error"
    @click="handleDelete"
  />
</template>
