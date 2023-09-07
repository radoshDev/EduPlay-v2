<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue'
import { ProgressGraph } from '@/components/students'
import { PageTitle } from '@/components/ui'
import { ButtonLogout, ButtonText } from '@/components/ui/buttons'
import { useStudentStore } from '@/stores/student/studentStore'
import { useUserStore } from '@/stores/user/userStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const { user } = storeToRefs(useUserStore())
const { students } = storeToRefs(useStudentStore())

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
        <ButtonText size="sm" variant="neutral" href="/creatures">
          Істоти
        </ButtonText>
        <ButtonText size="sm" variant="warning" href="/library">
          Бібліотека
        </ButtonText>
      </div>
      <div v-if="showProgress" class="w-full mt-6">
        <ProgressGraph />
      </div>
    </div>
  </PageLayout>
</template>
