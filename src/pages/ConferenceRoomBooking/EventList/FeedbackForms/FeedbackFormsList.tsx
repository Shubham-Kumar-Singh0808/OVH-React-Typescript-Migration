import React, { useEffect } from 'react'
import { CRow } from '@coreui/react-pro'
import { useParams } from 'react-router-dom'
import UploadFeedbackForm from './UploadFeedbackForm'
import FeedbackFormTable from './FeedbackFormTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const FeedbackFormsList = (): JSX.Element => {
  const { eventId } = useParams<{ eventId: string }>()
  const dispatch = useAppDispatch()
  const feedbackFormListSize = useTypedSelector(
    reduxServices.eventList.selectors.feedbackFormListSize,
  )
  const isLoading = useTypedSelector(
    reduxServices.eventList.selectors.isLoading,
  )
  const {
    paginationRange,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = usePagination(feedbackFormListSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.eventList.getFeedbackFormList({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        eventId: Number(eventId),
      }),
    )
  }, [currentPage, dispatch, pageSize])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Feedback Forms"
        CFooterClassName="d-none"
      >
        <UploadFeedbackForm />
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <CRow className="mt-4">
              <FeedbackFormTable
                paginationRange={paginationRange}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
              />
            </CRow>
          </>
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}

export default FeedbackFormsList
