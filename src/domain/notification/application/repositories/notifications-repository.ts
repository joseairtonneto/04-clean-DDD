import { PaginationParams } from '@/core/repositories/pagination-params'
import { Notification } from '../../enterprise/entities/notification'

export interface NotificationsRepository {
  findMany(params: PaginationParams): Promise<Notification[]>
  findById(id: string): Promise<Notification | null>
  create(notification: Notification): Promise<void>
  save(notification: Notification): Promise<void>
}
