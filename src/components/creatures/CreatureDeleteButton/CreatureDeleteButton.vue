<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import api from '@/api/api'
import { ButtonIcon } from '@/components/ui/buttons'
import { useCreatureStore } from '@/stores/creature/creatureStore'
import type { Creature } from '@/types/db'

const props = defineProps<{ creature: Creature }>()

const { updateCreature } = useCreatureStore()

const isLoading = ref(false)
const $toast = useToast({ position: 'top' })
const router = useRouter()

async function handleDelete() {
  try {
    isLoading.value = true
    const creatureTitle = props.creature.title
    const category = props.creature.categorySlug
    await api.creatures.deleteCreature(props.creature.slug)
    updateCreature(props.creature, 'delete')
    $toast.success(`${creatureTitle} видалено!`)
    router.push(`/creatures/${category}`)
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
