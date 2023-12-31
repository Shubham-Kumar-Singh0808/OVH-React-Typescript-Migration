import { CButton, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddNewCertificateType from './AddNewCertificateType'
import CertificateTypeTable from './CertificateTypeTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'

const CertificateType = (): JSX.Element => {
  const [selectedTechnologyId, setSelectedTechnologyId] = useState<number>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.certificateType.getCertificateTypes())
    dispatch(reduxServices.certificateType.actions.setCurrentPage(1))
    dispatch(reduxServices.certificateType.actions.setPageSize(20))
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Certificate Type"
        CFooterClassName="d-none"
      >
        <CRow>
          <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end pe-0">
            <Link to={`/employeeCertificatesReport`}>
              <CButton color="info btn-ovh me-1">
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
          <CCol xs={12}>
            <AddNewCertificateType
              selectedTechnologyId={selectedTechnologyId as number}
              setSelectedTechnologyId={setSelectedTechnologyId}
            />
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
