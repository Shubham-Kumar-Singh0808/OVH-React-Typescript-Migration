import React from 'react'
import { cilSpeedometer } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem } from '@coreui/react-pro'
import { ElementType } from 'react'

export type Badge = {
  color: string
  text: string
}

export type NavItem = {
  component: string | ElementType
  name: string | JSX.Element
  icon?: string | JSX.Element
  badge?: Badge
  to: string
  items?: NavItem[]
}

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    to: '/dashboard',
  },
  {
    component: CNavItem,
    name: 'Blank',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    to: '/blank',
  },
  {
    component: CNavGroup,
    name: 'Settings',
    to: '/settings',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'User Roles Configuration',
        to: '/roleslist',
      },
    ],
  },
]

export default _nav
