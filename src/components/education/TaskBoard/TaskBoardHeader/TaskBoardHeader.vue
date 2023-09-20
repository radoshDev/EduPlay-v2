<script setup lang="ts">
import { CoinIcon } from '@/components/ui/icons'
import { useStudentStoreValues } from '@/stores/student/studentStore'
import { useTaskStoreValues } from '@/stores/task/taskStore'

const { currentStudent, roundLength } = useStudentStoreValues()
const { currentTaskRound } = useTaskStoreValues()

function showOptionsModal() {
  window.task_options_modal.showModal()
}
</script>

<template>
  <div v-if="currentTaskRound">
    <div class="mb-2 flex items-start justify-between">
      <v-btn
        :icon="{ name: 'io-close-circle-sharp', scale: 2 }"
        variant="error"
        size="md"
        :href="currentStudent ? '.' : '/'"
        round
      />
      <div className="w-20 cursor-pointer">
        <CoinIcon :count="currentTaskRound.earned" />
      </div>
      <v-btn
        @click="showOptionsModal"
        :icon="{ name: 'md-morevert', scale: 2 }"
        variant="info"
        size="md"
      />
    </div>
    <progress
      class="progress h-4 w-full"
      :value="currentTaskRound.index"
      :max="roundLength"
    ></progress>
  </div>
</template>
