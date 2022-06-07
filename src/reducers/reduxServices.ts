import addNewEmployeeService from './EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeSlice'
import { appService } from './appSlice'
import { authenticationService } from './Login/authenticationSlice'
import { basicInformationService } from './MyProfile/BasicInfoTab/basicInformatiomSlice'
import { categoryService } from './MyProfile/Categories/categorySlice'
import { certificateListService } from './EmployeeDirectory/CertificatesList/certificatesListSlice'
import { certificateTypeService } from './EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypeSlice'
import { countryService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/countriesSlice'
import { employeeAssetsService } from './MyProfile/MyAssetsTab/employeeAssetsSlice'
import { employeeCertificateService } from './MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'
import { employeeDesignationListService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListSlice'
import { employeeListService } from './EmployeeDirectory/EmployeesList/employeeListSlice'
import { employeeProjectsService } from './MyProfile/ProjectsTab/employeeProjectSlice'
import { employeeQualificationService } from './MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationSlice'
import { employeeReporteesService } from './MyProfile/ReporteesTab/employeeReporteesSlice'
import { employeeReviewsService } from './MyProfile/ReviewTab/employeeReviewsSlice'
import { employeeSkillServices } from './MyProfile/QualificationsTab/EmployeeSkills/employeeSkillSlice'
import { generalInformationService } from './MyProfile/GeneralTab/generalInformationSlice'
import { personalInfoService } from './MyProfile/PersonalInfoTab/personalInfoTabSlice'
import { profileHistoryService } from './MyProfile/ProfileHistory/profileHistorySlice'
import { qualificationCategoryService } from './MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategorySlice'
import { shiftConfigurationService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationSlice'
import { skillService } from './MyProfile/Skills/skillSlice'
import { technologyService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/getAllTechnologySlice'
import { userRolesAndPermissionsService } from './Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'
import { employeeReportService } from './EmployeeDirectory/EmployeeReport/'
import { employeeDesigationReportService } from './EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportSlice'
import { visaListService } from './EmployeeDirectory/VisaList/visaListSlice'
import { employeeLeaveSettingsService } from './Settings/LeaveSettings/employeeLeaveSettingsSlice'

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
  // getEmpDepartments: addNewEmployeeService,
  // technology: technologyService,
  // country: countryService,
  newEmployee: addNewEmployeeService,
  shiftConfiguration: shiftConfigurationService,
  employeeCertifications: employeeCertificateService,
  employeeQualifications: employeeQualificationService,
  employeeQualificationCategory: qualificationCategoryService,
  basicInformation: basicInformationService,
  generalInformation: generalInformationService,
  employeeSkill: employeeSkillServices,
  employeeReviews: employeeReviewsService,
  employeeProjects: employeeProjectsService,
  // shiftConfiguration: shiftConfigurationService,
  employeeReportees: employeeReporteesService,
  certificateList: certificateListService,
  employeeAssets: employeeAssetsService,
  certificateType: certificateTypeService,
  employeeReports: employeeReportService,
  employeeDesignationReports: employeeDesigationReportService,
  visaList: visaListService,
  employeeLeaveSettings: employeeLeaveSettingsService,
  getEmpDepartments: addNewEmployeeService,
  technology: technologyService,
  country: countryService,
  newEmployee: addNewEmployeeService,
}
