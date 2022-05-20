import { appService } from './appSlice'
import { authenticationService } from './Login/authenticationSlice'
import { categoryService } from './MyProfile/Categories/categorySlice'
import { skillService } from './MyProfile/Skills/skillSlice'

export const reduxService = {
  app: appService,
  authentication: authenticationService,
  category: categoryService,
  skill: skillService,
}
