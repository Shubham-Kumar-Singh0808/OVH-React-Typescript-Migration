import { LoadingState, ValidationError } from '../../../commonTypes'
import { CategoryList } from '../categoryListTypes'

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
  addNewCategory: CategoryList[]
}
