<script setup lang="ts">
import { SearchModal } from '@/components/ui/modals'

function showModal() {
  window.search_modal.showModal()
}
</script>

<template>
  <v-btn
    @click="showModal"
    variant="warning"
    :icon="{ name: 'hi-search', scale: 1.5 }"
  />
  <SearchModal />
</template>
