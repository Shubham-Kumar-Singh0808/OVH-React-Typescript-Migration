import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react-pro'
import { useDispatch } from 'react-redux'
import CIcon from '@coreui/icons-react'
import React from 'react'
import SimpleBar from 'simplebar-react'
import { Link } from 'react-router-dom'
import AppSidebarNavItems from './AppSidebarNavItems'
import UserProfile from './UserProfile'
import { logoNegative } from '../../assets/brand/logo-negative'
// sidebar nav config
import { sygnet } from '../../assets/brand/sygnet'
import { useTypedSelector } from '../../stateStore'

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
        <Link to={'/dashboard'}>
          <CIcon
            className="sidebar-brand-full cursor-pointer"
            icon={logoNegative}
            height={35}
          />
          <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
        </Link>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <UserProfile />
          <AppSidebarNavItems />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })
        }
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
