export type SkillDetailsModal = {
  categoryType: string
  skillType: string
  competency: string
  expMonth: string
  expYear: string
}

export type SkillDetailsArrayModal = {
  SkillDetails: SkillDetailsModal[]
  isLoading: boolean
}

export type UserHeaders = {
  employeeId: number | string
}
export interface EmployeeSkillInfo {
  striped: boolean
  bordered: boolean
  tableClassName: string
  isFieldDisabled: boolean
}
