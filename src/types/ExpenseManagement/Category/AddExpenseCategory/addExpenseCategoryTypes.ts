import { LoadingState, ValidationError } from '../../../commonTypes'

export interface DynamicFormLabelProps {
  dynamicFormLabelProps: (htmlFor: string, className: string) => Label
}

export type Label = {
  htmlFor: string
  className: string
}

export type AddNewCategorySliceState = {
  isLoading: LoadingState
  error: ValidationError
}
