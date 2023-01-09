import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import AddProjectRequestForm from './AddProjectRequestForm'
import OCard from '../../../../components/ReusableComponent/OCard'

const AddProjectRequest = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Request Project"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1 add-project-back-btn"
              data-testid="toggle-back-button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <AddProjectRequestForm setToggle={setToggle} />
      </OCard>
    </>
  )
}

export default AddProjectRequest
