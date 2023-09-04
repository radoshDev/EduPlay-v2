<script setup lang="ts">
import ContentTask from './ContentTask/ContentTask.vue'
import ContentTaskHint from './ContentTaskHint/ContentTaskHint.vue'
import ContentTaskSalute from './ContentTaskSalute/ContentTaskSalute.vue'
</script>

<template>
  <div className="relative flex flex-1 flex-col justify-center">
    <ContentTask />
    <ContentTaskHint />
    <ContentTaskSalute />
  </div>
</template>
