<script setup lang="ts">
import { CreatureList } from '@/components/creatures'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonEdit, ButtonEducation } from '@/components/ui/buttons'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'
import { useUserStoreValues } from '@/stores/user/userStore'

const { user } = useUserStoreValues()
const { currentCategory: category } = useCreatureStoreValues()
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle
        :title="category?.title || 'Список істот'"
        back-href="/creatures"
      >
        <template #right-action v-if="category">
          <ButtonEdit
            v-if="user?.isAdmin"
            :href="`/creatures/${category.slug}/edit`"
          />
          <ButtonEducation v-else />
        </template>
      </PageTitle>
    </template>
    <div v-if="category" class="flex flex-1 flex-col items-center">
      <v-btn
        v-if="category.sourceLink"
        :href="category.sourceLink"
        variant="warning"
        target="_blank"
      >
        Source
      </v-btn>
      <CreatureList />
      <ButtonAdd private :href="`/creatures/${category.slug}/new`" />
    </div>
    <div v-else>
      <v-alert variant="error" message="Категорію не знайдено" />
    </div>
  </PageLayout>
</template>
