<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { StudentList } from '@/components/students'
import { PageTitle } from '@/components/ui'
import { ButtonAdd, ButtonIcon } from '@/components/ui/buttons'
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Студенти">
        <template #right-action>
          <ButtonIcon href="/account" color="secondary" round>
            <v-icon name="bi-gear-fill" scale="1.5" />
          </ButtonIcon>
        </template>
      </PageTitle>
    </template>
    <div class="flex w-full max-w-md flex-col">
      <StudentList />
      <div class="text-center">
        <ButtonAdd href="/students/add" />
      </div>
    </div>
  </PageLayout>
</template>
