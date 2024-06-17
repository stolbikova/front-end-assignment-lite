<template>
  <div>Select the difficulty:</div>
  <div class="difficulty-selection">
    <button
      v-for="(difficulty, index) in difficulties"
      :key="index"
      :class="{ selected: selectedDifficulty === difficulty }"
      @click="selectDifficulty(difficulty)"
      class="difficulty-button"
    >
      {{ difficulty }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['difficultySelected'],
  setup(_, { emit }) {
    const difficulties = ['Easy', 'Medium', 'Hard']
    const selectedDifficulty = ref<string | null>(null)

    const selectDifficulty = (difficulty: string) => {
      selectedDifficulty.value = difficulty
      emit('difficultySelected', difficulty)
    }

    return { difficulties, selectedDifficulty, selectDifficulty }
  }
})
</script>

<style scoped>
.difficulty-selection {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0 20px 0;
}

.difficulty-button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #f0f0f0;
  color: #333;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.difficulty-button:hover {
  background-color: #e0e0e0;
  border-color: #ccc;
}

.difficulty-button.selected {
  background-color: #28a745;
  border-color: #218838;
  color: #fff;
}
</style>
