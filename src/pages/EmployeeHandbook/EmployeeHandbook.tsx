import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CFormInput,
  CInputGroup,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
import HandbookList from './HandbookList'
import OCard from '../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'
import { ApiLoadingState } from '../../middleware/api/apiList'

const EmployeeHandbook = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const handbooks = useTypedSelector(
    reduxServices.EmployeeHandbook.selectors.handbookData,
  )
  const isLoading = useTypedSelector(
    reduxServices.EmployeeHandbook.selectors.isLoading,
  )

  const [inputText, setInputText] = useState('')
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.currentTarget.value
    setInputText(lowerCase)
  }

  useEffect(() => {
    dispatch(reduxServices.EmployeeHandbook.getHandbooks())
    console.log(handbooks)
  }, [dispatch])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Handbook"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-between">
          <CCol md={6}>
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
          <CCol md={2}>
            <CButton color="info" className="hb_button" size="sm">
              <i className="fa fa-light fa-toolbox"></i>
              Handbook Settings
            </CButton>
          </CCol>
        </CRow>

        {isLoading !== ApiLoadingState.loading ? (
          <HandbookList handbooks={handbooks} inputText={inputText} />
        ) : (
          <CCol>
            <CRow className="category-loading-spinner">
              <CSpinner />
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}

export default EmployeeHandbook
