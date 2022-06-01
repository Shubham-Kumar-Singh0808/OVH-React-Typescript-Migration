import { appService } from './appSlice'
import { authenticationService } from './Login/authenticationSlice'
import { categoryService } from './MyProfile/Categories/categorySlice'
import { skillService } from './MyProfile/Skills/skillSlice'
<<<<<<< HEAD
import { personalInfoService } from './MyProfile/PersonalInfoTab/personalInfoTabSlice'
=======
import { userRolesAndPermissionsService } from './Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'

>>>>>>> develop
export const reduxServices = {
  app: appService,
  authentication: authenticationService,
  category: categoryService,
  skill: skillService,
<<<<<<< HEAD
  personalInformation: personalInfoService,
=======
  userRolesAndPermissions: userRolesAndPermissionsService,
>>>>>>> develop
}
