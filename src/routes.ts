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

const PersonalInfoTab = React.lazy(
  () => import('./pages/MyProfile/PersonalInfoTab/PersonalInfoTab'),
)
const Blank = React.lazy(() => import('./views/blank/Blank'))

const GeneralTab = React.lazy(
  () => import('./pages/MyProfile/GeneralTab/GeneralTab'),
)

const QualificationTab = React.lazy(
  () => import('./pages/MyProfile/QualificationTab/QualificationTab'),
)

/**
 * See {@link https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config GitHub}.
 */
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  {
    path: '/personalinfotab',
    name: 'PersonalInfoTab',
    component: PersonalInfoTab,
  },
  { path: '/blank', name: 'Blank', component: Blank },
  { path: '/generaltab', name: 'GeneralTab', component: GeneralTab },
  {
    path: '/qualificationtab',
    name: 'QualificationTab',
    component: QualificationTab,
  },
]

export default routes
