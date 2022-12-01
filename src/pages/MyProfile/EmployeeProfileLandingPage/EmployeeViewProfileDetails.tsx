import React from 'react'
import { CCol, CRow } from '@coreui/react-pro'
import { ProfileDetailsProps } from '../../../types/MyProfile/GeneralTab/generalInformationTypes'

const EmployeeViewProfileDetails = ({
  employeeGeneralInformation: employeeProfileInformation,
}: ProfileDetailsProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-4">
        <CCol sm={3}>
          <div className="profile-avatar">
            <img
              width="120px"
              height="120px;"
              src={employeeProfileInformation?.profilePicPath}
              alt={employeeProfileInformation?.fullName}
            />
          </div>
        </CCol>
        <CCol sm={2}>
          <div className="profile-name">
            <h4>{employeeProfileInformation?.fullName}</h4>
            <p className="job-title">
              {employeeProfileInformation?.designation}
            </p>
          </div>
        </CCol>
        <CCol sm={2}>
          <dl>
            <dt>Employee Id</dt>
            <dd className="mb-0">{employeeProfileInformation?.id}</dd>
            <dt>Blood Group</dt>
            <dd className="mb-0">{employeeProfileInformation?.bloodgroup}</dd>
          </dl>
        </CCol>
        <CCol sm={2}>
          <dl>
            {employeeProfileInformation?.homeNumber && (
              <>
                <dt>Home</dt>
                <dd className="mb-0">
                  {employeeProfileInformation?.homeNumber}
                </dd>
              </>
            )}
            {employeeProfileInformation?.mobile && (
              <>
                <dt>Mobile</dt>
                <dd className="mb-0">{employeeProfileInformation?.mobile}</dd>
              </>
            )}
            {employeeProfileInformation?.alternativeMobile && (
              <>
                <dt>Alternative Mobile</dt>
                <dd className="mb-0">
                  {employeeProfileInformation?.alternativeMobile}
                </dd>
              </>
            )}
            {employeeProfileInformation?.workNumber && (
              <>
                <dt>Work</dt>
                <dd className="mb-0">
                  {employeeProfileInformation?.workNumber}
                </dd>
              </>
            )}
          </dl>
        </CCol>
        <CCol sm={3}>
          <dl>
            <dt>Email ID</dt>
            <dd>{employeeProfileInformation?.emailId}</dd>
            <dt>Experience</dt>
            <dd>{employeeProfileInformation?.updatedExperience}</dd>
            <dt>Skype</dt>
            <dd>{employeeProfileInformation?.skypeId}</dd>
          </dl>
        </CCol>
      </CRow>
    </>
  )
}

export default EmployeeViewProfileDetails
