import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachmentList } from './answer-attachment-list'
import { Optional } from '@/core/types/optional'

export interface AnswerProps {
  questionId: UniqueEntityID
  authorId: UniqueEntityID
  content: string
  attachments: AnswerAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get questionId() {
    return this.props.questionId
  }

  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get attachments() {
    return this.props.attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments

    this.touch()
  }

  static create(
    props: Optional<AnswerProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityID
  ) {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return answer
  }
}
