import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsAnswerUseCaseRequest {
  answerId: string
  page: number
}

interface FetchAnswerCommentsAnswerUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsAnswerUseCaseRequest): Promise<FetchAnswerCommentsAnswerUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(
      answerId,
      { page }
    )

    return { answerComments }
  }
}
