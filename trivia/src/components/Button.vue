<template>
  <button :disabled="isDisabled" class="button" @click="handleClick">
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    buttonText: {
      type: String,
      default: 'Play again'
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = () => {
      emit('click')
    }

    return { handleClick }
  }
})
</script>

<style scoped>
.button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #007bff;
  color: #fff;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
