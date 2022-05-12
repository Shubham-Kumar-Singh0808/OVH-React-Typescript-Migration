import React, { useEffect } from 'react'
import { CCol, CForm, CRow } from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  doFetchQualifications,
  selectEmployeeId,
  selectEmployeeQualification,
} from '../../../../reducers/Qualifications/qualificationSlice'
import parse from 'html-react-parser'

const EmployeeQualifications = (): JSX.Element => {
  const employeeQualification = useTypedSelector(selectEmployeeQualification)
  const employeeId = useTypedSelector(selectEmployeeId)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(doFetchQualifications(employeeId))
  }, [dispatch, employeeId])
  return (
    <>
      <CForm>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-dark-blue text-end">
            Post Graduation :
          </CCol>
          <CCol sm={6} className="ps-0 text-dark" data-testid="post-graduation">
            {employeeQualification?.pgLookUp
              ?.map((pgItem) => pgItem.label)
              .join(', ') || 'N/A'}
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol
            sm={3}
            className="text-dark-blue text-end"
            data-testid="graduation"
          >
            Graduation :
          </CCol>
          <CCol sm={6} className="ps-0 text-dark">
            {employeeQualification?.graduationLookUp
              ?.map((graduationItem) => graduationItem.label)
              .join(', ') || 'N/A'}
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-dark-blue text-end">
            Higher Secondary Education :
          </CCol>
          <CCol sm={6} className="ps-0 text-dark" data-testid="hsc">
            {employeeQualification?.hscName || 'N/A'}
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-dark-blue text-end">
            School Secondary Education :
          </CCol>
          <CCol sm={6} className="ps-0 text-dark" data-testid="ssc">
            {employeeQualification?.sscName || 'N/A'}
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-dark-blue text-end">
            Others :
          </CCol>
          <CCol sm={6} className="ps-0 text-dark" data-testid="others">
            {(employeeQualification?.others &&
              parse(employeeQualification?.others)) ||
              'N/A'}
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}
export default EmployeeQualifications
