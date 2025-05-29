import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const newQuestionComment = makeQuestionComment(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('questionComment-1')
    )

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    await sut.execute({ authorId: 'author-1', questionCommentId: 'questionComment-1' })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment from another user', async () => {
    const newQuestionComment = makeQuestionComment(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('questionComment-1')
    )

    await inMemoryQuestionCommentsRepository.create(newQuestionComment)

    await expect(() => {
      return sut.execute({ authorId: 'author-2', questionCommentId: 'questionComment-1' })
    }).rejects.toBeInstanceOf(Error)
  })
})
