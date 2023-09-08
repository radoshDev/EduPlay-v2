<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { nanoid } from 'nanoid'
import { ButtonAdd, ButtonIcon } from '@/components/ui/buttons'
import { InputField } from '@/components/ui'

type Props = {
  mainImage?: string
  media?: string[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'mainImage', val?: string): void
  (e: 'media', media?: string[]): void
}>()
const mediaInputs = reactive(
  props.media?.map((value) => ({ id: nanoid(5), value })) || []
)

function handleMediaChange(id: string, val: string) {
  const currentInput = mediaInputs.find((input) => input.id === id)

  if (!currentInput) return
  currentInput.value = val
  emit(
    'media',
    mediaInputs.map((m) => m.value)
  )
}

function handleAddMoreMedia(e: Event) {
  e.preventDefault()
  mediaInputs.push({ id: nanoid(5), value: '' })
}

function handleRemoveMedia(e: Event, id: string) {
  e.preventDefault()
  const indexEl = mediaInputs.findIndex((input) => input.id === id)
  console.log({ indexEl })

  mediaInputs.splice(indexEl, 1)
  emit(
    'media',
    mediaInputs.map((m) => m.value)
  )
}
</script>

<template>
  <div
    className="rounded-md bg-transparent border-gray-500 border p-1 text-center"
  >
    <div className="text-xl font-bold">Галерея</div>
    <div
      v-for="(input, i) in mediaInputs"
      :key="input.id"
      className="flex items-end gap-1"
    >
      <ButtonIcon
        :icon="{ name: 'hi-switch-horizontal' }"
        size="xs"
        class="mb-7"
        color="primary"
      />
      <InputField
        :label="`Media ${i + 1}`"
        :modelValue="input.value"
        @input="(val) => handleMediaChange(input.id, val)"
      />
      <ButtonIcon
        @click="(e) => handleRemoveMedia(e, input.id)"
        :icon="{ name: 'md-removecircle' }"
        size="xs"
        class="mb-7"
        round
        color="error"
      />
    </div>
    <ButtonAdd @click="handleAddMoreMedia" />
  </div>
</template>