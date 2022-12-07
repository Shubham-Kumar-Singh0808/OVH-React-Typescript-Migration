import { LoadingState, ValidationError } from '../../commonTypes'

export type Invest = {
  investmentId: number
  investmentName: string
  maxLimit: number
  description: string
  requiredDocs: string
  sectionId: number
  sectionName: string
}

export type Section = {
  sectionId: number
  sectionName: string
  sectionLimit: number | string
  invests: Invest[]
}

export type InvestmentCheckListExpandableTableProps = {
  isAccordionItemShow: boolean
}

export type InvestmentCheckListSliceState = {
  investments: Invest[]
  sections: Section[]
  isLoading: LoadingState
  error: ValidationError
}
