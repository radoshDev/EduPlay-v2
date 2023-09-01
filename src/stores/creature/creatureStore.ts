import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Creature } from '@/types/db'
import type { QueryData } from '@/types'
import api from '@/api/api'

export const useCreatureStore = defineStore('creatureStore', () => {
  const creatures = reactive<QueryData<Creature[] | null>>({
    data: null,
    isLoading: false,
    error: ''
  })
  const creaturesImages = computed(
    () =>
      creatures.data?.reduce<string[]>((acc, curr) => {
        if (curr.mainImage) {
          acc.push(curr.mainImage)
        }
        return acc
      }, []) || []
  )
  async function setCreatures() {
    try {
      creatures.isLoading = true
      creatures.error = ''
      const data = await api.creatures.getCreatures()
      creatures.data = data
    } catch (_error) {
      const error = _error as Error
      creatures.error = error.message || 'Unhandled creatures error'
    } finally {
      creatures.isLoading = false
    }
  }
  return { creatures, creaturesImages, setCreatures }
})
