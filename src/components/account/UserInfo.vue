<script setup lang="ts">
import { useUserStoreValues } from '@/stores/user/userStore'
import { BadgeTag } from '@/components/ui'

const { user } = useUserStoreValues()
</script>

<template>
  <div>
    <span class="mr-4">{{ user?.name || user?.email }}</span>
    <BadgeTag
      :text="user?.isAdmin ? 'admin' : 'user'"
      :color="user?.isAdmin ? 'secondary' : 'info'"
    />
  </div>
</template>
