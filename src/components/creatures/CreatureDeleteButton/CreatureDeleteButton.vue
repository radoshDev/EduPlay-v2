<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import api from '@/api/api'
import { useCreatureStore } from '@/stores/creature/creatureStore'
import type { Creature } from '@/types/db'

const props = defineProps<{ creature: Creature }>()

const { updateCreature } = useCreatureStore()

const loading = ref(false)
const $toast = useToast({ position: 'top' })
const router = useRouter()

async function handleDelete() {
  try {
    loading.value = true
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
