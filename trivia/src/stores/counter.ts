import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const difficulty = ref('easy')

  function increment() {
    count.value++
  }

  function setDifficulty(level: 'easy' | 'medium' | 'hard') {
    difficulty.value = level
  }

  return { count, doubleCount, increment, difficulty, setDifficulty }
})
