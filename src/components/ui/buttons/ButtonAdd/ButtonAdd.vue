<script setup lang="ts">
import { ButtonIcon } from '@/components/ui/buttons'
import { useUserStore } from '@/stores/user/userStore'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useUserStore())
defineProps<{ href?: string; private?: boolean }>()
defineEmits<{ (e: 'click', event: Event): void }>()
</script>

<template>
  <ButtonIcon
    v-if="!(private && !user?.isAdmin)"
    @click="(e) => $emit('click', e)"
    :icon="{ name: 'bi-plus-circle-fill', scale: 2 }"
    color="success"
    size="md"
    round
    :href="href"
  />
</template>
