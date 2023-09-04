<script setup lang="ts">
import { ButtonIcon } from '@/components/ui/buttons'
import { CoinIcon } from '@/components/ui/icons'
import { useStudentStore } from '@/stores/student/studentStore'
import { useTaskStore } from '@/stores/task/taskStore'
import { storeToRefs } from 'pinia'

const { currentStudent } = storeToRefs(useStudentStore())
const { currentTaskRound } = storeToRefs(useTaskStore())
</script>

<template>
  <div v-if="currentTaskRound">
    <div class="mb-2 flex items-start justify-between">
      <ButtonIcon
        :icon="{ name: 'io-close-circle-sharp', scale: 2.5 }"
        color="error"
        size="md"
        :href="currentStudent ? '.' : '/'"
        round
      />
      <div className="w-20 cursor-pointer">
        <CoinIcon :count="currentTaskRound.earned" />
      </div>
      <ButtonIcon
        :icon="{ name: 'md-morevert', scale: 2.5 }"
        color="info"
        size="md"
      />
    </div>
    <progress
      class="progress h-4 w-full"
      :value="currentTaskRound.index"
      :max="currentStudent?.roundLength"
    ></progress>
  </div>
</template>
