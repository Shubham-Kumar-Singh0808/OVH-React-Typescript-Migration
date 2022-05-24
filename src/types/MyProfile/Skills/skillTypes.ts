import { LoadingState } from '../../commonTypes'

export type Skill = {
  skillId: number
  skill: string
}

export type SkillSliceState = {
  skillList: Skill[]
  refreshList: boolean
  isLoading: LoadingState
}
