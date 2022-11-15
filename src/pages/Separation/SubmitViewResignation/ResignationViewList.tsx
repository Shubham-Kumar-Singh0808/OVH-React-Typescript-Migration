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
    dispatch(reduxServices.submitViewResignation.getEmployeeResignationView())
  }, [dispatch])

  return (
    <>
      <CForm>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Status:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getResignationViewResponse?.status}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-3 col-form-label text-end p-1">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getResignationViewResponse?.relievingDate}</p>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default ResignationViewList
