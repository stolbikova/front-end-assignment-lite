<template>
  <div class="game-page">
    <h1>Game Page</h1>
    <p class="difficulty">Difficulty: {{ store?.difficulty }}</p>
    <p class="score">Score: {{ score }}</p>
    <p>Question {{ currentIndex + 1 }} of {{ totalQuestions }}</p>
    <Question
      v-if="currentQuestion"
      :question="currentQuestion"
      :selected-answer="selectedAnswer"
      @select="selectAnswer"
    />
    <!-- <div v-if="currentIndex + 1 === totalQuestions" class="quiz-finished">
      <h2>Quiz Finished!</h2>
      <p>Your final score is: {{ score }}</p>
    </div> -->
    <Modal v-if="currentIndex + 1 === totalQuestions" @close="currentIndex + 1 !== totalQuestions">
      <h2>Quiz Finished!</h2>
      <p>Your final score is: {{ score }}</p>
    </Modal>
    <div class="button-wrap">
      <Button
        :isDisabled="currentIndex + 1 !== totalQuestions"
        :buttonText="'Play Again'"
        @click="resetQuiz"
      />
      <Button :buttonText="'Select difficulty'" @click="goBack" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

import { useCounterStore } from '../stores/counter'
import { fetchQuestions } from '../utils/fetchQuestions'
import Question from '../components/Question.vue'
import Button from '../components/Button.vue'
import Modal from '../components/Modal.vue'

export default defineComponent({
  components: { Question, Button, Modal },
  setup() {
    const store = useCounterStore()
    const router = useRouter()
    const questionItems = ref([])
    const currentIndex = ref(0)
    const score = ref(0)
    const selectedAnswer = ref<string | null>(null)

    const currentQuestion = computed(() => questionItems.value[currentIndex.value])
    const totalQuestions = computed(() => questionItems.value.length)

    const loadQuestions = async () => {
      if (!store.difficulty) {
        console.error('Difficulty not set')
        return
      }
      questionItems.value = await fetchQuestions(store.difficulty.toLowerCase(), 5)
    }

    const selectAnswer = (answer: string) => {
      selectedAnswer.value = answer
      if (isCorrectAnswer(answer)) {
        score.value++
      } else {
        score.value--
      }
      // I've made a timeout to change questions automatically without Next button. But it can be implemented differently.
      setTimeout(nextQuestion, 1000)
    }

    const isCorrectAnswer = (answer: string) => {
      return currentQuestion.value?.correct_answer === answer
    }

    const nextQuestion = () => {
      if (currentIndex.value < questionItems.value.length - 1) {
        currentIndex.value++
        selectedAnswer.value = null
      }
    }

    const resetQuiz = () => {
      currentIndex.value = 0
      score.value = 0
      selectedAnswer.value = null
      loadQuestions()
    }

    const goBack = () => {
      router.push({ name: 'home' })
    }

    onMounted(() => {
      loadQuestions()
    })

    return {
      store,
      score,
      currentQuestion,
      selectAnswer,
      selectedAnswer,
      currentIndex,
      totalQuestions,
      resetQuiz,
      goBack
    }
  }
})
</script>

<style scoped>
.game-page {
  max-width: 800px;
  min-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  color: #2c3e50;
}

.difficulty {
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 20px;
}

.button-wrap {
  display: flex;
  justify-content: 'space-between';
}

@media only screen and (max-width: 500px) {
  .game-page {
    min-width: unset;
  }
}
</style>
