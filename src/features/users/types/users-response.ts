import type { User } from './user'
import type { Pagination } from './pagination'

export interface UsersResponse {
  users: User[]
  pagination: Pagination
}
