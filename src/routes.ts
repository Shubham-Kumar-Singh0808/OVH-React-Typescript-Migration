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
  () => import('./pages/EmployeeDirectory/EmployeesList/EmployeeList'),
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
const AttendanceReport = React.lazy(
  () => import('./pages/TimeAndAttendance/AttendanceReport/AttendanceReport'),
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
    path: '/attendancesummary',
    name: 'Attendance Summary',
    component: AttendanceReport,
  },
]

export default routes
