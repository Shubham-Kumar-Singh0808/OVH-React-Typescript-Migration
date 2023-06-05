import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import SQAAuditTimeLine from './SQAAuditTimeLine'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const SQAAuditHistory = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.isLoading,
  )
  const { auditId } = useParams<{ auditId: string }>()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.sqaAuditReport.getNewSQAAuditTimelineDetails(
        Number(auditId),
      ),
    )
  }, [dispatch])
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
                data-testid="back-button"
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
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}
export default SQAAuditHistory
