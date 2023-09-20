<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

async function githubSignIn() {
  await supabase.auth.signInWithOAuth({
    provider: 'github'
  })
}
</script>

<template>
  <v-btn variant="neutral" @click="githubSignIn">
    <v-icon name="bi-github" />
    Github
  </v-btn>
</template>
