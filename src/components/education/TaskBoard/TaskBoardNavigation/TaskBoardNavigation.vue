<script setup lang="ts">
import { ButtonText } from '@/components/ui/buttons'
import { DatabaseAddIcon } from '@/components/ui/icons'
import { useTaskStore } from '@/stores/task/taskStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const taskStore = useTaskStore()
const { currentTaskRound, isRoundEnd, isBeforeRoundEnd } =
  storeToRefs(taskStore)
const nextRoundAudioRef = ref<HTMLAudioElement | null>(null)
const earnedCoinAudioRef = ref<HTMLAudioElement | null>(null)

function handlePrev() {
  if (!currentTaskRound.value) return
  if (isRoundEnd.value) {
    currentTaskRound.value.earned--
    console.log('handleSaveProgress("subtract")')
  }

  currentTaskRound.value.index--
}

function handleNext() {
  if (!currentTaskRound.value) return

  if (isBeforeRoundEnd.value) {
    currentTaskRound.value.earned++
    console.log('handleSaveProgress("add")')
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
    <ButtonText :disabled="currentTaskRound.index === 0" @click="handlePrev">
      <v-icon name="hi-solid-arrow-narrow-left" scale="2.5" />
    </ButtonText>
    <ButtonText
      v-if="isRoundEnd"
      variant="success"
      @click="taskStore.nextRound"
    >
      <DatabaseAddIcon />
    </ButtonText>
    <ButtonText v-else variant="primary" @click="handleNext">
      <v-icon name="hi-solid-arrow-narrow-right" scale="2.5" />
    </ButtonText>
    <div class="hidden">
      <audio ref="nextRoundAudioRef" src="/success-sound.mp3" />
      <audio ref="earnedCoinAudioRef" src="/coin-earned.mp3" />
    </div>
  </div>
</template>
