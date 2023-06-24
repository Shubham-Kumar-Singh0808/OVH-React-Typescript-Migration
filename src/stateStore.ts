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
import employeeLeaveApplyReducer from './reducers/Leaves/ApplyLeave/employeeApplyLeaveSlice'
import scheduledInterviewsReducer from './reducers/Recruitment/ScheduledInterviews/scheduledInterviewsSlice'
import addMailTemplateTypeReducer from './reducers/Settings/MailConfiguration/AddMailTemplateType/addMailTemplateTypeSlice'
import myAttendanceReducer from './reducers/TimeAndAttendance/MyAttendance/myAttendanceSlice'
import ticketReportReducer from './reducers/Support/Report/ticketReportSlice'
import clientsReducer from './reducers/ProjectManagement/Clients/clientsSlice'
import addClientReducer from './reducers/ProjectManagement/Clients/AddClient/addNewClientSlice'
import clientInformationReducer from './reducers/ProjectManagement/Clients/ClientInformation/clientInformationSlice'
import leaveSummaryReducer from './reducers/Leaves/LeaveSummary/employeeLeaveSummarySlice'
import ticketApprovalsReducer from './reducers/Support/TicketApprovals/ticketApprovalsSlice'
import myTicketsReducer from './reducers/Support/MyTickets/myTicketsSlice'
import createNewTicketReducer from './reducers/Support/RaiseTicket/createNewTicketSlice'
import jobOpeningsReducer from './reducers/Dashboard/jobOpeningsSlice'
import UpcomingBirthdayReducer from './reducers/Dashboard/birthdayAnniversarySlice'
import birthdaysListReducer from './reducers/Dashboard/birthdayListSlice'
import holidaysReducer from './reducers/Dashboard/holidaysSlice'
import earnedLeavesReducer from './reducers/Dashboard/earnedLeavesSlice'
import timeInOfficeReducer from './reducers/Dashboard/timeInOfficeSlice'
import trainingAndEventsReducer from './reducers/Dashboard/trainingsAndEventsSlice'
import provisionPeriodReducer from './reducers/Dashboard/provisionPeriodSlice'
import achievementsReducer from './reducers/Dashboard/achievementsSlice'
import updateTicketReducer from './reducers/Support/TicketApprovals/UpdateTicket/updateTicketSlice'
import bookingListReducer from './reducers/ConferenceRoomBooking/BookingList/bookingListSlice'
import leaveReportReducer from './reducers/Leaves/LeaveReports/leaveReportSlice'
import addLocationListReducer from './reducers/ConferenceRoomBooking/NewBooking/LocationList/locationListSlice'
import eventTypeListReducer from './reducers/ConferenceRoomBooking/NewEvent/EventTypeList/eventTypeListSlice'
import newBookingReducer from './reducers/ConferenceRoomBooking/NewBooking/newBookingSlice'
import employeeAllocationReportReducer from './reducers/ProjectManagement/EmployeeAllocation/employeeAllocationSlice'
import eventListReducer from './reducers/ConferenceRoomBooking/EventList/eventListSlice'
import addTrackerListReducer from './reducers/Support/RaiseTicket/TrackerList/trackerListSlice'
import allocateEmployeeReducer from './reducers/ProjectManagement/AllocateEmployee/allocateEmployeeSlice'
import addRoomList from './reducers/ConferenceRoomBooking/NewBooking/RoomList/roomListSlice'
import employeeProfileSearchReducer from './reducers/Dashboard/searchEmployeeSlice'
import ticketConfigurationReducer from './reducers/Settings/TicketConfiguration/ticketConfigurationSlice'
import appraisalConfigurationsReducer from './reducers/Settings/Configurations/appraisalConfigurationsSlice'
import submitViewResignationReducer from './reducers/Separation/SubmitViewResignation/submitResignationSlice'
import addConfigurationReducer from './reducers/Settings/Configurations/AddConfiguration/addConfigurationSlice'
import projectManagementReducer from './reducers/ProjectManagement/Project/AddEditPraject/AddEditProjectSlice'
import projectReportReducer from './reducers/ProjectManagement/Project/projectReportSlice'
import newEventReducer from './reducers/ConferenceRoomBooking/NewEvent/newEventSlice'
import leaveApprovalsReducer from './reducers/Leaves/LeaveApprovals/leaveApprovalsSlice'
import itDeclarationFormReducer from './reducers/Finance/ITDeclarationForm/itDeclarationFormSlice'
import paySlipsReducer from './reducers/Finance/Payslips/payslipsSlice'
import panDetailsReducer from './reducers/Finance/PanDetails/panDetailsSlice'
import bankDetailsReducer from './reducers/Finance/PanDetails/bankDetailsSlice'
import resignationListReducer from './reducers/Separation/ResignationList/resignationListSlice'
import employeeAccountsReducer from './reducers/Finance/EmployeeAccounts/employeeAccountsSlice'
import itDeclarationListReducer from './reducers/Finance/ITDeclarationList/itDeclarationListSlice'
import investmentCheckListReducer from './reducers/Finance/InvestmentCheckList/investmentCheckListSlice'
import payrollManagementReducer from './reducers/Finance/PayrollManagement/PayrollManagementSlice'
import achieverListReducer from './reducers/Achievements/AchieverList/AchieverListSlice'
import commonAchievementsReducer from './reducers/Achievements/CommonAchievementsSlice'
import projectCreationRequestReducer from './reducers/ProjectManagement/ProjectCreationRequests/projectCreationRequestsSlice.'
import addProjectCreationRequestReducer from './reducers/ProjectManagement/ProjectCreationRequests/AddProjectCreationRequest/addProjectCreationRequestSlice'
import addAchieverReducer from './reducers/Achievements/AddAchiever/AddAchieverSlice'
import projectViewDetailsReducer from './reducers/ProjectManagement/Project/ProjectView/projectViewSlice'
import projectTimeLineReducer from './reducers/ProjectManagement/Project/ProjectView/ProjectTimeLine/projectTimeLineSlice'
import projectChangeRequestReducer from './reducers/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestSlice'
import projectMileStoneReducer from './reducers/ProjectManagement/Project/ProjectView/MileStone/mileStoneSlice'
import projectInvoicesReducer from './reducers/ProjectManagement/Project/ProjectView/Invoices/invoicesSlice'
import projectTailoringReducer from './reducers/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringSlice'
import projectTimeSheetReducer from './reducers/ProjectManagement/Project/ProjectView/ProjectTimeSheet/projectTimeSheetSlice'
import projectProposalsReducer from './reducers/ProjectManagement/Project/ProjectView/Proposals/projectProposalsSlice'
import projectNotesReducer from './reducers/ProjectManagement/Project/ProjectView/Notes/projectNotesSlice'
import initiateCycleReducer from './reducers/Settings/InitiateCycle/initiateCycleSlice'
import MyKRAsReducer from './reducers/Performance/MyKRAs/myKRAsSlice'
import nomineeListReducer from './reducers/Achievements/NomineeList/NomineeListSlice'
import addNomineeReducer from './reducers/Achievements/AddNominee/AddNomineeSlice'
import myReviewReducer from './reducers/Performance/MyReview/myReviewSlice'
import leadershipEnrollmentListReducer from './reducers/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListSlice'
import leadershipEnrollmentFormReducer from './reducers/Achievements/LeadershipEnrollmentForm/LeadershipEnrollmentFormSlice'
import pipListReducer from './reducers/Performance/PIPList/pipListSlice'
import reviewListReducer from './reducers/Performance/ReviewList/reviewListSlice'
import KRAReducer from './reducers/Performance/KRA/KRASlice'
import appraisalTemplateReducer from './reducers/Performance/AppraisalTemplate/AppraisalTemplateSlice'
import projectStatusReducer from './reducers/ProjectManagement/Project/ProjectView/Status/projectStatusSlice'
import processAreaReducer from './reducers/Settings/ProcessArea/ProcessAreaSlice'
import addNewAuditFormReducer from './reducers/SQAAuditReport/addNewAuditSlice'
import sqaAuditReportReducer from './reducers/SQAAuditReport/sqaAuditReportSlice'
import notificationReducer from './reducers/Notifications/notificationSlice'
import jobVacanciesReducer from './reducers/Recruitment/JobOpenings/jobOpeningsSlice'
import intervieweeDetailsReducer from './reducers/Recruitment/IntervieweeDetails/IntervieweeDetailsSlice'
import candidateListReducer from './reducers/Recruitment/CandidateList/CandidateListSlice'
import vendorListReducer from './reducers/Assets/VendorList/vendorListSlice'
import addNewVendorReducer from './reducers/Assets/VendorList/AddVendorDetails/addVendorDetailsSlice'
import changeReporteesReducer from './reducers/Settings/ChangeReportees/changeReporteesSlice'
import ManufacturerListReducer from './reducers/Assets/ManufacturerList/ManufacturerSliceList'
import ProductTypeListReducer from './reducers/Assets/ProductTypeList/ProductTypeSlice'
import assetsWarrantyListReducer from './reducers/Assets/AssetWarrantyReport/assetsWarrantyReportSlice'
import categoryListReducer from './reducers/ExpenseManagement/Category/expenseCategoryListSlice'
import addNewExpenseCategoryReducer from './reducers/ExpenseManagement/Category/AddNewExpenseCategory/addNewExpenseCategorySlice'
import assetListReducer from './reducers/Assets/AssetList/AssetListSlice'
import assetTransactionListReducer from './reducers/Assets/AssetTransactionList/assetTransactionListSlice'
import productSpecificationListReducer from './reducers/Assets/ProductSpecificationList/ProductSpecificationListSlice'
import recruitmentHistoryReducer from './reducers/MyProfile/RecruitmentHistory/recruitmentHistorySlice'
import addProductReducer from './reducers/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListSlice'
import subCategoryReducer from './reducers/ExpenseManagement/Sub-Category/expenseSubCategoryListSlice'
import upComingJoinListReducer from './reducers/Recruitment/UpComingJoinList/upComingJoinListSlice'
import interviewStatusReportReducer from './reducers/Recruitment/InterviewStatusReport/InterviewStatusReportSlice'

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
  employeeLeaveApply: employeeLeaveApplyReducer,
  scheduledInterviews: scheduledInterviewsReducer,
  addMailTemplateType: addMailTemplateTypeReducer,
  myAttendance: myAttendanceReducer,
  ticketReport: ticketReportReducer,
  jobOpenings: jobOpeningsReducer,
  projectManagement: projectManagementReducer,
  allocateEmployee: allocateEmployeeReducer,
  clients: clientsReducer,
  addNewClient: addClientReducer,
  clientInformation: clientInformationReducer,
  employeeLeaveSummary: leaveSummaryReducer,
  tickets: myTicketsReducer,
  ticketApprovals: ticketApprovalsReducer,
  addTrackerLists: addTrackerListReducer,
  raiseNewTicket: createNewTicketReducer,
  upcomingEmployeeBirthday: UpcomingBirthdayReducer,
  employeesBirthdayList: birthdaysListReducer,
  holidays: holidaysReducer,
  earnedLeaves: earnedLeavesReducer,
  weeklyTimeInOffice: timeInOfficeReducer,
  trainingsAndEvents: trainingAndEventsReducer,
  probationPeriod: provisionPeriodReducer,
  achievements: achievementsReducer,
  addLocationList: addLocationListReducer,
  updateTicket: updateTicketReducer,
  bookingList: bookingListReducer,
  leaveReport: leaveReportReducer,
  eventTypeList: eventTypeListReducer,
  newBooking: newBookingReducer,
  employeeAllocationReport: employeeAllocationReportReducer,
  eventList: eventListReducer,
  roomList: addRoomList,
  dashboardEmployeeSearch: employeeProfileSearchReducer,
  ticketConfiguration: ticketConfigurationReducer,
  appraisalConfigurations: appraisalConfigurationsReducer,
  submitViewResignation: submitViewResignationReducer,
  addConfiguration: addConfigurationReducer,
  projectReport: projectReportReducer,
  leaveApprovals: leaveApprovalsReducer,
  itDeclarationForm: itDeclarationFormReducer,
  newEvent: newEventReducer,
  paySlips: paySlipsReducer,
  panDetails: panDetailsReducer,
  bankDetails: bankDetailsReducer,
  resignationList: resignationListReducer,
  employeeAccounts: employeeAccountsReducer,
  itDeclarationList: itDeclarationListReducer,
  investmentCheckList: investmentCheckListReducer,
  payrollManagement: payrollManagementReducer,
  achieverList: achieverListReducer,
  commonAchievements: commonAchievementsReducer,
  addAchiever: addAchieverReducer,
  nomineeList: nomineeListReducer,
  addNominee: addNomineeReducer,
  projectCreationRequest: projectCreationRequestReducer,
  projectViewDetails: projectViewDetailsReducer,
  projectTimeLine: projectTimeLineReducer,
  projectChangeRequest: projectChangeRequestReducer,
  projectMileStone: projectMileStoneReducer,
  projectInvoices: projectInvoicesReducer,
  projectTailoring: projectTailoringReducer,
  projectTimeSheet: projectTimeSheetReducer,
  projectProposals: projectProposalsReducer,
  projectNotes: projectNotesReducer,
  addProjectCreationRequest: addProjectCreationRequestReducer,
  initiateCycle: initiateCycleReducer,
  myKRAs: MyKRAsReducer,
  myReview: myReviewReducer,
  leadershipEnrollmentList: leadershipEnrollmentListReducer,
  leadershipEnrollmentForm: leadershipEnrollmentFormReducer,
  pipList: pipListReducer,
  reviewList: reviewListReducer,
  KRA: KRAReducer,
  appraisalTemplate: appraisalTemplateReducer,
  projectStatus: projectStatusReducer,
  processArea: processAreaReducer,
  addNewAuditForm: addNewAuditFormReducer,
  sqaAuditReport: sqaAuditReportReducer,
  notification: notificationReducer,
  jobVacancies: jobVacanciesReducer,
  intervieweeDetails: intervieweeDetailsReducer,
  candidateList: candidateListReducer,
  vendorList: vendorListReducer,
  addNewVendor: addNewVendorReducer,
  changeReportees: changeReporteesReducer,
  manufacturerList: ManufacturerListReducer,
  ProductTypeList: ProductTypeListReducer,
  assetsWarrantyList: assetsWarrantyListReducer,
  categoryList: categoryListReducer,
  addNewCategory: addNewExpenseCategoryReducer,
  assetList: assetListReducer,
  assetTransactionList: assetTransactionListReducer,
  productSpecificationList: productSpecificationListReducer,
  recruitmentHistory: recruitmentHistoryReducer,
  addProduct: addProductReducer,
  subCategoryList: subCategoryReducer,
  upComingJoinList: upComingJoinListReducer,
  interviewStatusReport: interviewStatusReportReducer,
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
