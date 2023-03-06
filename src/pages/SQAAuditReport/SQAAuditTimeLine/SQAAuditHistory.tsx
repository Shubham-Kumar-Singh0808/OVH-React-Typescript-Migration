import { CRow, CCol, CButton, CSpinner } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import SQAAuditTimeLine from './SQAAuditTimeLine'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const SQAAuditHistory = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.isLoading,
  )
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="SQA Audit New Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/SQAAudit`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="toggle-back-button"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <SQAAuditTimeLine />
          </>
        ) : (
          <CCol>
            <CRow className="category-loading-spinner">
              <CSpinner />
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}
export default SQAAuditHistory
