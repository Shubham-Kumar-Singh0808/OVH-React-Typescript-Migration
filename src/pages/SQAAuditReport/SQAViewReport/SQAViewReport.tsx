import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import SQAReportDetails from './SQAReportDetails'
import OCard from '../../../components/ReusableComponent/OCard'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const SQAViewReport = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.isLoading,
  )
  const { auditId } = useParams<{ auditId: string }>()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.sqaAuditReport.getSQAAuditDetails(Number(auditId)))
  }, [])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Audit Details"
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
          <SQAReportDetails />
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}

export default SQAViewReport
