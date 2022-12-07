import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import ProjectRequestViewDetails from './ProjectRequestViewDetails'
import OCard from '../../../../components/ReusableComponent/OCard'

const ProjectRequestView = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Project Request History"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="toggle-back-button"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <ProjectRequestViewDetails />
      </OCard>
    </>
  )
}

export default ProjectRequestView
