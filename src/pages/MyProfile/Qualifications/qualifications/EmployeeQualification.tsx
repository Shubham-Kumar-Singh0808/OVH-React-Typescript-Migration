import React, { useEffect } from 'react'
import { CCol, CForm, CRow } from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { doFetchQualifications } from '../../../../reducers/MyProfile/Qualifications/qualificationSlice'

const EmployeeQualifications = (): JSX.Element => {
  const employeeQualification = useTypedSelector(
    (state) => state.employeeQualifications.qualificationDetails,
  )
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  console.log(typeof employeeId)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(doFetchQualifications(employeeId as string))
  }, [dispatch, employeeId])
  return (
    <>
      <CForm>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-dark-blue text-end">
            Post Graduation :
          </CCol>
          <CCol sm={6} className="ps-0 text-dark">
            {employeeQualification?.pgLookUp.map((pgItem) => pgItem.label) ||
              'N/A'}
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-dark-blue text-end">
            Graduation :
          </CCol>
          <CCol sm={6} className="ps-0 text-dark">
            {employeeQualification?.graduationLookUp.map(
              (graduationItem) => graduationItem.label,
            ) || 'N/A'}
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-dark-blue text-end">
            Higher Secondary Education :
          </CCol>
          <CCol sm={6} className="ps-0 text-dark">
            {employeeQualification?.hscName || 'N/A'}
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-dark-blue text-end">
            School Secondary Education :
          </CCol>
          <CCol sm={6} className="ps-0 text-dark">
            {employeeQualification?.sscName || 'N/A'}
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol sm={3} className="text-dark-blue text-end">
            Others :
          </CCol>
          <CCol sm={6} className="ps-0 text-dark">
            {employeeQualification?.others || 'N/A'}
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}
export default EmployeeQualifications
