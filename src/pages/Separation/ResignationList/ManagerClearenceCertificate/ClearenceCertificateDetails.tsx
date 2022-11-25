import { CRow, CCol, CButton } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import ClearenceCertificateDetailsForm from './ClearenceCertificateDetailsForm'
import OCard from '../../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../../stateStore'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const ClearenceCertificateDetails = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.resignationList.selectors.isLoading,
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Clearance Certificate Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton color="info" className="btn-ovh me-1">
              <i className="fa fa-arrow-left  me-1"></i>Edit
            </CButton>

            <Link to={`/resignationList`}>
              <CButton color="info" className="btn-ovh me-1">
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <ClearenceCertificateDetailsForm />
          </>
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}

export default ClearenceCertificateDetails
