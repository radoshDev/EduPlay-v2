<script setup lang="ts">
import { ref } from 'vue'
import { DatabaseAddIcon } from '@/components/ui/icons'
import { useTaskStore, useTaskStoreValues } from '@/stores/task/taskStore'
import { useStudentStore } from '@/stores/student/studentStore'

const taskStore = useTaskStore()
const { currentTaskRound, isRoundEnd, isBeforeRoundEnd } = useTaskStoreValues()
const studentStore = useStudentStore()
const nextRoundAudioRef = ref<HTMLAudioElement | null>(null)
const earnedCoinAudioRef = ref<HTMLAudioElement | null>(null)

function handlePrev() {
  if (!currentTaskRound.value) return
  if (isRoundEnd.value) {
    currentTaskRound.value.earned--
    studentStore.saveStudentProgress('subtract')
  }

  currentTaskRound.value.index--
}

function handleNext() {
  if (!currentTaskRound.value) return

  if (isBeforeRoundEnd.value) {
    currentTaskRound.value.earned++
    studentStore.saveStudentProgress('add')
  }

  currentTaskRound.value.index++
  handlePlaySound()
}
function handlePlaySound() {
  if (!currentTaskRound) return

  const sound = isRoundEnd.value
    ? earnedCoinAudioRef.value
    : nextRoundAudioRef.value

  if (!sound) return

  if (!sound.paused) {
    sound.pause()
    sound.currentTime = 0
  }
  sound.play()
}
</script>

<template>
  <div v-if="currentTaskRound" class="flex justify-center gap-10">
    <v-btn
      :disabled="currentTaskRound.index === 0"
      @click="handlePrev"
      size="md"
    >
      <v-icon name="hi-solid-arrow-narrow-left" scale="2.5" />
    </v-btn>
    <v-btn
      v-if="isRoundEnd"
      variant="success"
      @click="taskStore.nextRound"
      size="md"
    >
      <DatabaseAddIcon />
    </v-btn>
    <v-btn
      v-else
      variant="primary"
      size="md"
      @click="handleNext"
      :disabled="currentTaskRound.roundTasks.length === 0"
    >
      <v-icon name="hi-solid-arrow-narrow-right" scale="2.5" />
    </v-btn>
    <div class="hidden">
      <audio ref="nextRoundAudioRef" src="/success-sound.mp3" />
      <audio ref="earnedCoinAudioRef" src="/coin-earned.mp3" />
    </div>
  </div>
</template>
