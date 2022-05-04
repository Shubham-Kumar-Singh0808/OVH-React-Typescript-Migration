import 'simplebar/dist/simplebar.min.css'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react-pro'

import { AppSidebarNav } from './AppSidebarNav'
import CIcon from '@coreui/icons-react'
import React from 'react'
import SimpleBar from 'simplebar-react'
import { logoNegative } from '../assets/brand/logo-negative'
// sidebar nav config
import navigation from '../_nav'
import { sygnet } from '../assets/brand/sygnet'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../stateStore'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useTypedSelector((state) => state.app.sidebarUnfoldable)
  const sidebarShow = useTypedSelector((state) => state.app.sidebarShow)

  return (
    <CSidebar
      className="main-sidebar"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex main-logo">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
