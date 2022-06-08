import { appService } from './appSlice'
import { authenticationService } from './Login/authenticationSlice'
import { basicInformationService } from './MyProfile/BasicInfoTab/basicInformatiomSlice'
import { categoryService } from './MyProfile/Categories/categorySlice'
import { employeeCertificateService } from './MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'
import { employeeQualificationService } from './MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationSlice'
import { employeeSkillServices } from './MyProfile/QualificationsTab/EmployeeSkills/employeeSkillSlice'
import { generalInformationService } from './MyProfile/GeneralTab/generalInformationSlice'
import { personalInfoService } from './MyProfile/PersonalInfoTab/personalInfoTabSlice'
import { profileHistoryService } from './MyProfile/ProfileHistory/profileHistorySlice'
import { qualificationCategoryService } from './MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategorySlice'
import { shiftConfigurationService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationSlice'
import { skillService } from './MyProfile/Skills/skillSlice'
import { userRolesAndPermissionsService } from './Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'
import { myAssetsService } from './MyProfile/MyAssetsTab/myAssetsSlice'
export const reduxServices = {
  app: appService,
  authentication: authenticationService,
  category: categoryService,
  skill: skillService,
  profileHistory: profileHistoryService,
  personalInformation: personalInfoService,
  userRolesAndPermissions: userRolesAndPermissionsService,
  employeeCertifications: employeeCertificateService,
  employeeQualifications: employeeQualificationService,
  employeeQualificationCategory: qualificationCategoryService,
  basicInformation: basicInformationService,
  generalInformation: generalInformationService,
  employeeSkill: employeeSkillServices,
  shiftConfiguration: shiftConfigurationService,
  employeeMyAssets: myAssetsService,
}
