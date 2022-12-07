import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import ProjectRequestTimeLine from './ProjectRequestTimeLine'
import OCard from '../../../../components/ReusableComponent/OCard'

const ProjectRequestHistoryDetails = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Project Request History Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="toggle-back-button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <ProjectRequestTimeLine />
      </OCard>
    </>
  )
}

export default ProjectRequestHistoryDetails
