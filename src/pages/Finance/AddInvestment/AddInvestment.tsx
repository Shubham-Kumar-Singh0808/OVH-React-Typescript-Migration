import { CRow, CCol, CButton } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import OCard from '../../../components/ReusableComponent/OCard'

const AddInvestment = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Investment"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/addSection`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="add-section-btn"
              >
                <i className="fa fa-plus me-1"></i>Add Section
              </CButton>
            </Link>
            <Link to={`/itDeclarationList`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-button"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default AddInvestment
