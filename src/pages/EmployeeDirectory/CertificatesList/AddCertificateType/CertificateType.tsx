import { CButton, CCol, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { ActionMapping } from '../../../../types/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypes'
import AddNewCertificateType from './AddNewCertificateType'
import CertificateTypeTable from './CertificateTypeTable'

const CertificateType = (): JSX.Element => {
  const [selectedTechnologyId, setSelectedTechnologyId] = useState<number>()

  const certificateTypes = useTypedSelector(
    reduxServices.certificateType.selectors.certificateTypes,
  )
  const actionMapping: ActionMapping = {
    added: 'added',
    deleted: 'deleted',
    updated: 'updated',
  }

  const getToastMessage = (action: string) => {
    return (
      <OToast
        toastColor="success"
        toastMessage={`Certificate Type ${action} successfully`}
      />
    )
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Certificate Type"
        CFooterClassName="d-none"
      >
        <CRow>
          <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end pe-0">
            <CButton color="info btn-ovh me-1">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
          <CCol xs={12}>
            <AddNewCertificateType
              selectedTechnologyId={selectedTechnologyId as number}
              setSelectedTechnologyId={setSelectedTechnologyId}
            />
          </CCol>
          <CCol xs={12} className="ps-0 pe-0">
            <CertificateTypeTable
              certificateTypes={certificateTypes}
              getToastMessage={getToastMessage}
              actionMapping={actionMapping}
            />
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default CertificateType
