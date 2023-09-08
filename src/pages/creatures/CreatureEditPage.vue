<script setup lang="ts">
import { CreatureForm } from '@/components/forms'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Edit Creature" backButton href="." />
    </template>
    <CreatureForm
      action="updateCreature"
      :defaultValues="{ categorySlug: 'test' }"
    />
  </PageLayout>
</template>
