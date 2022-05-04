/* eslint-disable prettier/prettier */
import { CCardHeader, CRow, CCol } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {doFetchEmployeeGeneralInformation} from '../../../reducers/MyProfile/GeneralTab/employeeGeneralInformationSlice'

const GeneralInformation = (): JSX.Element => {
  const employeeId = useTypedSelector((state) => state.authentication.authenticatedUser.employeeId)
  const generalInformation = useTypedSelector((state) => state.getLoggedInEmployeeData)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(doFetchEmployeeGeneralInformation(employeeId as number))
  }, [dispatch, employeeId])
  console.log(generalInformation)
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
            {generalInformation.baseLocation && (
              <>
                <dt>Base Location</dt>
                <dd>{generalInformation.baseLocation}</dd>
              </>
            )}
            {generalInformation.curentLocation && (
              <>
                <dt>Current Location</dt>
                <dd>{generalInformation.curentLocation}</dd>
              </>
            )}

            {generalInformation.address && (
              <>
                <dt>Current Address</dt>
                <dd>{generalInformation.address}</dd>
              </>
            )}
          </dl>
        </CCol>

        <CCol md={5}>
          <dl>
            <dt>Gender</dt>
            <dd>{generalInformation.gender}</dd>
            {generalInformation.bloodgroup && (
              <>
                <dt>Blood Group</dt>
                <dd>{generalInformation.bloodgroup}</dd>
              </>
            )}
            <dt>Date of Birth</dt>
            <dd>{generalInformation.realBirthday}</dd>
            {generalInformation.maritalStatus && (
              <>
                <dt>Marital Status</dt>
                <dd>{generalInformation.maritalStatus}</dd>
              </>
            )}
            {generalInformation.emergencyContact && (
              <>
                <dt>Emergency Contact</dt>
                <dd>{generalInformation.emergencyContact}</dd>
              </>
            )}
          </dl>
        </CCol>
      </CRow>
    </>
  )
}

export default GeneralInformation
