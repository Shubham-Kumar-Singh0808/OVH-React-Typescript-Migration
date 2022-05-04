import { Method } from 'axios'

export type ApiMethodsType = { [key: string]: Method }

export type ApiObjectType = { [key: string]: string }

export type ValidationErrorType = number | null
