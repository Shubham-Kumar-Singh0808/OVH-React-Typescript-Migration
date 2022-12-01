import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import OCard from '../../../../components/ReusableComponent/OCard'

const FinanceClearanceCertificate = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Clearance Certificate"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/resignationList`}>
              <CButton color="info" className="btn-ovh me-1">
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default FinanceClearanceCertificate
