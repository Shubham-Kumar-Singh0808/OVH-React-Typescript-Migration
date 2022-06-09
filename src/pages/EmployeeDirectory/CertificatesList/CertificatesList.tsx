import { CCol, CRow } from '@coreui/react-pro'

import CertificateDetailsExpandableTable from './CertificateDetailsExpandableTable'
import CertificatesFilterOptions from './CertificatesFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import React from 'react'

const CertificatesList = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Certificate Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow>
          <CCol xs={12}>
            <CertificatesFilterOptions />
          </CCol>
          <CCol xs={12}>
            <CertificateDetailsExpandableTable />
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default CertificatesList
