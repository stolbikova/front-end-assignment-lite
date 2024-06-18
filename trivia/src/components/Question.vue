<template>
  <div class="question-item">
    <p>{{ question.question }}</p>
    <div class="answers">
      <button
        :data-testid="`option-${index}`"
        v-for="(answer, index) in answers"
        :key="index"
        :class="{
          'wrong-answer': selectedAnswer === answer && !isCorrectAnswer(answer),
          'correct-answer':
            (selectedAnswer === answer && isCorrectAnswer(answer)) ||
            (selectedAnswer && isCorrectAnswer(answer))
        }"
        @click="selectAnswer(answer)"
      >
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

export default defineComponent({
  props: {
    question: {
      type: Object as PropType<{
        question: string
        correct_answer: string
        incorrect_answers: string[]
      }>,
      required: true
    },
    selectedAnswer: {
      type: String,
      required: false
    }
  },
  emits: ['select'],
  setup(props, { emit }) {
    const answers = computed(() => {
      return [...props.question.incorrect_answers, props.question.correct_answer].sort(
        () => Math.random() - 0.5
      )
    })

    const isCorrectAnswer = (answer: string) => {
      return props.question.correct_answer === answer
    }

    const selectAnswer = (answer: string) => {
      emit('select', answer)
    }

    return { answers, isCorrectAnswer, selectAnswer }
  }
})
</script>

<style scoped>
.question-item {
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 20px 0;
}

.question-item > p {
  padding: 15px 0;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  transition: background-color 0.3s;
  width: 100%;
  text-align: left;
}

button:hover {
  background-color: #f0f0f0;
}

button.correct-answer {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

button.wrong-answer {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}
</style>
