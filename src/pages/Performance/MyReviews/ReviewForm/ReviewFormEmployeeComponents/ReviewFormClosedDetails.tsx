import React from 'react'
import { CFormInput } from '@coreui/react-pro'
import ReviewFormClosedDetailsUI from './ReviewFormClosedDetailsUI'
import { useTypedSelector } from '../../../../../stateStore'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

const ReviewFormClosedDetails = (): JSX.Element => {
  const appraisalForm = useTypedSelector(
    (state) => state.myReview.appraisalForm,
  )

  return (
    <>
      <div className="ms-3 mt-2">
        <ReviewFormClosedDetailsUI label="Closed On" childrenColNum={2}>
          <CFormInput
            readOnly
            value={appraisalForm.closedOn ? appraisalForm.closedOn : ''}
            data-testid={generateMyReviewTestId('finalClosedOn')}
          />
        </ReviewFormClosedDetailsUI>
        <ReviewFormClosedDetailsUI
          label="Closed Status"
          contentTestId={generateMyReviewTestId('finalClosedStatus')}
        >
          {appraisalForm.closedStatus}
        </ReviewFormClosedDetailsUI>

        <ReviewFormClosedDetailsUI
          label="Closed Summary"
          contentTestId={generateMyReviewTestId('finalClosedSummary')}
        >
          {appraisalForm.closedSummary}
        </ReviewFormClosedDetailsUI>
        <ReviewFormClosedDetailsUI
          label="Closed By"
          contentTestId={generateMyReviewTestId('finalClosedBy')}
        >
          {appraisalForm.closedBy}
        </ReviewFormClosedDetailsUI>
      </div>
    </>
  )
}

export default ReviewFormClosedDetails
