export type EmployeeSkills = {
  categoryType: string
  skillType: string
  competency: string
  expMonth: string
  expYear: string
}

export interface EmployeeSkillInfo {
  striped: boolean
  bordered: boolean
  tableClassName: string
  isFieldDisabled: boolean
}

export type EmployeeSkillState = {
  skillDetails: EmployeeSkills[]
  isLoading: boolean
}
