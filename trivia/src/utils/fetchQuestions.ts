import axios from 'axios'
import { BASE_API_URL } from '../constants'
import { decodeHtmlEntities } from './decodeHtmlEntities'

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
    return response.data.results.map((question: any) => ({
      ...question,
      question: decodeHtmlEntities(question.question)
    }))
  } catch (error) {
    console.error('Error fetching questions:', error)
    throw error
  }
}
