import {
  CButton,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CInputGroup,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import React, { useEffect, useState } from 'react'
import { cilMenu } from '@coreui/icons'
import Autocomplete from 'react-autocomplete'
import AppHeaderDropdown from './AppHeaderDropdown'
import { logo } from '../assets/brand/logo'
import { reduxServices } from '../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../stateStore'

const AppHeader = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [searchAutoCompleteTarget, setSearchAutoCompleteTarget] =
    useState<string>()

  const employees = useTypedSelector(
    reduxServices.searchEmployee.selectors.allEmployees,
  )

  useEffect(() => {
    if (searchAutoCompleteTarget) {
      dispatch(
        reduxServices.searchEmployee.searchEmployee(searchAutoCompleteTarget),
      )
    }
  }, [searchAutoCompleteTarget])

  const onHandleSelectEmployee = (fullName: string) => {
    setSearchAutoCompleteTarget(fullName)
  }

  return (
    <CHeader className="main-header mb-3">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1 me-auto"
          onClick={() => dispatch(reduxServices.app.actions.toggleSidebar())}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none">
          <CIcon icon={logo} height={48} />
        </CHeaderBrand>
        <CHeaderNav>
          <CInputGroup className="global-search me-4">
            <Autocomplete
              inputProps={{
                className: 'form-control form-control-sm',
                id: 'trainer-autocomplete',
                placeholder: 'Trainer',
              }}
              getItemValue={(item) => item.fullName}
              items={employees?.slice(0, 10)}
              data-testid="author-input"
              wrapperStyle={{ position: 'relative' }}
              renderMenu={(children) => (
                <div
                  className={
                    searchAutoCompleteTarget &&
                    searchAutoCompleteTarget.length > 0
                      ? 'autocomplete-dropdown-wrap'
                      : 'autocomplete-dropdown-wrap hide'
                  }
                >
                  {children}
                </div>
              )}
              renderItem={(item, isHighlighted) => (
                <div
                  data-testid="employee-option"
                  className={
                    isHighlighted
                      ? 'autocomplete-dropdown-item active'
                      : 'autocomplete-dropdown-item '
                  }
                  key={item.id}
                >
                  {item.fullName}
                </div>
              )}
              value={searchAutoCompleteTarget}
              shouldItemRender={(item, value) =>
                item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              onChange={(e) => setSearchAutoCompleteTarget(e.target.value)}
              onSelect={(value) => onHandleSelectEmployee(value)}
            />
            <CButton type="button" color="info" id="button-addon2">
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CHeaderNav>
        <CHeaderNav>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
