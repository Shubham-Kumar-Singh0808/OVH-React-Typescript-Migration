import { LoadingState, ValidationError } from '../../commonTypes'

export type KRAs = {
  checkType: null
  count: number
  departmentId: number
  departmentName: string
  description: string
  designationId: number
  designationKraPercentage: number
  designationName: string
  id: number
  kpiLookps: null
  name: string
}

export type KRADTo = {
  checkType: null
  count: number
  departmentId: null
  departmentName: null
  description: null
  designationId: null
  designationKraPercentage: null
  designationName: null
  id: number
  kpiLookps: null
  name: string
}

export type KPIs = {
  description: string
  frequency: string
  frequencyId: number
  id: number
  name: string
  target: string
  kraDto?: KRADTo[]
}

export type MyKRAsExpandableTableProps = {
  isAccordionItemShow: boolean
}

export type MyKRAsSliceState = {
  kras: KRAs[]
  kpis: KPIs[]
  isLoading: LoadingState
  error: ValidationError
}
