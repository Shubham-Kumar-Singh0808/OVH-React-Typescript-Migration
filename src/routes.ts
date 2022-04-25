import React, { ReactNode } from 'react'

export type route = {
  component?: ReactNode
  exact?: boolean
  name?: string
  path?: string
  routes?: route[]
}

// examples
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'))
const UserRolesPermission = React.lazy(
  () => import('./pages/settings/userrolesconfiguration/UserRolesPermission'),
)
const Blank = React.lazy(() => import('./views/blank/Blank'))

/**
 * See {@link https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config GitHub}.
 */
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  {
    path: '/roleslist',
    name: 'User Roles Permission',
    component: UserRolesPermission,
  },
  { path: '/blank', name: 'Blank', component: Blank },
]

export default routes
