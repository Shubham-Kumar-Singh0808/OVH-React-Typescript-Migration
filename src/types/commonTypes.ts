import { AllowedLoadingState } from '../middleware/api/apiList'

export type ValidationError = number | null

export type LoadingState = AllowedLoadingState

export type TextEditorProps = {
  value: string
  setFieldValue: (val: string) => void
}
