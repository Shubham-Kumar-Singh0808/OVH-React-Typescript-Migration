import { CButton, CCol, CContainer, CRow } from '@coreui/react-pro'
import React from 'react'
import { LeadershipDetailsProps } from '../../../types/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListTypes'

const LeadershipDetails = (props: LeadershipDetailsProps) => {
  const { setShowLeadershipDetails } = props

  const backButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowLeadershipDetails(false)
  }

  return (
    <CContainer>
      <CRow className="mt-2 justify-content-end">
        <CCol xs={2} className="px-0 text-end">
          <CButton
            color="info"
            data-testid="back-btn"
            className="btn-ovh me-1"
            onClick={backButtonHandler}
          >
            <i className="fa fa-arrow-left me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default LeadershipDetails
