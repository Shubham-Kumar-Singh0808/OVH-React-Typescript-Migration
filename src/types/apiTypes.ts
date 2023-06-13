import { Method, ResponseType } from 'axios'

export type AuthenticatedRequestConfig = {
  url: string
  method: Method
  headers: { tenantKey: string; [key: string]: string | number }
  params?: { [key: string]: string | number | boolean | undefined | number[] }
  paramsSerializer: any
  data?:
    | { [key: string]: string | number | unknown }
    | unknown
    | string
    | number
  responseType?: ResponseType
}

export interface ApiBase {
  get?: string
  insert?: string
  update?: string
  delete?: string
}

export interface AuthenticationApi extends ApiBase {
  login: string
  logout: string
}
export interface SideMenuApi extends ApiBase {
  getMenuData: string
}

export interface CategoryApi extends ApiBase {
  getAllCategories: string
  addCategory: string
  deleteCategory: string
}
// export interface PersonalInfoApi extends ApiBase {
//   getFamilyDetails: string
//   getVisaDetails: string
//   getCountryDetails: string
//   getVisaTypeDetails: string
//   addNewVisaMember: string
//   getFamilyInformation: string
//   updateFamilyInformation: string
//   addNewFamilyMember: string
//   getVisaInformation: string
//   updateVisaInformation: string
//   deleteFamilyMember: string
//   deleteVisaDetail: string
//   fileUploadVisaImage: string
// }

export interface SkillApi extends ApiBase {
  getSkillListForCategory: string
  addNewSkillForCategory: string
  deleteSkillForCategory: string
}

export interface EmployeeSkillApi extends ApiBase {
  getEmployeeSkills: string
  addEmployeeSkill: string
  getEmployeeSkillInformation: string
  updateEmployeeSkillInformation: string
  deleteEmployeeSkill: string
  getEmployeeSkillsById: string
}

export interface EmployeeQualificationCategoryApi extends ApiBase {
  getQualificationCategories: string
  createQualificationCategory: string
  deleteQualificationCategory: string
}
export interface EmployeeGeneralInformationApi extends ApiBase {
  getLoggedInEmployeeData: string
}

// export interface PersonalInfoApi extends ApiBase {
//   getFamilyDetails: string
// }
export interface EmployeeQualificationsApi extends ApiBase {
  getEmployeeQualifications: string
  getPostGraduationAndGraduationLookUp: string
  addEmployeeQualifications: string
  updateEmployeeQualifications: string
}

export interface EmployeeCertificationsApi extends ApiBase {
  getEmployeeCertificates: string
  getTechnologies: string
  getCertificateByTechnology: string
  createEmployeeCertification: string
  getEmployeeCertificate: string
  updateEmployeeCertificate: string
  deleteEmployeeCertificate: string
  getEmployeeCertificateById: string
}

export interface UserRolesConfigurationApi extends ApiBase {
  getUserRoles: string
  isUserRoleExists: string
  createUserRole: string
  deleteUserRole: string
  getSubFeatures: string
  featuresUnderRole: string
  assignPermission: string
}

export interface PersonalInfoApi extends ApiBase {
  getFamilyDetails: string
  getVisaDetails: string
  getCountryDetails: string
  getVisaTypeDetails: string
  addNewVisaMember: string
  getFamilyInformation: string
  updateFamilyInformation: string
  addNewFamilyMember: string
  getVisaInformation: string
  updateVisaInformation: string
  deleteFamilyMember: string
  deleteVisaDetail: string
  fileUploadVisaImage: string
  fileUploadPassportImage: string
}

export interface ProfileHistoryApi extends ApiBase {
  getprofileHistory: string
}
export interface BasicInfoApi extends ApiBase {
  defaultPicByGender: string
  updateEmployeeDetails: string
  uploadEmployeeCV: string
  uploadEmployeeImage: string
  downloadEmployeeCV: string
  downloadSampleCV: string
}

export interface EmployeeReviewsApi extends ApiBase {
  getEmployeeReviews: string
}
export interface EmployeeListApi extends ApiBase {
  getEmployeeList: string
  exportEmployeeData: string
}

export interface EmployeeDesignationListApi extends ApiBase {
  getEmployeeDepartments: string
  getEmployeeDesignations: string
  addEmployeeDesignation: string
  deleteEmployeeDesignation: string
  getAllEmployeeDesignation: string
}

export interface ShiftConfigurationApi extends ApiBase {
  getAllShifts: string
  addTimeSlot: string
  updateShiftDetail: string
  deleteShiftDetail: string
}

export interface CertificateListApi extends ApiBase {
  getAllEmployeeCertificates: string
  exportCertificateList: string
}

export interface EmployeeAssetsApi extends ApiBase {
  getEmployeeAssets: string
}

export interface CertificateTypeApi extends ApiBase {
  getCertificateTypes: string
  addCertificateType: string
  checkIsCertificateTypeExists: string
  deleteCertificateType: string
  getCertificateType: string
  updateCertificateType: string
}

export interface EmployeeProjectsApi extends ApiBase {
  getEmployeeProjects: string
  getProjectDetails: string
  getProjectsClients: string
}

export interface EmployeeReporteesApi extends ApiBase {
  getEmployeeReportees: string
  getEmployeeReporteesKRAs: string
  getEmployeeReporteesKPIs: string
}

export interface EmployeeReportApi extends ApiBase {
  getEmployeeReports: string
  getCountries: string
}

export interface EmployeeDesignationReportApi extends ApiBase {
  getAllDesignations: string
  getEmployeeCategoryData: string
  exportEmployeeCategoryData: string
}

export interface VisaListApi extends ApiBase {
  getVisaList: string
  getCountries: string
  getVisaTypes: string
  exportVisaList: string
}

export interface EmployeeHandbook extends ApiBase {
  getHandbooks: string
}

export interface DisplayHandbook extends ApiBase {
  dispHandbook: string
}

export interface EmployeeAttendanceReportApi extends ApiBase {
  getEmployeeAttendance: string
  exportAttendance: string
  exportBiometricAttendance: string
}

export interface UserAccessToFeaturesApi extends ApiBase {
  getUserAccessToFeatures: string
}

export interface EmployeeHandbookSettingsApi extends ApiBase {
  getTotalHandbookList: string
  getEmployeeCountries: string
  addNewHandbook: string
  getEmployeeHandbooks: string
  deleteEmployeeHandbook: string
  getSelectedCountries: string
  updateEmployeeHandbook: string
}

export interface TimeInOfficeReportApi extends ApiBase {
  getTimeInOfficeEmployeeReport: string
  getTimeInOfficeManagerReport: string
  exportAttendanceReport: string
}

export interface EmployeeLeaveSettingsApi extends ApiBase {
  saveLeaveCalendarSettings: string
  getLeaveCategories: string
  getLeaveCalenderSettings: string
  deleteLeaveCategory: string
  addUpdateLeaveCategory: string
}

export interface AddNewEmployeeAPi extends ApiBase {
  getEmployeeDepartments: string
  getEmpCountries: string
  getAllHrData: string
  getAllReportingManagersData: string
  addNewEmployee: string
  getAllemploymentType: string
  getAllJobType: string
  getCheckIfUserExist: string
  editEmployee: string
}

export interface HiveActivityReportApi extends ApiBase {
  getEmployeeHiveActivityReport: string
  getManagerHiveActivityReport: string
  getSearchHiveTime: string
  exportHiveReport: string
}
export interface EmployeeMailConfigurationApi extends ApiBase {
  getMailTemplates: string
  getMailTemplateTypes: string
  exportMailTemplatesList: string
  updateMailTemplate: string
  deleteMailTemplate: string
}

export interface AddNewTemplateApi extends ApiBase {
  getAssetTypes: string
  addNewMailTemplate: string
}

export interface ApplyLeaveApi extends ApiBase {
  getLeaveType: string
  applyLeave: string
}
export interface ScheduledInterviewsApi extends ApiBase {
  searchScheduledCandidatesForEmployee: string
  searchScheduledCandidates: string
  downloadScheduleCandidates: string
}

export interface AddNewMailTemplateTypeApi extends ApiBase {
  getMailTemplateTypes: string
  addNewMailTemplateType: string
  deleteMailTemplateType: string
  updateMailTemplateType: string
}

export interface MyAttendanceApi extends ApiBase {
  getMyAttendance: string
}

export interface LeaveReportsApi extends ApiBase {
  getLeaveSummaries: string
  searchLeaveSummaries: string
  creditedYears: string
  financialYear: string
  downloadLeaveReportList: string
}

export interface AllocateEmployeeApi extends ApiBase {
  getAllEmployeeProfiles: string
  getAllProjectSearch: string
  allocateNewEmployee: string
}

export interface TicketReportApi extends ApiBase {
  getDepartmentNameList: string
  departmentCategoryList: string
  getTicketsReport: string
  getTicketsDetails: string
  exportTicketReports: string
}
export interface ProjectManagementApi extends ApiBase {
  getProject: string
  addProject: string
  updateProject: string
  getAllPlatforms: string
  getAllDomains: string
  getAllManagers: string
  getActiveProjectReports: string
  getSearchAllocationReport: string
  getClientProjects: string
  getCloseProject: string
  getDeleteProject: string
  postDeallocateProject: string
  postUpdateAllocateProject: string
  exportProjectList: string
}

export interface ClientsApi extends ApiBase {
  getClients: string
  getProjectsUnderClient: string
  searchClients: string
  deleteClient: string
  editClient: string
  updateClient: string
  getClientCountries: string
  clientOrg: string
}

export interface AddNewClientApi extends ApiBase {
  getClientCountries: string
  addNewClient: string
  checkClientOrgExist: string
}

export interface ClientInformationApi extends ApiBase {
  getClientInformation: string
}

export interface LeaveSummaryApi extends ApiBase {
  getEmployeeLeaveSummary: string
  getEmployeeLeaveHistory: string
  cancelEmployeeLeave: string
  cancelAfterApproval: string
}
export interface TicketListInformationApi extends ApiBase {
  getTicketListInformation: string
  exportTicketList: string
  ticketHistoryDetails: string
  cancelTicket: string
}
export interface TicketApprovalsApi extends ApiBase {
  getDepartmentNameList: string
  getAllTrackerList: string
  getAllLookups: string
  departmentCategoryList: string
  subCategoryList: string
  getAllTicketsForApproval: string
  exportTicketApprovalList: string
  rejectManagerTicket: string
}
export interface AddTrackerApi extends ApiBase {
  addNewTracker: string
  deleteTracker: string
}

export interface RaiseNewTicketApi extends ApiBase {
  createNewTicket: string
  uploadSupportTicketsDocument: string
}
export interface DashboardApi extends ApiBase {
  getAllJobVacancies: string
  getUpcomingBirthdayAnniversaries: string
  getAllEmployeesBirthdayList: string
  getUpcomingHolidays: string
  getAllUpcomingHolidaysList: string
  addHoliday: string
  getFinancialYear: string
  getEmployeeTimeInOffice: string
  getUpcomingTrainings: string
  getUpcomingEvents: string
  getEmployeesUnderProbationPeriod: string
  getAllAchievements: string
  deleteHoliday: string
  getHolidayInformation: string
  updateHoliday: string
  searchEmployee: string
  getLeaveSummary: string
  imageFix: string
}
export interface AddLocationListApi extends ApiBase {
  getAllMeetingLocations: string
  addLocation: string
  deleteLocation: string
}

export interface UpdateTicketApi extends ApiBase {
  getTicket: string
  getActiveEmployeeList: string
  getAudit: string
  uploadSupportTicketDocuments: string
  updateIndividualTickets: string
  approveTicketByManager: string
}

export interface BookingListApi extends ApiBase {
  getRoomsOfLocation: string
  getAllMeetingLocations: string
  getBookingsForSelection: string
  cancelRoomBooking: string
  editMeeting: string
  confirmUpdateMeetingRequest: string
  uniqueAttendee: string
  Completed: string
  InProgress: string
}
export interface EventTypeListApi extends ApiBase {
  getAllEventTypes: string
  addEventType: string
  deleteEventType: string
  updateEventType: string
}
export interface NewEventApi extends ApiBase {
  getLoggedEmployeeName: string
  getRoomsOfLocation: string
  getAllProfileEmployeesData: string
  getAllAttendees: string
  uniqueAttendee: string
  timeChecking: string
  getAllBookedDetailsForEvent: string
  addNewEvent: string
}
export interface EmployeeAllocationApi extends ApiBase {
  getEmployeeAllocationReport: string
  projectUnderEmployees: string
  updateEmployeeAllocateProject: string
  downloadEmployeeAllocationList: string
}

export interface EventListApi extends ApiBase {
  getAllEvents: string
  cancelEvent: string
  getFeedbackFormList: string
  downloadFeedbackForm: string
  uploadFeedbackForm: string
  editEvent: string
  updateEvent: string
}
export interface AppraisalConfigurationsApi extends ApiBase {
  cycle: string
  editAppraisalCycle: string
  updateAppraisalCycle: string
  validateCycle: string
}
export interface AddConfigurationsApi extends ApiBase {
  addAppraisalCycle: string
}
export interface RoomListApi extends ApiBase {
  getAllMeetingRooms: string
  addRoom: string
  deleteRoom: string
  updateRoom: string
  getRoomsOfLocation: string
  getAllMeetingLocations: string
}

export interface TicketConfigurationApi extends ApiBase {
  getDepartments: string
  getCategories: string
  getSubCategories: string
  getSubCategoryList: string
  deleteSubCategory: string
  ticketHistory: string
  addSubCategory: string
  updateSubCategory: string
  getAllCategory: string
  addCategory: string
  updateCategory: string
  deleteCategory: string
}

export interface SubmitResignationApi extends ApiBase {
  getSeparationForm: string
  submitResignation: string
  getEmployeeResg: string
  revokeResignation: string
}

export interface LeaveApprovalsApi extends ApiBase {
  getEmployees: string
  getEmployeeLeaves: string
  getSearchEmployees: string
  checkProjectManagerExits: string
  leaveApprove: string
  leaveReject: string
}

export interface ITDeclarationFormApi extends ApiBase {
  getEmployeeInfo: string
  getSectionsHavingInvests: string
  getInvestsBySectionId: string
  addITDeclarationForm: string
  isITDeclarationFormExist: string
  uploadITDocuments: string
}
export interface PaySlipsApi extends ApiBase {
  getEmployeePayslipsForSelectedYear: string
  generatePayslipAndDownloadPayslip: string
}

export interface PanDetailsApi extends ApiBase {
  bankInformation: string
  updateFinanceInformation: string
  uploadEmployeeFinanceDetails: string
  downloadFinanceFile: string
}

export interface BankDetailsApi extends ApiBase {
  getBankNameLookup: string
  saveBankInformation: string
  updateBankInformation: string
  deleteBankAccount: string
  editBankInformation: string
}

export interface ResignationListApi extends ApiBase {
  resignationList: string
  exportResignationList: string
  resignationInitiateCC: string
  getSeparationTimeLine: string
  clearanceCertificateComments: string
  getClearanceDetails: string
  updateCCDetails: string
  checkExitFeedBackForm: string
  getSeparationChart: string
  getEmpDetails: string
  saveExitFeedBackForm: string
  uploadExitFeedBackFile: string
  uploadRelievingLetter: string
  updateTimeLine: string
}

export interface ITDeclarationListApi extends ApiBase {
  getEmployeeDetails: string
  getCycles: string
  getSections: string
  getITDeclarationForm: string
  exportITDeclarationList: string
  addCycle: string
  deleteSection: string
  addSection: string
  updateSection: string
  getInvestments: string
  addInvestment: string
  deleteInvestment: string
  deleteCycle: string
  isCycleExist: string
  isSectionExist: string
  updateCycle: string
  updateInvestment: string
  isInvestmentExist: string
  isITFormEditable: string
  editITForm: string
}

export interface InvestmentCheckListApi extends ApiBase {
  getInvestments: string
  getSections: string
}

export interface PayrollManagementApi extends ApiBase {
  getCurrentPayslip: string
  downloadExcelFile: string
  searchEmployee: string
  deletePayslip: string
  updatePayslip: string
  deleteCheckedPayslips: string
  readExcelFile: string
  saveExcelFile: string
  clearDirectory: string
}

export interface CommonAchievementsApi extends ApiBase {
  getAllAchievementsType: string
}

export interface AchieverListApi extends ApiBase {
  getAchieverList: string
  updateShowOnDashbord: string
  achievementHistoryTimeline: string
}

export interface ProjectCreationRequestApi extends ApiBase {
  getAllProjectRequestList: string
  getProjectRequest: string
  getAuditForProjectRequest: string
  getApproveProjectRequest: string
  updateProjectRequest: string
  deleteProjectRequest: string
  rejectProjectRequest: string
}

export interface AddAchieverApi extends ApiBase {
  addAchievementType: string
  getAchievementTypeDetails: string
  updateAchievementTypeDetails: string
  deleteAchievementType: string
  getActiveEmployeeList: string
  addAchievement: string
  getImageData: string
}

export interface NomineeListApi extends ApiBase {
  getAllCycles: string
  getNominations: string
  getNominationDetails: string
  reviewNominee: string
  exportNomineeList: string
}

export interface AddNomineeApi extends ApiBase {
  nominationFormDetails: string
  addNominee: string
}

export interface EmployeeAccountsApi extends ApiBase {
  financeDetails: string
  exportFinanceList: string
}

export interface ProjectDetailsApi extends ApiBase {
  getProjects: string
  getProject: string
  updateProjectDetails: string
}

export interface ProjectTimeLineApi extends ApiBase {
  getProjectHistory: string
}

export interface ProjectChangeRequestApi extends ApiBase {
  getCRList: string
  changeRequest: string
  deleteCR: string
  updateChangeRequest: string
}

export interface ProjectMilestoneApi extends ApiBase {
  mileStonesList: string
  mileStoneHistory: string
  getMilestone: string
  milestoneNewsFeed: string
  uploadImage: string
  postMileStone: string
}
export interface ProjectInvoiceApi extends ApiBase {
  getClosedMilestonesAndCRs: string
  getInvoicesOfMilestone: string
  getInvoiceSummary: string
}

export interface ProjectTailoringApi extends ApiBase {
  getProjectTailoringDocument: string
  getProjectTailoring: string
  saveProjectTailoringDocumentForManager: string
  saveProjectTailoringDocument: string
}

export interface ProjectTimeSheetApi extends ApiBase {
  getProjectTimeSheet: string
}

export interface ProjectProposalApi extends ApiBase {
  projectProposal: string
}

export interface ProjectNotesApi extends ApiBase {
  projectNotesTimeLine: string
  uploadImage: string
}
export interface AddProjectCreationRequestApi extends ApiBase {
  getCheckList: string
  getProjectRequestMailIds: string
  addProjectRequest: string
}
export interface InitiateCycleApi extends ApiBase {
  getActiveCycleData: string
  getallcycles: string
  getAllQuestions: string
  initiateCycle: string
  deleteQuestion: string
  addQuestion: string
  addCycle: string
  editCycle: string
  updateCycle: string
}

export interface MyKRAsApi extends ApiBase {
  getKRAForIndividualEmployee: string
  getKPIsForIndividualEmployee: string
}

export interface NewBookingApi extends ApiBase {
  getLoggedEmployeeName: string
  getAllProfileEmployeesData: string
  getAllProjectSearch: string
  confirmNewMeetingAppointment: string
  getAllMeetingAppointmentList: string
}

export interface LeadershipEnrollmentListApi extends ApiBase {
  getLeadershipList: string
  leadershipApprove: string
  leadershipReject: string
}

export interface LeadershipEnrollmentFormApi extends ApiBase {
  employeeDetails: string
  addLeadership: string
}

export interface KRAApi extends ApiBase {
  getEmpDepartments: string
  getDesignation: string
  searchKRAData: string
  kpiForIndividualKra: string
  deleteKRA: string
  deleteKPI: string
  designationKRAPercentage: string
  checkIfNewKRADuplicate: string
  addNewKRA: string
  editThisKra: string
  updateKRA: string
  getFrequency: string
  addKPI: string
  updateKPI: string
  checkIfNewKpiDuplicate: string
}

export interface MyReviewApi extends ApiBase {
  getEmployeePerformanceReview: string
}

export interface PIPListApi extends ApiBase {
  getAllPIPList: string
  exportPIPList: string
  getPerformanceRatings: string
  activeEmployee: string
  addPIP: string
  viewPipDetails: string
  getPIPHistory: string
  extendPip: string
  removeFromPip: string
  updatePipDetails: string
  savePIPClearnceCertificate: string
}

export interface ReviewListApi extends ApiBase {
  getEmployeeDepartments: string
  getReviewList: string
  getAppraisalCycles: string
  getDesignations: string
  exportReviewList: string
  activeCycle: string
}

export interface AppraisalTemplateApi extends ApiBase {
  cycle: string
  activeCycle: string
  getDesignationsUnderCycle: string
}

export interface ProjectStatusApi extends ApiBase {
  statusReportLis: string
  addStatusReport: string
  deleteStatusReport: string
  updateStatusReport: string
}
export interface ProcessAreaListApi extends ApiBase {
  getProjectTailoringDocument: string
  getProcessAreas: string
  createProcessArea: string
  checkDuplicateProcess: string
  saveProcessArea: string
  incrementOrDecrementOrder: string
  getOrderCountOfActiveProcesses: string
  getProcessAreaDetails: string
  checkforDuplicateDoc: string
}

export interface AddNewAudit extends ApiBase {
  saveNewAuditForm: string
  editAuditFormDetails: string
  getProjectEmployees: string
  updateSQAAuditForm: string
}
export interface SQAAuditReportApi extends ApiBase {
  getSQAAuditReport: string
  exportSqaAuditReport: string
  deleteProjectAuditDetails: string
  closeAudit: string
  getNewSQAAuditTimelineDetails: string
  getAuditDetails: string
  saveOrSubmitAuditForm: string
  downloadSQAAuditFile: string
}

export interface NotificationsApi extends ApiBase {
  allAlerts: string
  updateAlert: string
}

export interface JobOpeningsApi extends ApiBase {
  getAllJobVacancies: string
  getAllTechnology: string
  addJobVacancy: string
  deleteJobVacancy: string
  getJobOpeningById: string
  getJobVacancyAudit: string
  updateJobVacancy: string
  isCandidateMappedWithJob: string
}

export interface ChangeReporteesApi extends ApiBase {
  getAllReportingManagerData: string
  getAllHRList: string
  getEmployeesUnderManger: string
  getHrAssociates: string
  updateReportingManager: string
  updateHrAssociatesManager: string
}

export interface IntervieweeDetailsApi extends ApiBase {
  timelinedetails: string
  saveInitialComments: string
  updateCandidateInterviewStatus: string
  empScheduleInterviewDetails: string
  updateInterview: string
}
export interface CandidateListApi extends ApiBase {
  searchScheduledCandidate: string
  getEmpCountries: string
  getAllTechnology: string
  getCountryWiseCandidatesList: string
  deleteCandidate: string
}
export interface ManufacturerApi extends ApiBase {
  exportManufacturerList: string
  getAllManufacturerName: string
  getAllLookUps: string
  addManufacturer: string
  deleteManufacturerName: string
  updateManufacturerName: string
}
export interface ProductTypeListApi extends ApiBase {
  getProductTypeList: string
  deleteProduct: string
  exportProductList: string
  getAllLookUps: string
  addProduct: string
  updateProduct: string
}
export interface AssetListApi extends ApiBase {
  getAllLookUps: string
  getAllAssets: string
  getAssetTypeChange: string
}

export interface AssetWarrantyReportApi extends ApiBase {
  getWarrantyAssetsList: string
  downloadExportAssetWarrantyList: string
}

export interface VendorListApi extends ApiBase {
  getAllVendorDetails: string
  getDepartmentNameList: string
  addVendorDetails: string
  editVendorDetails: string
  exportVendorData: string
  deleteVendorDetails: string
}
export interface ProductSpecificationListApi extends ApiBase {
  getAllProductSpecifications: string
  getassetTypeChangeList: string
  getAllLookUps: string
  getProductTypeChangeList: string
  exportProductSpecificationList: string
  addProductSpecifications: string
  deleteProductSpecification: string
  updateProductSpecification: string
}

export interface ExpenseSubCategoryListApi extends ApiBase {
  getCategoryList: string
  getSubCategoryList: string
  addSubCategoryList: string
  editSubCategory: string
  checkForDuplicateSubCategory: string
  updateSubCategory: string
  deleteSubCategory: string
}
