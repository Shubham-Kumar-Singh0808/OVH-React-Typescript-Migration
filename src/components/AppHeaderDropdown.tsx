import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { reduxServices } from '../reducers/reduxServices'
import { useAppDispatch } from '../stateStore'

const AppHeaderDropdown = (): JSX.Element => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.clear()
    dispatch(reduxServices.authentication.actions.clearAuthentication())
    history.push('/')
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
      <CDropdown variant="nav-item">
        <CDropdownToggle {...dropdownToggleProps}>
          <i className="fa fa-bell-o fa-lg"></i>
        </CDropdownToggle>
      </CDropdown>
      &nbsp; &nbsp; &nbsp;
      <CDropdown variant="nav-item">
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
