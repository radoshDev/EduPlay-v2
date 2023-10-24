<script setup lang="ts">
import { computed } from 'vue'
import PageLayout from '@/components/layouts/PageLayout.vue'
import { ProgressGraph } from '@/components/students'
import { PageTitle } from '@/components/ui'
import { ButtonLogout } from '@/components/ui/buttons'
import { useStudentStoreValues } from '@/stores/student/studentStore'
import { useUserStoreValues } from '@/stores/user/userStore'

const { user } = useUserStoreValues()
const { students } = useStudentStoreValues()

const showProgress = computed(() => {
  if (!students.value.data?.length) return false
  return students.value.data.some((student) => student.progress.length > 0)
})
</script>

<template>
  <PageLayout>
    <template #title>
      <PageTitle title="Акаунт" back-href="/students">
        <template #right-action>
          <ButtonLogout />
        </template>
      </PageTitle>
    </template>
    <div className="flex w-full flex-col items-center">
      <div className="flex flex-col gap-3">
        <div>
          <span>{{ user?.name || user?.email }}</span>
          <div v-if="user?.isAdmin" className="badge badge-accent ml-2">
            admin
          </div>
        </div>
        <v-btn variant="neutral" href="/creatures"> Істоти </v-btn>
        <v-btn variant="warning" href="/library"> Бібліотека </v-btn>
      </div>
      <div v-if="showProgress" class="w-full mt-6">
        <ProgressGraph />
      </div>
    </div>
  </PageLayout>
</template>
