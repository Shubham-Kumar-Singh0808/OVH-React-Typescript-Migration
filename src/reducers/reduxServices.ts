import { appService } from './appSlice'
import { authenticationService } from './Login/authenticationSlice'
import { categoryService } from './MyProfile/Categories/categorySlice'
import { profileHistoryService } from './MyProfile/ProfileHistory/profileHistorySlice'
import { skillService } from './MyProfile/Skills/skillSlice'
import { userRolesAndPermissionsService } from './Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'

export const reduxServices = {
  app: appService,
  authentication: authenticationService,
  category: categoryService,
  skill: skillService,
  profileHistory: profileHistoryService,
  userRolesAndPermissions: userRolesAndPermissionsService,
}
