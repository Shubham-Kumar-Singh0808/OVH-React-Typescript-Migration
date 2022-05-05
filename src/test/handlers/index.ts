import { categoryListHandlers } from './categoryListHandlers'
import { loginHandlers } from './loginHandlers'
import { skillListHandlers } from './skillListHandlers'

export const handlers = [
  ...loginHandlers,
  ...categoryListHandlers,
  ...skillListHandlers,
  // add your handler here
]
