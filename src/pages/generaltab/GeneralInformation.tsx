/* eslint-disable prettier/prettier */
import { CCardHeader, CRow, CCol } from '@coreui/react-pro'
import React from 'react'

const GeneralInformation = (): JSX.Element => {
  return (
    <>
      <CCardHeader className="mt-10 fw-semibold">
        General Information
      </CCardHeader>
      <CRow className="mb-12 mt-4 ">
        <CCol className="text-center mt-4" md={3}>
          <i className="fa fa-user fs-2 mt-3 " />
        </CCol>
        <CCol md={4}>
          <dl>
            <dt>Base Location</dt>

            <dt>Current Location</dt>

            <dt>Current Address</dt>
          </dl>
        </CCol>

        <CCol md={5}>
          <dl>
            <dt>Gender</dt>
            <dt>Blood Group</dt>

            <dt>Date of Birth</dt>

            <dt>Marital Status</dt>

            <dt>Emergency Contact</dt>
          </dl>
        </CCol>
      </CRow>
    </>
  )
}

export default GeneralInformation
