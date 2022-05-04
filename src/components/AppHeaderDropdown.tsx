import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro'

import React from 'react'
import { clearAuthentication } from '../reducers/Login/authenticationSlice'
import { useAppDispatch } from '../stateStore'
import { useHistory } from 'react-router-dom'

const AppHeaderDropdown = (): JSX.Element => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.clear()
    dispatch(clearAuthentication())
    history.push('/')
  }

  const dropdownToggleProps = {
    placement: 'bottom-end',
    caret: false,
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle {...dropdownToggleProps}>
        <i className="fa fa-power-off fa-lg"></i>
      </CDropdownToggle>
      <CDropdownMenu className="p-0" placement="bottom-end">
        <CDropdownItem className="cursor-pointer" onClick={handleLogout}>
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
