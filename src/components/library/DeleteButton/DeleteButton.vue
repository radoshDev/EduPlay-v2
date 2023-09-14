<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import api from '@/api/api'
import { ButtonDelete } from '@/components/ui/buttons'
import { DeleteModal } from '@/components/ui/modals'
import { TL_UA } from '@/utils/constants'
import { useLibraryStore } from '@/stores/library/libraryStore'

type Props = {
  type: Extract<keyof typeof api.library, 'task' | 'subcategory' | 'category'>
}

const props = defineProps<Props>()

const libraryStore = useLibraryStore()

const loading = ref(false)

const currentData = computed(() => {
  return libraryStore.current[props.type]
})

const title = computed(() => {
  if (!currentData.value) return props.type
  return 'title' in currentData.value
    ? currentData.value.title
    : currentData.value.value
})

const backHref = computed(() => {
  const currentData = libraryStore.current[props.type]
  if (!currentData) return '/library'
  if (props.type === 'subcategory' && 'parentSlug' in currentData) {
    return `/library/${currentData.parentSlug}`
  }
  if (props.type === 'task' && 'type' in currentData) {
    return `/library/${currentData.type}/${currentData.subcategorySlug}`
  }
  return '/library'
})

const $toast = useToast({ position: 'top' })
const router = useRouter()

function showModal() {
  window['delete_modal'].showModal()
}

async function handleDelete() {
  const currentData = libraryStore.current[props.type]
  if (!currentData) return
  try {
    loading.value = true
    const titleData = title.value
    const href = backHref.value
    const slug = 'slug' in currentData ? currentData.slug : currentData.id
    // @ts-ignore
    await api.library[props.type]('delete', slug)
    libraryStore.update(props.type, currentData, 'delete')
    $toast.success(`'${titleData}' видалено!`)
    router.push(href)
  } catch (_error) {
    const error = _error as Error
    $toast.error(error.message || 'Something went wrong. Try to reload page')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <ButtonDelete @click="showModal" :loading="loading" />
  <DeleteModal
    :title="`Видалити ${TL_UA.library[type].title.toLowerCase()} '${title}'?`"
    @delete="handleDelete"
  />
</template>
