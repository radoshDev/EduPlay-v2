<script setup lang="ts">
import { useUserStoreValues } from '@/stores/user/userStore'

const { user } = useUserStoreValues()
defineProps<{ href?: string; private?: boolean }>()
defineEmits<{ (e: 'click', event: Event): void }>()
</script>

<template>
  <v-btn
    v-if="!(private && !user?.isAdmin)"
    @click="(e) => $emit('click', e)"
    :icon="{ name: 'bi-plus-circle-fill', scale: 2 }"
    variant="success"
    size="md"
    round
    :href="href"
  />
</template>
