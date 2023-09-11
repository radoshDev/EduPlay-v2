<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import api from '@/api/api'
import { ButtonIcon } from '@/components/ui/buttons'
import { useCreatureStore } from '@/stores/creature/creatureStore'
import type { CreatureCategory } from '@/types/db'

const props = defineProps<{ category: CreatureCategory }>()

const { updateCategory } = useCreatureStore()

const isLoading = ref(false)
const $toast = useToast({ position: 'top' })
const router = useRouter()

async function handleDelete() {
  try {
    isLoading.value = true
    const creatureTitle = props.category.title
    await api.creatures.deleteCategory(props.category.slug)
    updateCategory(props.category, 'delete')
    $toast.success(`${creatureTitle} видалено!`)
    router.push('/creatures')
  } catch (_error) {
    const error = _error as Error
    $toast.error(error.message || 'Something went wrong. Try to reload page')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <ButtonIcon
    :disabled="isLoading"
    @click="handleDelete"
    :icon="{ name: 'md-deleteforever-round', scale: 1.5 }"
    color="error"
  />
</template>
