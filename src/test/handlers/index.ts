import { categoryListHandlers } from './categoryListHandlers'
import { generalInformationHandlers } from './generalInformationHandlers'
import { loginHandlers } from './loginHandlers'
import { skillListHandlers } from './skillListHandlers'

export const handlers = [
  ...loginHandlers,
  ...categoryListHandlers,
  ...skillListHandlers,
  ...generalInformationHandlers,
  // add your handler here
]
