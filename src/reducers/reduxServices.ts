import { appService } from './appSlice'
import { authenticationService } from './Login/authenticationSlice'
import { categoryService } from './MyProfile/Categories/categorySlice'
import { skillService } from './MyProfile/Skills/skillSlice'
import { personalInfoService } from './MyProfile/PersonalInfoTab/personalInfoTabSlice'
export const reduxServices = {
  app: appService,
  authentication: authenticationService,
  category: categoryService,
  skill: skillService,
  personalInformation: personalInfoService,
}
