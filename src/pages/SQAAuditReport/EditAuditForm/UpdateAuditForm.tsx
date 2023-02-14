import { CRow, CCol, CButton } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import OCard from '../../../components/ReusableComponent/OCard'

const UpdateAuditForm = (): JSX.Element => {
  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Edit Audit"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <Link to={`/SQAAudit`}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="editAudit-back-btn"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </Link>
        </CCol>
      </CRow>
    </OCard>
  )
}
export default UpdateAuditForm
