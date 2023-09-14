<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons'
import type { IconProps } from '@/types/styles'

defineProps<IconProps>()
</script>

<template>
  <OhVueIcon
    :name="name"
    :scale="scale"
    :animation="animation"
    :speed="speed"
    :hover="hover"
    :flip="flip"
    :fill="fill"
    :label="label"
    :title="title"
    :inverse="inverse"
  />
</template>
