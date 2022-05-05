import { categoryListHandlers } from './categoryListHandlers'
import { loginHandlers } from './loginHandlers'

export const handlers = [
  ...loginHandlers,
  ...categoryListHandlers,
  // add your handler here
]
