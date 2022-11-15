import { CForm, CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const ResignationViewList = (): JSX.Element => {
  const getResignationViewResponse = useTypedSelector(
    reduxServices.submitViewResignation.selectors.resignationView,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.submitViewResignation.getEmployeeResgnationView())
  }, [dispatch])
  console.log(getResignationViewResponse)
  return (
    <>
      <CForm>
        <CRow className="mt-3 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Status:
          </CFormLabel>
          <CCol sm={3}>
            <p>{getResignationViewResponse?.status}</p>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p>{getResignationViewResponse?.relievingDate}</p>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default ResignationViewList
