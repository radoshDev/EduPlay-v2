<script setup lang="ts">
import { SearchModal } from '@/components/ui/modals'
import { useUserStoreValues } from '@/stores/user/userStore'

defineProps<{ private?: boolean }>()

const { user } = useUserStoreValues()

function showModal() {
  window.search_modal.showModal()
}
</script>

<template>
  <template v-if="!(private && !user?.isAdmin)">
    <v-btn
      @click="showModal"
      variant="warning"
      :icon="{ name: 'hi-search', scale: 1.5 }"
    />
    <SearchModal />
  </template>
</template>
