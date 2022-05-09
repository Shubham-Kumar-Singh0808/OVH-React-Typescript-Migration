import { CCardHeader, CRow, CCol } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { doFetchEmployeeGeneralInformation } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'

const EmployeeGeneralInformation = (): JSX.Element => {
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const employeeGeneralInformation = useTypedSelector(
    (state) => state.getLoggedInEmployeeData,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(doFetchEmployeeGeneralInformation(employeeId as number))
  }, [dispatch, employeeId])
  console.log(employeeGeneralInformation)
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
            {employeeGeneralInformation.baseLocation && (
              <>
                <dt>Base Location</dt>
                <dd>{employeeGeneralInformation.baseLocation}</dd>
              </>
            )}
            {employeeGeneralInformation.curentLocation && (
              <>
                <dt>Current Location</dt>
                <dd>{employeeGeneralInformation.curentLocation}</dd>
              </>
            )}

            {employeeGeneralInformation.address && (
              <>
                <dt>Current Address</dt>
                <dd>{employeeGeneralInformation.address}</dd>
              </>
            )}
          </dl>
        </CCol>

        <CCol md={5}>
          <dl>
            <dt>Gender</dt>
            <dd>{employeeGeneralInformation.gender}</dd>
            {employeeGeneralInformation.bloodgroup && (
              <>
                <dt>Blood Group</dt>
                <dd>{employeeGeneralInformation.bloodgroup}</dd>
              </>
            )}
            <dt>Date of Birth</dt>
            <dd>{employeeGeneralInformation.realBirthday}</dd>
            {employeeGeneralInformation.maritalStatus && (
              <>
                <dt>Marital Status</dt>
                <dd>{employeeGeneralInformation.maritalStatus}</dd>
              </>
            )}
            {employeeGeneralInformation.emergencyContact && (
              <>
                <dt>Emergency Contact</dt>
                <dd>{employeeGeneralInformation.emergencyContact}</dd>
              </>
            )}
          </dl>
        </CCol>
      </CRow>
    </>
  )
}

export default EmployeeGeneralInformation
