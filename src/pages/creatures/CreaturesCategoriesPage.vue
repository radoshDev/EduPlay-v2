<script setup lang="ts">
import { CategoryList } from '@/components'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonEducation } from '@/components/ui/buttons'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'

const { creatureCategories } = useCreatureStoreValues()
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Creatures" back-href="/account">
        <template #right-action>
          <ButtonEducation />
        </template>
      </PageTitle>
    </template>
    <div
      className="flex w-full max-w-md flex-col items-center"
      v-if="creatureCategories.data"
    >
      <CategoryList
        :list="creatureCategories.data"
        :is-loading="creatureCategories.isLoading"
        :error="creatureCategories.error"
        hrefStart="creatures"
      />
      <ButtonAdd private href="/creatures/new" />
    </div>
    <v-alert v-else variant="error" message="Категорії не знайдено" />
  </PageLayout>
</template>
