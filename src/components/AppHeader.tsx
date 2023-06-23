import {
  CButton,
  CCol,
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CImage,
  CInputGroup,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import React, { useEffect, useState } from 'react'
import { cilMenu } from '@coreui/icons'
import Autocomplete from 'react-autocomplete'
import { useHistory } from 'react-router-dom'
import AppHeaderDropdown from './AppHeaderDropdown'
import { reduxServices } from '../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../stateStore'
import { logo } from '../assets/brand/logo'
import { baseImageExtension } from '../pages/Achievements/AchievementConstants'

const AppHeader = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const employeeListPath = '/employeeList'
  const [searchAutoCompleteTarget, setSearchAutoCompleteTarget] =
    useState<string>('')

  const employees = useTypedSelector(
    reduxServices.searchEmployee.selectors.allEmployees,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToSearch = userAccessToFeatures?.find(
    (feature) => feature.name === 'Employee Directory',
  )
  useEffect(() => {
    if (window.location.pathname !== employeeListPath) {
      setSearchAutoCompleteTarget('')
      dispatch(reduxServices.searchEmployee.actions.setClearEmployeeProfiles())
    }
  }, [window.location.pathname, employeeListPath])

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

  const handleSearchEmployee = async () => {
    const searchEmployeeResultAction = await dispatch(
      reduxServices.searchEmployee.searchEmployee(
        searchAutoCompleteTarget as string,
      ),
    )
    dispatch(
      reduxServices.searchEmployee.actions.setSearchValue(
        searchAutoCompleteTarget,
      ),
    )
    if (
      reduxServices.searchEmployee.searchEmployee.fulfilled.match(
        searchEmployeeResultAction,
      )
    ) {
      history.push(employeeListPath)
    }
    history.push(employeeListPath)
  }

  const handleSearchEmployeeOnEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      handleSearchEmployee()
    }
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
        <CHeaderBrand className="mx-auto d-none">
          <CIcon icon={logo} height={48} />
        </CHeaderBrand>
        <CHeaderNav>
          {userAccessToSearch?.viewaccess && (
            <CInputGroup className="global-search me-4">
              <Autocomplete
                inputProps={{
                  className: 'form-control form-control-sm search-header',
                  id: 'employee-autocomplete',
                  placeholder: 'Search Employee',
                  onKeyDown: handleSearchEmployeeOnEnter,
                }}
                getItemValue={(item) => item?.fullName}
                items={employees && employees?.slice(0, 10)}
                wrapperStyle={{ position: 'relative' }}
                renderMenu={(children) => (
                  <div
                    className={
                      searchAutoCompleteTarget &&
                      searchAutoCompleteTarget.length > 0
                        ? 'autocomplete-dropdown-wrap search-employee-list'
                        : 'autocomplete-dropdown-wrap hide-wrapper search-employee-list'
                    }
                  >
                    {children}
                  </div>
                )}
                renderItem={(item) => {
                  const imageUrl = item?.profilePicPath
                  const baseUrl = baseImageExtension
                  const url = new URL(imageUrl, baseUrl)
                  const finalImageUrl = url.href
                  return (
                    <div
                      data-testid="employee-options"
                      className="autocomplete-dropdown-item"
                      key={item.id}
                    >
                      <CCol className="d-flex justify-content-left employee-wrapper">
                        <CImage
                          className="birthday-avatar"
                          src={finalImageUrl}
                        />
                        <div className="p-1">
                          <p className="m-0 employee-fullname">
                            {item?.fullName}
                          </p>
                          <span className="employee-desg">
                            {item.designation}
                          </span>
                        </div>
                      </CCol>
                    </div>
                  )
                }}
                value={searchAutoCompleteTarget}
                shouldItemRender={(item, value) =>
                  item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
                }
                onChange={(e) => setSearchAutoCompleteTarget(e.target.value)}
                onSelect={(value) => onHandleSelectEmployee(value)}
              />
              <CButton
                type="button"
                color="info"
                id="button-addon2"
                data-testid="search-employee-btn"
                onClick={handleSearchEmployee}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          )}
        </CHeaderNav>
        <CHeaderNav>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
