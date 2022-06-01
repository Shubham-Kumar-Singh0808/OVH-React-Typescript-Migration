import { appService } from './appSlice'
import { authenticationService } from './Login/authenticationSlice'
import { categoryService } from './MyProfile/Categories/categorySlice'
import { employeeCertificateService } from './MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'
import { employeeQualificationService } from './MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationSlice'
import { skillService } from './MyProfile/Skills/skillSlice'
import { userRolesAndPermissionsService } from './Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'

export const reduxServices = {
  app: appService,
  authentication: authenticationService,
  category: categoryService,
  skill: skillService,
  userRolesAndPermissions: userRolesAndPermissionsService,
  employeeCertifications: employeeCertificateService,
  employeeQualifications: employeeQualificationService,
}
