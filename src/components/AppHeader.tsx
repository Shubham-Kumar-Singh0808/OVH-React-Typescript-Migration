import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../store'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CInputGroup,
  CFormInput,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react-pro'
import { cilApplicationsSettings, cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { AppBreadcrumb } from './index'
import { logo } from '../assets/brand/logo'

const AppHeader = (): JSX.Element => {
  const dispatch = useDispatch()
  const sidebarShow = useTypedSelector((state) => state.sidebarShow)
  const asideShow = useTypedSelector((state) => state.asideShow)

  return (
    <CHeader className="main-header mb-3">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1 me-auto"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none">
          <CIcon icon={logo} height={48} />
        </CHeaderBrand>
        <CHeaderNav>
          <CInputGroup className="global-search me-4">
            <CFormInput
              placeholder="Search Employee"
              aria-label="Search Employee"
              aria-describedby="button-addon2"
            />
            <CButton type="button" color="info" id="button-addon2">
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CDropdown variant="nav-item">
              <CDropdownToggle caret={false}>
                <i className="fa fa-bell-o fa-lg"></i>
              </CDropdownToggle>
              <CDropdownMenu className="p-0" placement="bottom-end">
                <CDropdownItem className="cursor-pointer">N/A</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CNavItem>
        </CHeaderNav>
        {/* <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        {/* <CHeaderToggler
          className="px-md-0 me-md-3"
          onClick={() => dispatch({ type: 'set', asideShow: !asideShow })}
        >
          <CIcon icon={cilApplicationsSettings} size="lg" />
        </CHeaderToggler> */}
      </CContainer>
      {/* <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
