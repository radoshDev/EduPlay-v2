<script setup lang="ts">
import { computed, ref } from 'vue'
import breakArrayBySize from '@/helpers/breakArrayBySize'
import { useCreatureStoreValues } from '@/stores/creature/creatureStore'

type Props = {
  label: string
  error?: string
  modelValue?: string
}
const props = defineProps<Props>()
defineEmits<{ (e: 'update:modelValue', newValue: string): void }>()

const { creaturesImages } = useCreatureStoreValues()
const slides = computed(() => breakArrayBySize(creaturesImages.value, 8))
const index = ref(getDefaultIndex())

function getDefaultIndex() {
  for (let i = 0; i < slides.value.length; i++) {
    const slide = slides.value[i]
    for (let img of slide) {
      if (img === props.modelValue) {
        return i
      }
    }
  }
  return 0
}

function handleChangeSlide(e: Event, type: 'next' | 'prev') {
  e.preventDefault()
  if (type === 'next') {
    index.value++
  } else {
    index.value--
  }
}
</script>

<template>
  <div class="max-w-[315px] mx-auto">
    <div className="text-sm">{{ label }}</div>
    <div
      class="mx-auto flex w-full items-center"
      :class="{ 'border-red-400 border': !!error }"
    >
      <v-btn
        @click="(e) => handleChangeSlide(e, 'prev')"
        :icon="{ name: 'md-arrowbackios-outlined' }"
        :disabled="index === 0"
        variant="primary"
        round
      />

      <div class="flex h-[132px] w-full flex-wrap gap-2 p-3">
        <div
          v-for="imageUrl in slides[index]"
          :key="imageUrl"
          role="button"
          :class="[
            'h-[50px] w-[50px]',
            'overflow-hidden rounded-full border-2 p-[3px] shadow-md',
            { 'border-emerald-500': modelValue === imageUrl }
          ]"
          @click="$emit('update:modelValue', imageUrl)"
        >
          <v-image
            class="h-full w-full"
            fit="contain"
            :src="imageUrl"
            alt="creatures"
            :width="50"
            :height="50"
          />
        </div>
      </div>
      <v-btn
        @click="(e) => handleChangeSlide(e, 'next')"
        :icon="{ name: 'md-arrowforwardios-outlined' }"
        :disabled="slides.length === 0 || index === slides.length - 1"
        color="primary"
        round
      />
    </div>
    <div v-if="error" className="mt-1 text-error">{{ error }}</div>
  </div>
</template>
