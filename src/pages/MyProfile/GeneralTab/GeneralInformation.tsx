import { CCardHeader, CCol, CRow } from '@coreui/react-pro'

import React from 'react'
import { selectLoggedInEmployeeData } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import { useTypedSelector } from '../../../stateStore'

const EmployeeGeneralInformation = (): JSX.Element => {
  const employeeGeneralInformation = useTypedSelector(
    selectLoggedInEmployeeData,
  )

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
            {employeeGeneralInformation?.baseLocation && (
              <>
                <dt>Base Location</dt>
                <dd>{employeeGeneralInformation?.baseLocation}</dd>
              </>
            )}
            {employeeGeneralInformation?.curentLocation && (
              <>
                <dt>Current Location</dt>
                <dd>{employeeGeneralInformation?.curentLocation}</dd>
              </>
            )}

            {employeeGeneralInformation?.address && (
              <>
                <dt>Current Address</dt>
                <dd>{employeeGeneralInformation?.address}</dd>
              </>
            )}
          </dl>
        </CCol>

        <CCol md={5}>
          <dl>
            <dt>Gender</dt>
            <dd>{employeeGeneralInformation?.gender}</dd>
            {employeeGeneralInformation?.bloodgroup && (
              <>
                <dt>Blood Group</dt>
                <dd>{employeeGeneralInformation?.bloodgroup}</dd>
              </>
            )}
            <dt>Date of Birth</dt>
            <dd>{employeeGeneralInformation?.realBirthday}</dd>
            {employeeGeneralInformation?.maritalStatus && (
              <>
                <dt>Marital Status</dt>
                <dd>{employeeGeneralInformation?.maritalStatus}</dd>
              </>
            )}
            {employeeGeneralInformation?.emergencyContact && (
              <>
                <dt>Emergency Contact</dt>
                <dd>{employeeGeneralInformation?.emergencyContact}</dd>
              </>
            )}
          </dl>
        </CCol>
      </CRow>
    </>
  )
}

export default EmployeeGeneralInformation
