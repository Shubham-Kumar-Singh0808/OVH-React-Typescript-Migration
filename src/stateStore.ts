// eslint-disable-next-line import/named
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import appReducer from './reducers/appSlice'
import authenticationReducer from './reducers/Login/authenticationSlice'
import categoryReducer from './reducers/MyProfile/Categories/categorySlice'
import certificateListReducer from './reducers/EmployeeDirectory/CertificatesList/certificatesListSlice'
import certificateTypeReducer from './reducers/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypeSlice'
import checkUserExistReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/userSlice'
import countriesReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/countriesSlice'
import employeeAssetsReducer from './reducers/MyProfile/MyAssetsTab/employeeAssetsSlice'
import employeeCertificationReducer from './reducers/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'
import employeeDesignationListReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListSlice'
import employeeGeneralInformationReducer from './reducers/MyProfile/GeneralTab/generalInformationSlice'
import employeeListReducer from './reducers/EmployeeDirectory/EmployeesList/employeeListSlice'
import employeeProjectsReducer from './reducers/MyProfile/ProjectsTab/employeeProjectSlice'
import employeeQualificationsReducer from './reducers/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationSlice'
import employeeReporteesReducer from './reducers/MyProfile/ReporteesTab/employeeReporteesSlice'
import employeeReviewsReducer from './reducers/MyProfile/ReviewTab/employeeReviewsSlice'
import employeeSkillReducer from './reducers/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillSlice'
import getAllEmploymentReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/getEmploymentSlice'
import getAllJobTypeReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/getJobTypeSlice'
import getAllReportingManagersReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/reportingManagersSlice'
import getEmployeeDepartmentsReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/getEmployeeDepartmentsSlice'
import hrDataReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/hrDataSlice'
import newEmployeeReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeSlice'
import personalInfoReducer from './reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import profileHistoryReducer from './reducers/MyProfile/ProfileHistory/profileHistorySlice'
import qualificationCategoryReducer from './reducers/MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategorySlice'
import shiftConfigurationReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationSlice'
import sidebarMenuSliceReducer from './reducers/SidebarMenu/sidebarMenuSlice'
import skillReducer from './reducers/MyProfile/Skills/skillSlice'
import technologyReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/getAllTechnologySlice'
import userRolesAndPermissionsReducer from './reducers/Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'
import employeeReportReducer from './reducers/EmployeeDirectory/EmployeeReport/'
import employeeDesignationReportReducer from './reducers/EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportSlice'
import visaListReducer from './reducers/EmployeeDirectory/VisaList/visaListSlice'
import employeeHandbookReducer from './reducers/EmployeeHandbook/employeeHandbookSlice'
import showHandbookReducer from './reducers/EmployeeHandbook/showHandbookSlice'
import attendanceReportReducer from './reducers/TimeAndAttendance/AttendanceReport/attendanceReportSlice'
import userAccessToFeaturesReducer from './reducers/Settings/UserRolesConfiguration/userAccessToFeaturesSlice'
import employeeHandbookSettingsReducer from './reducers/EmployeeHandbook/HandbookSettings/employeeHandbookSettingSlice'
import timeInOfficeReportReducer from './reducers/TimeAndAttendance/TimeInOfficeReport/timeInOfficeReportSlice'
import employeeLeaveSettingsReducer from './reducers/Settings/LeaveSettings/employeeLeaveSettingsSlice'
import hiveActivityReportReducer from './reducers/TimeAndAttendance/HiveActivityReport/hiveActivityReportSlice'
import employeeMailConfigurationReducer from './reducers/Settings/MailConfiguration/employeeMailConfigurationSlice'
import addNewTemplateReducer from './reducers/Settings/MailConfiguration/AddTemplate/addMailTemplateSlice'
import employeeReducer from './reducers/EmployeeDirectory/EmployeesList/EditEmployee'
import scheduledInterviewsReducer from './reducers/Recruitment/ScheduledInterviews/scheduledInterviewsSlice'

export const allReducers = {
  app: appReducer,
  authentication: authenticationReducer,
  getLoggedInEmployeeData: employeeGeneralInformationReducer,
  sidebarMenu: sidebarMenuSliceReducer,
  userRolesAndPermissions: userRolesAndPermissionsReducer,
  employeeQualificationsDetails: employeeQualificationsReducer,
  category: categoryReducer,
  personalInfoDetails: personalInfoReducer,
  skill: skillReducer,
  qualificationCategory: qualificationCategoryReducer,
  employeeCertificates: employeeCertificationReducer,
  profileHistory: profileHistoryReducer,
  employeeSkill: employeeSkillReducer,
  employeeReviews: employeeReviewsReducer,
  employeeList: employeeListReducer,
  employeeDesignationList: employeeDesignationListReducer,
  shiftConfiguration: shiftConfigurationReducer,
  employeeReportees: employeeReporteesReducer,
  employeeProjects: employeeProjectsReducer,
  certificateList: certificateListReducer,
  employeeAssets: employeeAssetsReducer,
  certificateType: certificateTypeReducer,
  employeeReports: employeeReportReducer,
  employeeDesignationReports: employeeDesignationReportReducer,
  visaList: visaListReducer,
  employeeHandbook: employeeHandbookReducer,
  showHandbook: showHandbookReducer,
  employeeAttendanceReport: attendanceReportReducer,
  userAccessToFeatures: userAccessToFeaturesReducer,
  employeeHandbookSettings: employeeHandbookSettingsReducer,
  timeInOfficeReport: timeInOfficeReportReducer,
  employeeLeaveSettings: employeeLeaveSettingsReducer,
  getEmployeeDepartments: getEmployeeDepartmentsReducer,
  getAllTechnology: technologyReducer,
  country: countriesReducer,
  getAllEmploymentType: getAllEmploymentReducer,
  getAllHrData: hrDataReducer,
  getAllReportingManagers: getAllReportingManagersReducer,
  newEmployee: newEmployeeReducer,
  getJobTypes: getAllJobTypeReducer,
  checkUserExist: checkUserExistReducer,
  hiveActivityReport: hiveActivityReportReducer,
  employeeMailConfiguration: employeeMailConfigurationReducer,
  addMailTemplate: addNewTemplateReducer,
  employee: employeeReducer,
  scheduledInterviews: scheduledInterviewsReducer,
  // add your slice reducers here
}

const stateStore = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['app/addToast'],
      },
    }).concat(thunkMiddleware),
})

export type RootState = ReturnType<typeof stateStore.getState>
export type AppDispatch = typeof stateStore.dispatch

// eslint-disable-next-line
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default stateStore
