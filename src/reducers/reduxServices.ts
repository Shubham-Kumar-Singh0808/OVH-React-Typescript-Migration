import addNewEmployeeService from './EmployeeDirectory/EmployeesList/AddNewEmployee'
import { appService } from './appSlice'
import { attendanceReportService } from './TimeAndAttendance/AttendanceReport/attendanceReportSlice'
import { authenticationService } from './Login/authenticationSlice'
import { basicInformationService } from './MyProfile/BasicInfoTab/basicInformatiomSlice'
import { categoryService } from './MyProfile/Categories/categorySlice'
import { certificateListService } from './EmployeeDirectory/CertificatesList/certificatesListSlice'
import { certificateTypeService } from './EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypeSlice'
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
import { userAccessToFeaturesService } from './Settings/UserRolesConfiguration/userAccessToFeaturesSlice'
import { technologyService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/getAllTechnologySlice'
import { employeeReportService } from './EmployeeDirectory/EmployeeReport/'
import { employeeDesigationReportService } from './EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/employeeDesignationReportSlice'
import { visaListService } from './EmployeeDirectory/VisaList/visaListSlice'
import { EmployeeHandbookService } from './EmployeeHandbook/employeeHandbookSlice'
import { ShowHandbookService } from './EmployeeHandbook/showHandbookSlice'
import { employeeHandbookSettingService } from './EmployeeHandbook/HandbookSettings/employeeHandbookSettingSlice'
import { timeInOfficeReportService } from './TimeAndAttendance/TimeInOfficeReport/timeInOfficeReportSlice'
import { employeeLeaveSettingsService } from './Settings/LeaveSettings/employeeLeaveSettingsSlice'
import { countryService } from './EmployeeDirectory/EmployeesList/AddNewEmployee/countriesSlice'
import { hiveActivityReportService } from './TimeAndAttendance/HiveActivityReport/hiveActivityReportSlice'
import { employeeMailConfigurationService } from './Settings/MailConfiguration/employeeMailConfigurationSlice'
import { addTemplateService } from './Settings/MailConfiguration/AddTemplate/addMailTemplateSlice'
import { employeeService } from './EmployeeDirectory/EmployeesList/EditEmployee'
import { employeeLeaveApplyServices } from './Leaves/ApplyLeave/employeeApplyLeaveSlice'
import { scheduledInterviewsService } from './Recruitment/ScheduledInterviews/scheduledInterviewsSlice'
import { mailTemplateTypeService } from './Settings/MailConfiguration/AddMailTemplateType/addMailTemplateTypeSlice'
import { myAttendanceService } from './TimeAndAttendance/MyAttendance/myAttendanceSlice'
import { leaveReportService } from './Leaves/LeaveReports/leaveReportSlice'
import { ticketReportService } from './Support/Report/ticketReportSlice'
import { clientsService } from './ProjectManagement/Clients/clientsSlice'
import { addNewClientService } from './ProjectManagement/Clients/AddClient/addNewClientSlice'
import { clientInformationService } from './ProjectManagement/Clients/ClientInformation/clientInformationSlice'
import { leaveSummaryService } from './Leaves/LeaveSummary/employeeLeaveSummarySlice'
import { myTicketsService } from './Support/MyTickets/myTicketsSlice'
import { ticketApprovalsService } from './Support/TicketApprovals/ticketApprovalsSlice'
import { createNewTicketService } from './Support/RaiseTicket/createNewTicketSlice'
import { jobVacanciesService } from './Dashboard/jobOpeningsSlice'
import { birthdaysListService } from './Dashboard/birthdayListSlice'
import { upcomingBirthdaysService } from './Dashboard/birthdayAnniversarySlice'
import { holidaysService } from './Dashboard/holidaysSlice'
import { earnedLeavesService } from './Dashboard/earnedLeavesSlice'
import { weeklyTimeInOfficeService } from './Dashboard/timeInOfficeSlice'
import { trainingsAndEventsService } from './Dashboard/trainingsAndEventsSlice'
import { provisionPeriodService } from './Dashboard/provisionPeriodSlice'
import { employeeAchievementsService } from './Dashboard/achievementsSlice'
import { updateTicketService } from './Support/TicketApprovals/UpdateTicket/updateTicketSlice'
import { bookingListService } from './ConferenceRoomBooking/BookingList/bookingListSlice'
import { eventTypeListService } from './ConferenceRoomBooking/NewEvent/EventTypeList/eventTypeListSlice'
import { employeeAllocationSliceService } from './ProjectManagement/EmployeeAllocation/employeeAllocationSlice'
import { addLocationListService } from './ConferenceRoomBooking/NewBooking/LocationList/locationListSlice'
import { newBookingService } from './ConferenceRoomBooking/NewBooking/newBookingSlice'
import { addTrackerListService } from './Support/RaiseTicket/TrackerList/trackerListSlice'
import { eventListService } from './ConferenceRoomBooking/EventList/eventListSlice'
import { employeeSearchService } from './Dashboard/searchEmployeeSlice'
import { ticketConfigurationService } from './Settings/TicketConfiguration/ticketConfigurationSlice'
import { allocateEmployeeService } from './ProjectManagement/AllocateEmployee/allocateEmployeeSlice'
import { appraisalCycleService } from './Settings/Configurations/appraisalConfigurationsSlice'
import { roomListService } from './ConferenceRoomBooking/NewBooking/RoomList/roomListSlice'
import { submitViewResignationServices } from './Separation/SubmitViewResignation/submitResignationSlice'
import { addConfigurationService } from './Settings/Configurations/AddConfiguration/addConfigurationSlice'
import { projectManagementService } from './ProjectManagement/Project/AddEditPraject/AddEditProjectSlice'
import { projectReportsService } from './ProjectManagement/Project/projectReportSlice'
import { newEventService } from './ConferenceRoomBooking/NewEvent/newEventSlice'
import { leaveApprovalsService } from './Leaves/LeaveApprovals/leaveApprovalsSlice'
import { itDeclarationFormService } from './Finance/ITDeclarationForm/itDeclarationFormSlice'
import { paySlipsService } from './Finance/Payslips/payslipsSlice'
import { panDetailService } from './Finance/PanDetails/panDetailsSlice'
import { bankDetailService } from './Finance/PanDetails/bankDetailsSlice'
import { resignationListService } from './Separation/ResignationList/resignationListSlice'
import { employeeAccountService } from './Finance/EmployeeAccounts/employeeAccountsSlice'
import { itDeclarationListService } from './Finance/ITDeclarationList/itDeclarationListSlice'
import { investmentCheckListService } from './Finance/InvestmentCheckList/investmentCheckListSlice'
import { payrollManagementService } from './Finance/PayrollManagement/PayrollManagementSlice'
import { achieverListService } from './Achievements/AchieverList/AchieverListSlice'
import { commonAchievementsService } from './Achievements/CommonAchievementsSlice'
import { projectCreationRequestService } from './ProjectManagement/ProjectCreationRequests/projectCreationRequestsSlice.'
import { addProjectCreationRequestService } from './ProjectManagement/ProjectCreationRequests/AddProjectCreationRequest/addProjectCreationRequestSlice'
import { addAchieverServices } from './Achievements/AddAchiever/AddAchieverSlice'
import { projectViewService } from './ProjectManagement/Project/ProjectView/projectViewSlice'
import { projectTimeLineService } from './ProjectManagement/Project/ProjectView/ProjectTimeLine/projectTimeLineSlice'
import { changeRequestService } from './ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestSlice'
import { mileStoneService } from './ProjectManagement/Project/ProjectView/MileStone/mileStoneSlice'
import { invoicesService } from './ProjectManagement/Project/ProjectView/Invoices/invoicesSlice'
import { projectTailoringService } from './ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringSlice'
import { projectHiveActivityReportService } from './ProjectManagement/Project/ProjectView/ProjectTimeSheet/projectTimeSheetSlice'
import { projectProposalsService } from './ProjectManagement/Project/ProjectView/Proposals/projectProposalsSlice'
import { projectNotesService } from './ProjectManagement/Project/ProjectView/Notes/projectNotesSlice'
import { initiateCycleService } from './Settings/InitiateCycle/initiateCycleSlice'
import { myKRAsService } from './Performance/MyKRAs/myKRAsSlice'
import { nomineeListService } from './Achievements/NomineeList/NomineeListSlice'
import { addNomineeService } from './Achievements/AddNominee/AddNomineeSlice'
import { myReviewService } from './Performance/MyReview/myReviewSlice'
import { leadershipEnrollmentListService } from './Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListSlice'
import { leadershipEnrollmentFormService } from './Achievements/LeadershipEnrollmentForm/LeadershipEnrollmentFormSlice'
import { pipListService } from './Performance/PIPList/pipListSlice'
import { reviewListService } from './Performance/ReviewList/reviewListSlice'
import { KRAService } from './Performance/KRA/KRASlice'
import { appraisalTemplateService } from './Performance/AppraisalTemplate/AppraisalTemplateSlice'
import { projectStatusService } from './ProjectManagement/Project/ProjectView/Status/projectStatusSlice'
import { processAreaService } from './Settings/ProcessArea/ProcessAreaSlice'
import { addNewAuditService } from './SQAAuditReport/addNewAuditSlice'
import { sqaAuditReportService } from './SQAAuditReport/sqaAuditReportSlice'
import { notificationService } from './Notifications/notificationSlice'
import { jobOpeningsService } from './Recruitment/JobOpenings/jobOpeningsSlice'
import { intervieweeDetailsService } from './Recruitment/IntervieweeDetails/IntervieweeDetailsSlice'
import { candidateListService } from './Recruitment/CandidateList/CandidateListSlice'
import { vendorListService } from './Assets/VendorList/vendorListSlice'
import { addNewVendorService } from './Assets/VendorList/AddVendorDetails/addVendorDetailsSlice'
import { changeReporteesService } from './Settings/ChangeReportees/changeReporteesSlice'
import { ManufacturerListService } from './Assets/ManufacturerList/ManufacturerSliceList'
import { assetsWarrantyListService } from './Assets/AssetWarrantyReport/assetsWarrantyReportSlice'
import { ProductTypeListService } from './Assets/ProductTypeList/ProductTypeSlice'
import { categoryListService } from './ExpenseManagement/Category/expenseCategoryListSlice'
import { addNewCategoryService } from './ExpenseManagement/Category/AddNewExpenseCategory/addNewExpenseCategorySlice'
import { assetListService } from './Assets/AssetList/AssetListSlice'
import { changeStatusService } from './Assets/AssetList/ChangeStatus/ChangeStatusSlice'
import { productSpecificationListService } from './Assets/ProductSpecificationList/ProductSpecificationListSlice'
import { recruitmentHistoryServices } from './MyProfile/RecruitmentHistory/recruitmentHistorySlice'
import { addProductService } from './Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListSlice'
import { subCategoryListService } from './ExpenseManagement/Sub-Category/expenseSubCategoryListSlice'
import { upComingJoiningListService } from './Recruitment/UpComingJoinList/upComingJoinListSlice'
import { interviewStatusReportServices } from './Recruitment/InterviewStatusReport/InterviewStatusReportSlice'
import { userRolesConfigurationsServices } from './Settings/UserRolesConfiguration/UserRolesConfigurationSlice'

export const reduxServices = {
  app: appService,
  authentication: authenticationService,
  category: categoryService,
  skill: skillService,
  employeeList: employeeListService,
  profileHistory: profileHistoryService,
  personalInformation: personalInfoService,
  userRolesConfigurations: userRolesConfigurationsServices,
  employeeDesignation: employeeDesignationListService,
  newEmployee: addNewEmployeeService,
  employeeCertifications: employeeCertificateService,
  employeeQualifications: employeeQualificationService,
  employeeQualificationCategory: qualificationCategoryService,
  basicInformation: basicInformationService,
  generalInformation: generalInformationService,
  employeeSkill: employeeSkillServices,
  employeeReviews: employeeReviewsService,
  employeeProjects: employeeProjectsService,
  shiftConfiguration: shiftConfigurationService,
  employeeReportees: employeeReporteesService,
  certificateList: certificateListService,
  employeeAssets: employeeAssetsService,
  certificateType: certificateTypeService,
  employeeReports: employeeReportService,
  employeeDesignationReports: employeeDesigationReportService,
  visaList: visaListService,
  EmployeeHandbook: EmployeeHandbookService,
  ShowHandbook: ShowHandbookService,
  employeeAttendanceReport: attendanceReportService,
  userAccessToFeatures: userAccessToFeaturesService,
  employeeHandbookSettings: employeeHandbookSettingService,
  employeeLeaveSettings: employeeLeaveSettingsService,
  technology: technologyService,
  country: countryService,
  timeInOfficeReport: timeInOfficeReportService,
  hiveActivityReport: hiveActivityReportService,
  employeeMailConfiguration: employeeMailConfigurationService,
  addNewMailTemplate: addTemplateService,
  employee: employeeService,
  employeeApplyLeave: employeeLeaveApplyServices,
  scheduledInterviews: scheduledInterviewsService,
  addNewMailTemplateType: mailTemplateTypeService,
  myAttendance: myAttendanceService,
  leaveReport: leaveReportService,
  ticketReport: ticketReportService,
  projectManagement: projectManagementService,
  allocateEmployee: allocateEmployeeService,
  clients: clientsService,
  addClient: addNewClientService,
  clientInformation: clientInformationService,
  employeeLeaveSummary: leaveSummaryService,
  tickets: myTicketsService,
  ticketApprovals: ticketApprovalsService,
  raiseNewTicket: createNewTicketService,
  jobOpenings: jobVacanciesService,
  birthdaysList: birthdaysListService,
  upcomingBirthdays: upcomingBirthdaysService,
  holidays: holidaysService,
  earnedLeaves: earnedLeavesService,
  weeklyTimeInOffice: weeklyTimeInOfficeService,
  trainingsAndEvents: trainingsAndEventsService,
  employeeProbationPeriod: provisionPeriodService,
  employeeAchievements: employeeAchievementsService,
  updateTicket: updateTicketService,
  bookingList: bookingListService,
  eventTypeList: eventTypeListService,
  addLocationList: addLocationListService,
  newBooking: newBookingService,
  employeeAllocationReport: employeeAllocationSliceService,
  addTrackerLists: addTrackerListService,
  eventList: eventListService,
  roomLists: roomListService,
  searchEmployee: employeeSearchService,
  ticketConfiguration: ticketConfigurationService,
  appraisalConfigurations: appraisalCycleService,
  submitViewResignation: submitViewResignationServices,
  addConfigurations: addConfigurationService,
  projectReport: projectReportsService,
  newEvent: newEventService,
  leaveApprovals: leaveApprovalsService,
  itDeclarationForm: itDeclarationFormService,
  paySlips: paySlipsService,
  panDetails: panDetailService,
  bankDetails: bankDetailService,
  resignationList: resignationListService,
  employeeAccount: employeeAccountService,
  itDeclarationList: itDeclarationListService,
  investmentCheckList: investmentCheckListService,
  payrollManagement: payrollManagementService,
  achieverList: achieverListService,
  addAchiever: addAchieverServices,
  commonAchievements: commonAchievementsService,
  nomineeList: nomineeListService,
  addNominee: addNomineeService,
  projectCreationRequest: projectCreationRequestService,
  projectViewDetails: projectViewService,
  projectTimeLine: projectTimeLineService,
  projectChangeRequest: changeRequestService,
  projectMileStone: mileStoneService,
  projectInvoices: invoicesService,
  projectTailoring: projectTailoringService,
  projectTimeSheet: projectHiveActivityReportService,
  projectProposals: projectProposalsService,
  projectNotes: projectNotesService,
  addProjectCreationRequest: addProjectCreationRequestService,
  initiateCycle: initiateCycleService,
  myKRAs: myKRAsService,
  myReview: myReviewService,
  leadershipEnrollmentList: leadershipEnrollmentListService,
  leadershipEnrollmentForm: leadershipEnrollmentFormService,
  pipList: pipListService,
  reviewList: reviewListService,
  KRA: KRAService,
  appraisalTemplate: appraisalTemplateService,
  projectStatus: projectStatusService,
  processArea: processAreaService,
  addNewAuditForm: addNewAuditService,
  sqaAuditReport: sqaAuditReportService,
  notification: notificationService,
  jobVacancies: jobOpeningsService,
  vendorList: vendorListService,
  addNewVendor: addNewVendorService,
  changeReportees: changeReporteesService,
  intervieweeDetails: intervieweeDetailsService,
  candidateList: candidateListService,
  ManufacturerList: ManufacturerListService,
  ProductTypeList: ProductTypeListService,
  assetList: assetListService,
  assetsWarrantyList: assetsWarrantyListService,
  changeStatus: changeStatusService,
  categoryList: categoryListService,
  addNewCategory: addNewCategoryService,
  productSpecificationList: productSpecificationListService,
  recruitmentHistory: recruitmentHistoryServices,
  addNewProduct: addProductService,
  subCategoryList: subCategoryListService,
  upComingJoinList: upComingJoiningListService,
  interviewStatusReport: interviewStatusReportServices,
}
