import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import ApproveProjectForm from './ApproveProjectForm'
import OCard from '../../../../components/ReusableComponent/OCard'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const ApproveProjectRequest = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.isLoading,
  )
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Project"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="toggle-back-button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        {isLoading !== ApiLoadingState.loading ? (
          <ApproveProjectForm />
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}

export default ApproveProjectRequest
