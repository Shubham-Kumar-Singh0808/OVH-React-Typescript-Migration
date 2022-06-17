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
const EmployeeList = React.lazy(
  () => import('./pages/EmployeeDirectory/EmployeesList/EmployeeList'),
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
  { path: '/employeeList', name: 'Employee List', component: EmployeeList },
  {
    path: '/employeeProfile/:employeeId',
    name: 'Employee Profile',
    component: MyProfile,
  },
]

export default routes
