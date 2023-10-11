<script setup lang="ts">
import type { ModalKeys } from '@/types'
import { BasicModal } from '..'
import { SearchForm } from '@/components/forms'

const modalId: ModalKeys = 'search_modal'

function handleClose() {
  window[modalId].close()
}
</script>

<template>
  <BasicModal :id="modalId" @close="handleClose" title="Пошук завдання">
    <SearchForm />
  </BasicModal>
</template>
