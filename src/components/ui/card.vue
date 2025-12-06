<template>
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm" :class="class">
      <slot />
    </div>
  </template>
  
  <script setup>
  defineProps({ class: { type: String, default: '' } })
  </script>
  