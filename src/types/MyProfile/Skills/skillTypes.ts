export type SkillListItemType = {
  skillId: number
  skill: string
}

export type SkillStateType = {
  skillList: SkillListItemType[]
  refreshList: boolean
  isLoading: boolean
}
