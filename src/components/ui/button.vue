<template>
    <button
      :class="classes"
      v-bind="$attrs"
    >
      <slot />
    </button>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    variant: { type: String, default: 'default' },
    size: { type: String, default: 'md' },
    class: { type: String, default: '' },
  })
  
  const classes = computed(() => {
    const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none'
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    }
    const sizes = {
      sm: 'h-9 px-3',
      md: 'h-10 px-4',
      lg: 'h-11 px-6 text-lg',
    }
    return [base, variants[props.variant], sizes[props.size], props.class].join(' ')
  })
  </script>
  