import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsQuestionUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentsQuestionUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsQuestionUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsQuestionUseCaseRequest): Promise<FetchQuestionCommentsQuestionUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestionId(
      questionId,
      { page }
    )

    return { questionComments }
  }
}
