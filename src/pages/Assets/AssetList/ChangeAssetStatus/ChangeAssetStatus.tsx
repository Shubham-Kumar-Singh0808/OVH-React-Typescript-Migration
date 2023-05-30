import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import ChangeAssetFilterOptions from './ChangeAssetFilterOptions'
import OCard from '../../../../components/ReusableComponent/OCard'

const ChangeAssetStatus = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Change Asset Status"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <ChangeAssetFilterOptions />
      </OCard>
    </>
  )
}

export default ChangeAssetStatus
