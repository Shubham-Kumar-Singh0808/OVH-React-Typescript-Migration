export type SkillListItem = {
  skillId: number
  skill: string
}

export type SkillState = {
  skillList: SkillListItem[]
  refreshList: boolean
  isLoading: boolean
}
