import { CCol, CRow } from '@coreui/react-pro'

import { EmployeeGeneralInformation } from '../../../types/MyProfile/GeneralTab/generalInformationTypes'
import React from 'react'

// import React, { useEffect } from 'react'
// import {
//   getEmployeeGeneralInformation,
//   selectLoggedInData,
// } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
// import { useAppDispatch, useTypedSelector } from '../../../stateStore'

// import { selectEmployeeId } from '../../../reducers/Login/authenticationSlice'

const ProfileDetails = ({
  employeeGeneralInformation,
}: EmployeeGeneralInformation): JSX.Element => {
  // const employeeId = useTypedSelector(selectEmployeeId)
  // const employeeGeneralInformation = useTypedSelector(selectLoggedInData)
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(getEmployeeGeneralInformation(employeeId as string))
  // }, [dispatch, employeeId])
  return (
    <>
      <CRow className="mb-4">
        <CCol sm={3}>
          <div className="profile-avatar">
            <img
              width="120px"
              height="120px;"
              src="{generalInformation.profilePicPath}"
              alt="{generalInformation.fullName}"
            />
          </div>
        </CCol>
        <CCol sm={2}>
          <div className="profile-name">
            <h4>{employeeGeneralInformation?.fullName}</h4>
            <p className="job-title">
              {employeeGeneralInformation?.designation}
            </p>
          </div>
        </CCol>
        {/* <CCol sm={2}>
          <dl>
            <dt>Employee Id</dt>
            <dd className="mb-0">'generalInformation. id'</dd>
            <dt>Blood Group</dt>
            <dd className="mb-0">'generalInformation. bloodgroup'</dd>
          </dl>
        </CCol> */}
        {/* <CCol sm={2}>
          <dl>
            {generalInformation.homeNumber && (
              <>
                <dt>Home</dt>
                <dd className="mb-0">{generalInformation.homeNumber}</dd>
              </>
            )}
            {generalInformation.mobile && (
              <>
                <dt>Mobile</dt>
                <dd className="mb-0">{generalInformation.mobile}</dd>
              </>
            )}
            {generalInformation.alternativeMobile && (
              <>
                <dt>Alternative Mobile</dt>
                <dd className="mb-0">{generalInformation.alternativeMobile}</dd>
              </>
            )}
            {generalInformation.workNumber && (
              <>
                <dt>Work</dt>
                <dd className="mb-0">{generalInformation.workNumber}</dd>
              </>
            )}
          </dl>
        </CCol>
        <CCol sm={3}> 
          <dl>
            <dt>Email ID</dt>
            <dd>{generalInformation.emailId}</dd>
            <dt>Experience</dt>
            <dd>{generalInformation.updatedExperience}</dd>
            <dt>Skype</dt>
            <dd>{generalInformation.skypeId}</dd>
          </dl>
        </CCol>*/}
      </CRow>
    </>
  )
}

export default ProfileDetails
