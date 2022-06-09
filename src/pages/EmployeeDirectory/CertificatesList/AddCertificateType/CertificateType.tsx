import { CButton, CCol, CRow } from '@coreui/react-pro'
import React from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import AddNewCertificateType from './AddNewCertificateType'
import CertificateTypeTable from './CertificateTypeTable'

const CertificateType = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Certificate Details"
        CFooterClassName="d-none"
      >
        <CRow>
          <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end pe-0">
            <CButton color="info btn-ovh me-1">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
          <CCol xs={12}>
            <AddNewCertificateType />
          </CCol>
          <CCol xs={12} className="ps-0 pe-0">
            <CertificateTypeTable />
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default CertificateType
