import { appService } from './appSlice'
import { authenticationService } from './Login/authenticationSlice'
import { categoryService } from './MyProfile/Categories/categorySlice'
import { shiftConfigurationService } from './EmployeeDirectory/EmployeeList/AddNewEmployee/ShiftConfiguration/shiftConfigurationSlice'
import { skillService } from './MyProfile/Skills/skillSlice'
import { userRolesAndPermissionsService } from './Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'

export const reduxServices = {
  app: appService,
  authentication: authenticationService,
  category: categoryService,
  skill: skillService,
  userRolesAndPermissions: userRolesAndPermissionsService,
  shiftConfiguration: shiftConfigurationService,
}
