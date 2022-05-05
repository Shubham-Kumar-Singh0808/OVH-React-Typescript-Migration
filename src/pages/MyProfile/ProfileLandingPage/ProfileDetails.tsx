import { CCol, CRow } from '@coreui/react-pro'

import React from 'react'
import { useSelector } from 'react-redux'
const ProfileDetails = (): JSX.Element => {
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
            <h4>'generalInformation. fullName'</h4>
            <p className="job-title">'generalInformation. designation'</p>
          </div>
        </CCol>
        <CCol sm={2}>
          <dl>
            <dt>Employee Id</dt>
            <dd className="mb-0">'generalInformation. id'</dd>
            <dt>Blood Group</dt>
            <dd className="mb-0">'generalInformation. bloodgroup'</dd>
          </dl>
        </CCol>
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
