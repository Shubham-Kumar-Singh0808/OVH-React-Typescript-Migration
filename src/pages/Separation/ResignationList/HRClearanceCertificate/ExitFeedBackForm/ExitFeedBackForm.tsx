import { CRow, CCol, CButton } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import ExitFeedBackFormFilterOptions from './ExitFeedBackFormFilterOptions'
import OCard from '../../../../../components/ReusableComponent/OCard'

const ExitFeedBackForm = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Exit FeedBack Form"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/ClearanceCertificateHR`}>
              <CButton color="info" className="btn-ovh me-1">
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <ExitFeedBackFormFilterOptions />
      </OCard>
    </>
  )
}

export default ExitFeedBackForm
