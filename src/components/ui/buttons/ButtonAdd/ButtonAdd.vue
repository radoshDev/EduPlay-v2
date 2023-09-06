<script setup lang="ts">
import { ButtonIcon } from '@/components/ui/buttons'
import { useUserStore } from '@/stores/user/userStore'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useUserStore())
defineProps<{ href?: string; private?: boolean }>()
defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <ButtonIcon
    v-if="!(private && !user?.isAdmin)"
    @click="$emit('click')"
    :icon="{ name: 'bi-plus-circle-fill', scale: 1.5 }"
    color="success"
    round
    :href="href"
  />
</template>
