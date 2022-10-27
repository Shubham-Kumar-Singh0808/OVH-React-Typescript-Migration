import React from 'react'
import { CButton, CCol } from '@coreui/react-pro'
import OCard from '../../../components/ReusableComponent/OCard'

const AppraisalConfigurations = () => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Appraisal Configurations"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {' '}
        <CCol sm={3}>
          <CButton
            data-testid="designationButton"
            color="info"
            className="btn-ovh me-1"
          >
            <i className="fa fa-plus me-1"></i>Add Configuration
          </CButton>
        </CCol>
      </OCard>
    </>
  )
}

export default AppraisalConfigurations
