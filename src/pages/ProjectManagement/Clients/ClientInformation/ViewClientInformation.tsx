import { CRow, CCol, CButton, CFormLabel, CForm } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const ViewClientInformation = (): JSX.Element => {
  const getClientInformation = useTypedSelector(
    reduxServices.clientInformation.selectors.viewClientInformation,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.clientInformation.getClientInformation(18))
  }, [dispatch])
  console.log(getClientInformation)
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }
  const commonFormLabel = 'col-sm-3 text-end'
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Client Information"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton color="info" className="btn-ovh me-1">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm className="form-horizontal">
          <CRow className="mt-3">
            <CFormLabel
              {...dynamicFormLabelProps('organization', commonFormLabel)}
            >
              Org:
            </CFormLabel>
            <CCol sm={2}>
              <span className="col-sm-15 text-end">
                {getClientInformation.organization}
              </span>
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel {...dynamicFormLabelProps('client', commonFormLabel)}>
              Client:
            </CFormLabel>
            <CCol sm={2}>
              <span className="col-sm-15 text-end">
                {getClientInformation.name}
              </span>
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel {...dynamicFormLabelProps('contact', commonFormLabel)}>
              Contact Person:
            </CFormLabel>
            <CCol sm={2}>
              <span className="col-sm-15 text-end">
                {getClientInformation.personName}
              </span>
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel {...dynamicFormLabelProps('email', commonFormLabel)}>
              Email ID:
            </CFormLabel>
            <CCol sm={2}>
              <span className="col-sm-15 text-end">
                {getClientInformation.email}
              </span>
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel {...dynamicFormLabelProps('country', commonFormLabel)}>
              Country:
            </CFormLabel>
            <CCol sm={2}>
              <span className="col-sm-15 text-end">
                {getClientInformation.country}
              </span>
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel {...dynamicFormLabelProps('mobile', commonFormLabel)}>
              Mobile:
            </CFormLabel>
            <CCol sm={2}>
              <span className="col-sm-15 text-end">
                {getClientInformation.phone || 'N/A'}
              </span>
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel {...dynamicFormLabelProps('address', commonFormLabel)}>
              Address:
            </CFormLabel>
            <CCol sm={2}>
              <span className="col-sm-15 text-end">
                {getClientInformation.address}
              </span>
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel
              {...dynamicFormLabelProps('description', commonFormLabel)}
            >
              Description:
            </CFormLabel>
            <CCol sm={2}>
              <span className="col-sm-15 text-end">
                {getClientInformation.description || 'N/A'}
              </span>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default ViewClientInformation
