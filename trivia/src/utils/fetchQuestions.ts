import axios from 'axios'
import { BASE_API_URL } from '../constants'
import { decodeHtmlEntities } from './decodeHtmlEntities'

interface QuestionItem {
  question: string
  incorrect_answers: string[]
}

export const fetchQuestions = async (
  difficulty: string = 'easy',
  numberOfQuestions: number = 5
) => {
  try {
    const response = await axios.get(BASE_API_URL, {
      params: {
        amount: numberOfQuestions,
        difficulty,
        type: 'multiple'
      }
    })
    return response.data.results.map((question: QuestionItem) => ({
      ...question,
      question: decodeHtmlEntities(question.question),
      incorrect_answers: question.incorrect_answers.map((answer) => decodeHtmlEntities(answer))
    }))
  } catch (error) {
    console.error('Error fetching questions:', error)
    throw error
  }
}
