import { computed, reactive } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import type { CategoryWithCreatures, Creature } from '@/types/db'
import type { QueryData } from '@/types'
import api from '@/api/api'
import getRandomIndex from '@/helpers/getRandomIndex'

type PageParams = {
  category?: string
  creature?: string
}

export const useCreatureStore = defineStore('creatureStore', () => {
  const creatureCategories = reactive<
    QueryData<CategoryWithCreatures[] | null>
  >({
    data: null,
    isLoading: false,
    error: ''
  })

  const slug = reactive({
    category: null as string | null,
    creature: null as string | null
  })

  const creatures = computed(() => {
    if (!creatureCategories.data) return []
    return creatureCategories.data.reduce<Creature[]>((result, category) => {
      result.push(...category.creatures)
      return result
    }, [])
  })

  const creaturesImages = computed(() => {
    return creatures.value.reduce<string[]>((acc, creature) => {
      if (creature.mainImage) {
        acc.push(creature.mainImage)
      }
      return acc
    }, [])
  })

  const currentCategory = computed(() => {
    if (!slug.category || !creatureCategories.data) return
    return creatureCategories.data.find(
      (category) => category.slug === slug.category
    )
  })

  const currentCreature = computed(() => {
    if (!slug.creature) return
    return creatures.value.find((creature) => creature.slug === slug.creature)
  })

  async function setCreatures() {
    try {
      creatureCategories.isLoading = true
      creatureCategories.error = ''
      const data = await api.creatures.getCreatures()
      creatureCategories.data = data
    } catch (_error) {
      const error = _error as Error
      creatureCategories.error = error.message || 'Unhandled creatures error'
    } finally {
      creatureCategories.isLoading = false
    }
  }

  function getRandomCreature(): Creature {
    return creatures.value[getRandomIndex(creatures.value.length)]
  }

  function setPageParams(params: PageParams) {
    for (const property in params) {
      const key = property as keyof PageParams
      const value = params[key]
      if (value && value !== slug[key]) {
        slug[key] = value
      }
    }
  }
  return {
    slug,
    creatureCategories,
    creatures,
    creaturesImages,
    currentCategory,
    currentCreature,
    setCreatures,
    getRandomCreature,
    setPageParams
  }
})

export const useCreatureStoreValues = () => storeToRefs(useCreatureStore())
