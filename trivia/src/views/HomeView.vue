<template>
  <main>
    <DifficultySelection @difficultySelected="handleDifficultySelected" />
    <p>Selected Difficulty: {{ store?.difficulty }}</p>
    <Button :buttonText="'Play'" @click="startGame" />
  </main>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import Button from '../components/Button.vue'
import DifficultySelection from '../components/DifficultySelection.vue'
import { useCounterStore } from '../stores/counter'

export default {
  components: {
    DifficultySelection,
    Button
  },
  setup() {
    const store = useCounterStore()
    const router = useRouter()

    const handleDifficultySelected = (difficulty: string) => {
      store.setDifficulty(difficulty)
      console.log('Selected difficulty in Home:', store.difficulty)
    }

    const startGame = () => {
      router.push({ name: 'game' })
    }

    return { store, handleDifficultySelected, startGame }
  }
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
