import {
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import { reduxServices } from '../reducers/reduxServices'
import { useAppDispatch } from '../stateStore'

const AppHeaderDropdown = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.clear()
    dispatch(reduxServices.authentication.actions.clearAuthentication())
    dispatch(reduxServices.app.actions.setReRenderMenu(true))
    // reloading so that it can redirect to login with 401 and all states are removed
    window.location.reload()
  }

  const dropdownToggleProps = {
    placement: 'bottom-end',
    caret: false,
  }
  const dropdownMenuProps = {
    className: 'p-0',
    placement: 'bottom-end',
  }

  return (
    <>
      <CDropdown
        variant="nav-item"
        data-testid="notification-button"
        className="notification"
      >
        <CDropdownToggle {...dropdownToggleProps}>
          <i className="fa fa-bell-o fa-lg"></i>
        </CDropdownToggle>
        <CDropdownMenu className="py-1 px-2">
          <Link to={'/notifications'} className="dropdown-item text-muted">
            You have messages.
          </Link>
          <CDropdownDivider />
          <Link to={'/notifications'} className="dropdown-item">
            Show All Notifications
            <i className="fa fa-angle-right fa-lg pull-right"></i>
          </Link>
        </CDropdownMenu>
      </CDropdown>
      <CDropdown variant="nav-item" data-testid="logout-button">
        <CDropdownToggle {...dropdownToggleProps}>
          <i className="fa fa-power-off fa-lg"></i>
        </CDropdownToggle>
        <CDropdownMenu {...dropdownMenuProps}>
          <CDropdownItem className="cursor-pointer" onClick={handleLogout}>
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdown
