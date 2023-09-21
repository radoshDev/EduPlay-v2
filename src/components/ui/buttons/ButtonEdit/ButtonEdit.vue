<script setup lang="ts">
import { useUserStoreValues } from '@/stores/user/userStore'

const { user } = useUserStoreValues()
defineProps<{ href?: string; private?: boolean }>()
defineEmits<{ (e: 'click', event: Event): void }>()
</script>

<template>
  <v-btn
    v-if="!(private && !user?.isAdmin)"
    :icon="{ name: 'fa-regular-edit', scale: 1.5 }"
    :href="href"
    variant="secondary"
    @click="(e) => $emit('click', e)"
  />
</template>
