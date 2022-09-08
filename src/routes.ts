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
const EditEmployee = React.lazy(
  () => import('./pages/EmployeeDirectory/EmployeesList/EditEmployee'),
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
const LeaveSummary = React.lazy(
  () =>
    import(
      './pages/Leaves/LeaveSummary/LeaveSummaryLandingScreen/EmployeeLeaveSummary'
    ),
)
const AddProject = React.lazy(
  () => import('./pages/ProjectManagement/Project/AddProject/AddProject'),
)

const EditProject = React.lazy(
  () => import('./pages/ProjectManagement/Project/EditProject/EditProject'),
)
const EditClient = React.lazy(
  () => import('./pages/ProjectManagement/Clients/EditClient/EditClient'),
)

const AddClient = React.lazy(
  () => import('./pages/ProjectManagement/Clients/AddClient/AddNewClient'),
)

const ViewClient = React.lazy(
  () =>
    import(
      './pages/ProjectManagement/Clients/ClientInformation/ViewClientInformation'
    ),
)

const CreateTicket = React.lazy(
  () => import('./pages/Support/Raise Ticket/Add Tracker List/AddTrackerList'),
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
    path: '/createTicket',
    name: 'Add Tracker List',
    component: CreateTicket,
  },
]

export default routes
