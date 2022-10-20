import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import HandbookList from './HandbookList'
import OCard from '../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'
import { ApiLoadingState } from '../../middleware/api/apiList'
import OLoadingSpinner from '../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../types/Components/loadingScreenTypes'

const EmployeeHandbook = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const handbooks = useTypedSelector(
    reduxServices.EmployeeHandbook.selectors.handbookData,
  )
  const isLoading = useTypedSelector(
    reduxServices.EmployeeHandbook.selectors.isLoading,
  )
  const empRole = useTypedSelector(
    (state) => state.authentication.authenticatedUser.role,
  )
  const [inputText, setInputText] = useState('')
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.currentTarget.value.toLowerCase()
    setInputText(lowerCase)
  }

  useEffect(() => {
    dispatch(reduxServices.EmployeeHandbook.getHandbooks())
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Handbook"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-between mb-2">
          <CCol md={4}>
            <CInputGroup className="global-search mb-4 handbook-search">
              <CFormInput
                placeholder="Search Handbook"
                aria-label="Search Handbook"
                onChange={inputHandler}
                className="input-handbook"
              />
              <CButton type="button" color="info" id="button-addon2">
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
          {(empRole === 'admin' ||
            empRole === 'HR Manager' ||
            empRole === 'HR') && (
            <CCol className="text-end" md={4}>
              <Link to={`/handbooksettings`}>
                <CButton
                  color="info"
                  className="btn-ovh me-0"
                  data-testid="handbook-settings-btn"
                >
                  <i className="fa fa-sign-out fa-fw  me-1"></i>Handbook
                  Settings
                </CButton>
              </Link>
            </CCol>
          )}
        </CRow>

        {isLoading !== ApiLoadingState.loading ? (
          <HandbookList handbooks={handbooks} inputText={inputText} />
        ) : (
          <>
            <OLoadingSpinner type={LoadingType.PAGE} />
          </>
        )}
      </OCard>
    </>
  )
}

export default EmployeeHandbook
