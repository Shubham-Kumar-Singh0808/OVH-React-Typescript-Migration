import React, { ReactNode } from 'react'

export type route = {
  component?: ReactNode
  exact?: boolean
  name?: string
  path?: string
  routes?: route[]
}

// examples
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'))
const UserRolesAndPermissions = React.lazy(
  () =>
    import('./pages/Settings/UserRolesConfiguration/UserRolesAndPermissions'),
)
const MyProfile = React.lazy(
  () => import('./pages/MyProfile/ProfileLandingPage/MyProfile'),
)
const CertificatesList = React.lazy(
  () => import('./pages/EmployeeDirectory/CertificatesList/CertificatesList'),
)
const CertificateTypeList = React.lazy(
  () =>
    import(
      './pages/EmployeeDirectory/CertificatesList/AddCertificateType/CertificateType'
    ),
)
const EmployeeList = React.lazy(
  () => import('./pages/EmployeeDirectory/EmployeesList'),
)
const EmployeeReport = React.lazy(
  () => import('./pages/EmployeeDirectory/EmployeeReport/EmployeeReport'),
)
const EmpDesignationReport = React.lazy(
  () =>
    import(
      './pages/EmployeeDirectory/EmployeeReport/EmployeeDesignationReport/EmployeeDesignationReport'
    ),
)
const VisaDetailsList = React.lazy(
  () => import('./pages/EmployeeDirectory/VisaList/VisaList'),
)
const EmployeeHandbook = React.lazy(
  () => import('./pages/EmployeeHandbook/EmployeeHandbook'),
)
const Handbook = React.lazy(
  () => import('./pages/EmployeeHandbook/ShowHandbook'),
)
const AttendanceReport = React.lazy(
  () => import('./pages/TimeAndAttendance/AttendanceReport/AttendanceReport'),
)
const EmployeeHandbookSettings = React.lazy(
  () =>
    import(
      './pages/EmployeeHandbook/HandbookSettings/EmployeeHandbookSettings'
    ),
)
const TimeInOfficeReport = React.lazy(
  () =>
    import('./pages/TimeAndAttendance/TimeInOfficeReport/TimeInOfficeReport'),
)
const LeaveSettings = React.lazy(
  () => import('./pages/Settings/LeaveSettings/EmployeeLeaveSettings'),
)
const LeaveReports = React.lazy(
  () => import('./pages/Leaves/LeaveReports/LeaveReport'),
)

const MailConfiguration = React.lazy(
  () => import('./pages/Settings/MailConfiguration/EmailConfigTemplate'),
)
const AddNewEmployee = React.lazy(
  () => import('./pages/EmployeeDirectory/EmployeesList/AddNewEmployee'),
)
const HiveActivityReport = React.lazy(
  () =>
    import('./pages/TimeAndAttendance/HiveActivityReport/HiveActivityReport'),
)
const AddNewTemplate = React.lazy(
  () =>
    import('./pages/Settings/MailConfiguration/AddTemplate/AddNewMailTemplate'),
)

const ApplyLeave = React.lazy(
  () => import('./pages/Leaves/ApplyLeave/EmployeeApplyLeave'),
)

const EditEmployee = React.lazy(
  () => import('./pages/EmployeeDirectory/EmployeesList/EditEmployee'),
)
const SupportReport = React.lazy(
  () => import('./pages/Support/Report/TicketReport'),
)
const ScheduledInterview = React.lazy(
  () => import('./pages/Recruitment/ScheduledInterviews/ScheduledInterviews'),
)
const MyAttendance = React.lazy(
  () => import('./pages/TimeAndAttendance/MyAttendance/MyAttendance'),
)
const Clients = React.lazy(
  () => import('./pages/ProjectManagement/Clients/Clients'),
)

const MyTickets = React.lazy(
  () => import('./pages/Support/MyTickets/MyTickets'),
)
const LeaveSummary = React.lazy(
  () =>
    import(
      './pages/Leaves/LeaveSummary/LeaveSummaryLandingScreen/EmployeeLeaveSummary'
    ),
)
const AddProject = React.lazy(
  () =>
    import(
      './pages/ProjectManagement/Project/AddEditProject/AddProject/AddProject'
    ),
)
const EditProject = React.lazy(
  () =>
    import(
      './pages/ProjectManagement/Project/AddEditProject/EditProject/EditProject'
    ),
)
const ProjectReport = React.lazy(
  () => import('./pages/ProjectManagement/Project/ProjectReport'),
)
const EditClient = React.lazy(
  () => import('./pages/ProjectManagement/Clients/EditClient/EditClient'),
)

const AddClient = React.lazy(
  () => import('./pages/ProjectManagement/Clients/AddClient/AddNewClient'),
)
const CreateNewTicket = React.lazy(
  () => import('./pages/Support/RaiseTicket/CreateNewTicket'),
)

const ViewClient = React.lazy(
  () =>
    import(
      './pages/ProjectManagement/Clients/ClientInformation/ViewClientInformation'
    ),
)
const TicketApprovals = React.lazy(
  () => import('./pages/Support/TicketApprovals/TicketApprovals'),
)

const BirthdaysListTable = React.lazy(
  () => import('./pages/Dashboard/Birthdays/ListOfBirthdays'),
)

const HolidaysList = React.lazy(
  () => import('./pages/Dashboard/Holidays/HolidaysList/ListOfHolidays'),
)

const AddHoliday = React.lazy(
  () => import('./pages/Dashboard/Holidays/HolidaysList/AddHoliday/AddHoliday'),
)

const ProbationaryList = React.lazy(
  () => import('./pages/Dashboard/ProbationaryList/ProbationaryList'),
)

const UpdateTicket = React.lazy(
  () => import('./pages/Support/TicketApprovals/UpdateTicket/UpdateTicket'),
)

const UpdateTicketUnderTicketList = React.lazy(
  () => import('./pages/Support/MyTickets/UpdateTicket/UpdateTicket'),
)

const BookingList = React.lazy(
  () => import('./pages/ConferenceRoomBooking/BookingList/BookingList'),
)
const EventTypeList = React.lazy(
  () =>
    import(
      './pages/ConferenceRoomBooking/NewEvent/EventTypeList/EventTypeList'
    ),
)

const EmployeeAllocationReport = React.lazy(
  () =>
    import(
      './pages/ProjectManagement/EmployeeAllocation/EmployeeAllocationReport'
    ),
)
const EventsList = React.lazy(
  () => import('./pages/ConferenceRoomBooking/EventList/EventList'),
)

const FeedbackForms = React.lazy(
  () =>
    import(
      './pages/ConferenceRoomBooking/EventList/FeedbackForms/FeedbackFormsList'
    ),
)
const EditHoliday = React.lazy(
  () =>
    import('./pages/Dashboard/Holidays/HolidaysList/EditHoliday/EditHoliday'),
)

const NewBookingRoom = React.lazy(
  () => import('./pages/ConferenceRoomBooking/NewBooking/NewBooking'),
)
const EmployeeAllocation = React.lazy(
  () => import('./pages/ProjectManagement/AllocateEmployee/AllocateEmployee'),
)

const AppraisalConfigurations = React.lazy(
  () => import('./pages/Settings/Configurations/AppraisalConfigurations'),
)

const EditConfiguration = React.lazy(
  () =>
    import(
      './pages/Settings/Configurations/EditConfiguration/EditConfiguration'
    ),
)

const ViewPIPDetail = React.lazy(
  () =>
    import(
      './pages/Performance/PipList/EmployeePipTimeline/EmployeePipTimeline'
    ),
)

const TicketConfiguration = React.lazy(
  () => import('./pages/Settings/TicketConfiguration/TicketConfiguration'),
)
const NewEvent = React.lazy(
  () => import('./pages/ConferenceRoomBooking/NewEvent/NewEvent'),
)

const SubmitResignation = React.lazy(
  () => import('./pages/Separation/SubmitViewResignation/SubmitResignation'),
)

const LeaveApprovals = React.lazy(
  () => import('./pages/Leaves/LeaveApprovals/LeaveApprovals'),
)

const ITDeclarationForm = React.lazy(
  () => import('./pages/Finance/ITDeclarationForm/ITDeclarationForm'),
)

const Payslip = React.lazy(() => import('./pages/Finance/Payslips/Payslips'))

const PfPanDetails = React.lazy(
  () => import('./pages/Finance/PanAndBankDetails/PanAndBankDetails'),
)

const ResignationTimeLine = React.lazy(
  () =>
    import(
      './pages/Separation/ResignationList/ResignationTimeLine/ResignationHistory'
    ),
)

const ResignationFeedBackForm = React.lazy(
  () =>
    import(
      './pages/Separation/ResignationList/HRClearanceCertificate/ExitFeedBackForm/ExitFeedBackForm'
    ),
)

const ReviewList = React.lazy(
  () => import('./pages/Performance/ReviewList/EmployeeReviewList'),
)

const ResignationManagerClearanceCertificate = React.lazy(
  () =>
    import(
      './pages/Separation/ResignationList/ManagerClearenceCertificate/ManagerClearanceCertificate'
    ),
)

const SeparationViewChart = React.lazy(
  () =>
    import('./pages/Separation/ResignationList/ViewChart/SeparationViewChart'),
)

const ResignationHRClearanceCertificate = React.lazy(
  () =>
    import(
      './pages/Separation/ResignationList/HRClearanceCertificate/HRClearanceCertificate'
    ),
)

const ResignationITClearanceCertificate = React.lazy(
  () =>
    import(
      './pages/Separation/ResignationList/ITClearanceCertificate/ITClearanceCertificate'
    ),
)

const ResignationFinanceClearanceCertificate = React.lazy(
  () =>
    import(
      './pages/Separation/ResignationList/FinanaceClearanceCertificate/FinanceClearanceCertificate'
    ),
)

const ResignationAdminClearanceCertificate = React.lazy(
  () =>
    import(
      './pages/Separation/ResignationList/AdminClearanceCertificate/AdminClearanceCertificate'
    ),
)

const ResignationList = React.lazy(
  () => import('./pages/Separation/ResignationList/ResignationList'),
)

const EmployeeAccounts = React.lazy(
  () => import('./pages/Finance/EmployeeAccounts/EmployeeAccounts'),
)

const ITDeclarationList = React.lazy(
  () => import('./pages/Finance/ITDeclarationList/ITDeclarationList'),
)

const InvestmentCheckList = React.lazy(
  () => import('./pages/Finance/InvestmentCheckList/InvestmentCheckList'),
)

const AddInvestmentCycle = React.lazy(
  () => import('./pages/Finance/AddInvestmentCycle/AddInvestmentCycle'),
)

const AddInvestment = React.lazy(
  () => import('./pages/Finance/AddInvestment/InvestmentList'),
)

const AddSection = React.lazy(
  () => import('./pages/Finance/AddInvestment/Add Section/SectionsList'),
)

const ViewProjectDetails = React.lazy(
  () =>
    import(
      './pages/ProjectManagement/Project/ProjectView/ProjectViewLandingPage/ProjectView'
    ),
)

const ProjectCreationRequest = React.lazy(
  () =>
    import(
      './pages/ProjectManagement/ProjectCreationRequest/ProjectCreationRequest'
    ),
)

const AddAchiever = React.lazy(
  () => import('./pages/Achievements/AddAchiever/AddAchiever'),
)

const AchieverList = React.lazy(
  () => import('./pages/Achievements/AchieverList/AchieverList'),
)
const InitiateCycle = React.lazy(
  () => import('./pages/Settings/InitiateCycle/InitiateNewCycle'),
)

const myKRAs = React.lazy(() => import('./pages/Performance/MyKRAs/MyKRAsList'))

const NomineeList = React.lazy(
  () => import('./pages/Achievements/NomineeList/NomineeList'),
)

const AddNominee = React.lazy(
  () => import('./pages/Achievements/AddNominee/AddNominee'),
)

const MyReview = React.lazy(
  () => import('./pages/Performance/MyReviews/MyReview'),
)

const PayrollManagement = React.lazy(
  () => import('./pages/Finance/PayrollManagement/PayrollManagement'),
)
const LeadershipEnrollmentList = React.lazy(
  () =>
    import(
      './pages/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentList'
    ),
)

const LeadershipEnrollmentForm = React.lazy(
  () =>
    import(
      './pages/Achievements/LeadershipEnrollmentForm/LeadershipEnrollmentForm'
    ),
)

const PIPList = React.lazy(
  () => import('./pages/Performance/PipList/EmployeePipList/PipList'),
)

const KRA = React.lazy(() => import('./pages/Performance/KRA/KRALandingScreen'))

const EditBooking = React.lazy(
  () => import('./pages/ConferenceRoomBooking/EditBooking/EditBooking'),
)

const ClearnceCerticates = React.lazy(
  () =>
    import(
      './pages/Performance/PipList/EmployeePIPClearenceCertificate/EmployeePIPClearenceCertificate'
    ),
)

const EditEvent = React.lazy(
  () => import('./pages/ConferenceRoomBooking/EditEvent/EditEvent'),
)

const AppraisalTemplate = React.lazy(
  () => import('./pages/Performance/AppraisalTemplate/AppraisalTemplate'),
)

const AddNewAudit = React.lazy(
  () => import('./pages/SQAAuditReport/AddNewAudit/AddNewAudit'),
)
const SQAAudit = React.lazy(
  () => import('./pages/SQAAuditReport/SQAAuditReport'),
)
const EditAudit = React.lazy(
  () => import('./pages/SQAAuditReport/EditAuditForm/EditAudit'),
)
const SQAAuditTimeLine = React.lazy(
  () => import('./pages/SQAAuditReport/SQAAuditTimeLine/SQAAuditHistory'),
)
const SQAAuditViewReport = React.lazy(
  () => import('./pages/SQAAuditReport/SQAViewReport/SQAViewReport'),
)
const processAreaList = React.lazy(
  () => import('./pages/Settings/ProcessArea/ProcessArea'),
)
const Notifications = React.lazy(
  () => import('./pages/Notifications/Notifications'),
)
const JobVacancies = React.lazy(
  () => import('./pages/Recruitment/JobOpenings/JobOpenings'),
)
const AddJobVacancies = React.lazy(
  () => import('./pages/Recruitment/JobOpenings/AddJobOpening/AddJobOpening'),
)
const Manufacturer = React.lazy(
  () => import('./pages/ManufacturerList/Manufacturer'),
)
/**
 * See {@link https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config GitHub}.
 */
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  {
    path: '/roleslist',
    name: 'User Roles And Permission',
    component: UserRolesAndPermissions,
  },
  { path: '/profile', name: 'My Profile', component: MyProfile },
  {
    path: '/employeeCertificatesReport',
    name: 'Employee Certificates Report',
    component: CertificatesList,
  },
  {
    path: '/certificateTypeList',
    name: 'Certificate Type List',
    component: CertificateTypeList,
  },
  { path: '/employeeList', name: 'Employee List', component: EmployeeList },
  {
    path: '/empReport',
    name: 'Employee Report',
    component: EmployeeReport,
  },
  {
    path: '/report2',
    name: 'Employee Designation List Report',
    component: EmpDesignationReport,
  },
  {
    path: '/ticketReport',
    name: 'Support Report',
    component: SupportReport,
  },
  {
    path: '/employeeProfile/:employeeId',
    name: 'Employee Profile',
    component: MyProfile,
  },
  {
    path: '/visaDetailsList',
    name: 'Visa Details',
    component: VisaDetailsList,
  },
  {
    path: '/employeehandbook',
    name: 'Employee Handbook',
    component: EmployeeHandbook,
  },
  {
    path: '/Employeereport',
    name: 'Employee Allocation Report',
    component: EmployeeAllocationReport,
  },
  {
    path: '/leaveReports',
    name: 'Leave Reports',
    component: LeaveReports,
  },
  {
    path: '/showemployeehandbook/:clickedpageName',
    name: 'Handbook',
    component: Handbook,
  },
  {
    path: '/attendancesummary',
    name: 'Attendance Summary',
    component: AttendanceReport,
  },
  {
    path: '/createTicket',
    name: 'Raise Ticket',
    component: CreateNewTicket,
  },
  {
    path: '/handbooksettings',
    name: 'Handbook Settings',
    component: EmployeeHandbookSettings,
  },
  {
    path: '/timeInOfficeReport',
    name: 'Time in Office Report',
    component: TimeInOfficeReport,
  },
  {
    path: '/leaveSettings',
    name: 'Leave Settings',
    component: LeaveSettings,
  },
  {
    path: '/addNewEmployee',
    name: 'Add New Employee',
    component: AddNewEmployee,
  },
  {
    path: '/mailTemplates',
    name: 'Mail Configuration',
    component: MailConfiguration,
  },
  {
    path: '/hiveReport',
    name: 'Hive Activity Report',
    component: HiveActivityReport,
  },
  {
    path: '/addTemplate',
    name: 'Add Template',
    component: AddNewTemplate,
  },
  {
    path: '/editEmployee/:employeeId',
    name: 'Edit Employee',
    component: EditEmployee,
  },
  {
    path: '/mailTemplates',
    name: 'Mail Configuration',
    component: MailConfiguration,
  },
  {
    path: '/leaveApplication',
    name: 'Leaves',
    component: ApplyLeave,
  },
  {
    path: '/candidateSearch',
    name: 'Scheduled Interviews',
    component: ScheduledInterview,
  },
  {
    path: '/employeeattendance',
    name: 'Employee Attendance',
    component: MyAttendance,
  },
  {
    path: '/addproject',
    name: 'Add Project',
    component: AddProject,
  },
  {
    path: '/allocationEmployee',
    name: 'Allocate Employee',
    component: EmployeeAllocation,
  },
  {
    path: '/editproject/:projectId',
    name: 'Edit Project',
    component: EditProject,
  },
  {
    path: '/clientsList',
    name: 'Clients',
    component: Clients,
  },
  {
    path: '/addClient',
    name: 'Add Client',
    component: AddClient,
  },
  {
    path: '/ticketSummary',
    name: 'Tickets',
    component: MyTickets,
  },
  {
    path: '/clientInfo/:clientId',
    name: 'View Client',
    component: ViewClient,
  },
  {
    path: '/editClient/:clientId',
    name: 'Edit Client',
    component: EditClient,
  },
  {
    path: '/employeeLeaveSummary',
    name: 'Leave Summary',
    component: LeaveSummary,
  },
  {
    path: '/ticketApprovals',
    name: 'Ticket Approvals',
    component: TicketApprovals,
  },
  {
    path: '/updateTicketInApprovals/:ticketId',
    name: 'Update Ticket',
    component: UpdateTicket,
  },

  {
    path: '/updateTicket/:ticketId',
    name: 'Update Ticket',
    component: UpdateTicketUnderTicketList,
  },
  // {
  //   path: '/jobvacancies',
  //   name: 'Job Openings',
  //   component: JobOpenings,
  // },
  {
    path: '/birthdaylist',
    name: 'List of Birthdays',
    component: BirthdaysListTable,
  },
  {
    path: '/holidaylist',
    name: 'List of Holidays',
    component: HolidaysList,
  },
  {
    path: '/addHoliday',
    name: 'Add Holiday',
    component: AddHoliday,
  },
  {
    path: '/eventList',
    name: 'Event List',
    component: EventsList,
  },
  {
    path: '/probationaryList',
    name: 'Upcoming Probationary End Dates',
    component: ProbationaryList,
  },
  {
    path: '/meetingList',
    name: 'Booking List',
    component: BookingList,
  },
  {
    path: '/newEvent',
    name: 'New Event',
    component: NewEvent,
  },
  {
    path: '/addEventType',
    name: 'Event Type List',
    component: EventTypeList,
  },
  // {
  //   path: '/newMeetingRequest',
  //   name: 'Add LocationList',
  //   component: LocationList,
  // },
  {
    path: '/trainingFeedBackForm/:eventId',
    name: 'Feedback Forms',
    component: FeedbackForms,
  },
  {
    path: '/editHoliday/:holidayId',
    name: 'Edit Holiday',
    component: EditHoliday,
  },
  {
    path: '/newMeetingRequest',
    name: 'New Booking',
    component: NewBookingRoom,
  },
  {
    path: '/appraisalCycle',
    name: 'Appraisal Configurations',
    component: AppraisalConfigurations,
  },
  // {
  //   path: '/roomList',
  //   name: 'RoomList',
  //   component: RoomList,
  // },
  {
    path: '/editAppraisalCycle/:cycleId',
    name: 'Edit Configuration',
    component: EditConfiguration,
  },
  {
    path: '/subCategoryList',
    name: 'Ticket Configuration',
    component: TicketConfiguration,
  },
  {
    path: '/submitResignation',
    name: 'Submit View Resignation',
    component: SubmitResignation,
  },
  {
    path: '/projectreport',
    name: 'Project Report',
    component: ProjectReport,
  },
  {
    path: '/leaveApprovals',
    name: 'Leave Approvals',
    component: LeaveApprovals,
  },
  {
    path: '/itDeclarationForm',
    name: 'IT Declaration Form',
    component: ITDeclarationForm,
  },
  {
    path: '/payslip',
    name: 'Payslip',
    component: Payslip,
  },
  {
    path: '/myFinance',
    name: 'P.F. & PAN Details',
    component: PfPanDetails,
  },
  {
    path: '/employeeFinance/:employeeId',
    name: 'P.F. & PAN Details',
    component: PfPanDetails,
  },
  {
    path: '/resignationList',
    name: 'Resignation List',
    component: ResignationList,
  },
  {
    path: '/managerComments',
    name: 'Resignation Time Line',
    component: ResignationTimeLine,
  },
  {
    path: '/financeList',
    name: 'Employee Accounts',
    component: EmployeeAccounts,
  },
  {
    path: '/ClearanceCertificateManager',
    name: 'Resignation Clearence CertificateManager',
    component: ResignationManagerClearanceCertificate,
  },
  {
    path: '/itDeclarationList',
    name: 'IT Declaration List',
    component: ITDeclarationList,
  },
  {
    path: '/addCycle',
    name: 'Add Investment Cycle',
    component: AddInvestmentCycle,
  },
  {
    path: '/addInvestment',
    name: 'Add Investment',
    component: AddInvestment,
  },
  {
    path: '/ClearanceCertificateHR',
    name: 'HR  Clearance Certificate',
    component: ResignationHRClearanceCertificate,
  },

  {
    path: '/ClearanceCertificateIT',
    name: 'IT  Clearance Certificate',
    component: ResignationITClearanceCertificate,
  },
  {
    path: '/ClearanceCertificateFinance',
    name: 'Finance  Clearance Certificate',
    component: ResignationFinanceClearanceCertificate,
  },
  {
    path: '/ClearanceCertificateAdmin',
    name: 'Admin  Clearance Certificate',
    component: ResignationAdminClearanceCertificate,
  },

  {
    path: '/ExitFeedBackForm',
    name: 'Resignation ExitFeedBackForm',
    component: ResignationFeedBackForm,
  },
  {
    path: '/investmentCheckList',
    name: 'Investment CheckList',
    component: InvestmentCheckList,
  },
  {
    path: '/payslipUpload',
    name: 'Payroll Management',
    component: PayrollManagement,
  },
  {
    path: '/achievementList',
    name: 'Achievements List',
    component: AchieverList,
  },
  {
    path: '/separationChart',
    name: 'Separation View Chart',
    component: SeparationViewChart,
  },
  {
    path: '/addSection',
    name: 'Add Section',
    component: AddSection,
  },
  {
    path: '/projectRequestList',
    name: 'Project Creation Request',
    component: ProjectCreationRequest,
  },
  {
    path: '/addAchievement',
    name: 'Add Achiever',
    component: AddAchiever,
  },
  {
    path: '/viewProject/:projectId',
    name: 'View Project',
    component: ViewProjectDetails,
  },
  {
    path: '/initiateCycle',
    name: 'Initiate Cycle',
    component: InitiateCycle,
  },
  {
    path: '/myKRAs',
    name: 'My KRAs',
    component: myKRAs,
  },
  {
    path: '/nomineesList',
    name: 'Nominee List',
    component: NomineeList,
  },
  {
    path: '/addNominee',
    name: 'Add Nominee',
    component: AddNominee,
  },
  {
    path: '/employeeAppraisal',
    name: 'My Review',
    component: MyReview,
  },
  {
    path: '/leadershiplist',
    name: 'Leadership Enrollment List',
    component: LeadershipEnrollmentList,
  },
  {
    path: '/leadershipForm',
    name: 'Leadership Enrollment Form',
    component: LeadershipEnrollmentForm,
  },
  {
    path: '/PIPList',
    name: 'PIP List',
    component: PIPList,
  },
  {
    path: '/addKra',
    name: 'KRA',
    component: KRA,
  },
  {
    path: '/ViewPIPDetail/:id',
    name: 'ViewPIPDetail',
    component: ViewPIPDetail,
  },
  {
    path: '/PIPClearnceCerticates',
    name: 'ClearnceCerticates',
    component: ClearnceCerticates,
  },
  {
    path: '/listofAppraisal',
    name: 'KRA',
    component: ReviewList,
  },
  {
    path: '/editEvent/:eventId',
    name: 'Edit Event',
    component: EditEvent,
  },
  {
    path: '/MeetingRequestEdit/:id',
    name: 'Edit Booking',
    component: EditBooking,
  },
  {
    path: '/appraisalTemplate',
    name: 'appraisalTemplate',
    component: AppraisalTemplate,
  },
  {
    path: '/processAreaList',
    name: 'processAreaList',
    component: processAreaList,
  },
  {
    path: '/addAuditForm',
    name: 'Add New Audit',
    component: AddNewAudit,
  },
  {
    path: '/SQAAudit',
    name: '/SQA Audit',
    component: SQAAudit,
  },
  {
    path: '/editAuditForm/:auditId',
    name: 'Edit Audit Form',
    component: EditAudit,
  },
  {
    path: '/newProjectAuditTimeline/:auditId',
    name: 'SQA Audit TimeLine',
    component: SQAAuditTimeLine,
  },
  {
    path: '/viewProjectAudit/:auditId',
    name: 'SQA Audit View',
    component: SQAAuditViewReport,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications,
  },
  {
    path: '/jobvacancies',
    name: 'Jobvacancies',
    component: JobVacancies,
  },
  {
    path: '/addJobvacancies',
    name: 'AddJobVacancies',
    component: AddJobVacancies,
  },
  {
    path: '/manufacturerList',
    name: 'manufacturerList',
    component: Manufacturer,
  },
]

export default routes
