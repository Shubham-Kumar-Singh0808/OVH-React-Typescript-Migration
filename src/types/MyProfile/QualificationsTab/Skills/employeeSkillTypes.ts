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
export type SkillListItem = {
  skillId: number
  skill: string
}

export type SkillState = {
  skillList: SkillListItem[]
  skillDetails: EmployeeSkills[]
  refreshList: boolean
  isLoading: boolean
}
