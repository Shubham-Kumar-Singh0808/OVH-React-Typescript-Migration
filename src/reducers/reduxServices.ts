import { appService } from './appSlice'
import { authenticationService } from './Login/authenticationSlice'
import { basicInformationService } from './MyProfile/BasicInfoTab/basicInformatiomSlice'
import { categoryService } from './MyProfile/Categories/categorySlice'
import { employeeCertificateService } from './MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'
import { employeeDesignationListService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListSlice'
import { employeeListService } from './EmployeeDirectory/EmployeesList/employeeListSlice'
import { employeeQualificationService } from './MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationSlice'
import { employeeSkillServices } from './MyProfile/QualificationsTab/EmployeeSkills/employeeSkillSlice'
import { generalInformationService } from './MyProfile/GeneralTab/generalInformationSlice'
import { personalInfoService } from './MyProfile/PersonalInfoTab/personalInfoTabSlice'
import { profileHistoryService } from './MyProfile/ProfileHistory/profileHistorySlice'
import { qualificationCategoryService } from './MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategorySlice'
import { shiftConfigurationService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationSlice'
import { skillService } from './MyProfile/Skills/skillSlice'
import { userRolesAndPermissionsService } from './Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'
import { employeeReporteesService } from './MyProfile/ReporteesTab/employeeReporteesSlice'
import { employeeAssetsService } from './MyProfile/MyAssetsTab/employeeAssetsSlice'
import { certificateTypeService } from './EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypeSlice'
import { employeeReviewsService } from './MyProfile/ReviewTab/employeeReviewsSlice'

export const reduxServices = {
  app: appService,
  authentication: authenticationService,
  category: categoryService,
  skill: skillService,
  employeeList: employeeListService,
  profileHistory: profileHistoryService,
  personalInformation: personalInfoService,
  userRolesAndPermissions: userRolesAndPermissionsService,
  employeeDesignation: employeeDesignationListService,
  employeeCertifications: employeeCertificateService,
  employeeQualifications: employeeQualificationService,
  employeeQualificationCategory: qualificationCategoryService,
  basicInformation: basicInformationService,
  generalInformation: generalInformationService,
  employeeSkill: employeeSkillServices,
  employeeReviews: employeeReviewsService,
  shiftConfiguration: shiftConfigurationService,
  employeeReportees: employeeReporteesService,
  employeeAssets: employeeAssetsService,
  certificateType: certificateTypeService,
}
