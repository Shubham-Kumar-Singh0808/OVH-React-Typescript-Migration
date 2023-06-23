import React, { useMemo } from 'react'
import { CFormSelect } from '@coreui/react-pro'
import { useTypedSelector } from '../../../../../stateStore'
import {
  initialPerformanceRating,
  myReviewTableItemBorderBottom,
} from '../../MyReviewHelpers'

const ReviewRatingInput = ({
  value,
  changeHandler,
  testId,
}: {
  value: number | null
  testId: string
  changeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
}): JSX.Element => {
  const performanceRatings = useTypedSelector(
    (state) => state.myReview.performanceRatings,
  )

  const finalSelectedValue = useMemo(() => {
    // if chosen nothing, then set to default
    return value !== null ? value : initialPerformanceRating.rating
  }, [value])

  return (
    <CFormSelect
      value={finalSelectedValue.toString()}
      data-testid={testId}
      onChange={changeHandler}
      style={{ marginBottom: myReviewTableItemBorderBottom }}
    >
      <option value={initialPerformanceRating.rating}>Select Rating</option>
      {performanceRatings?.map((rating, ratingIndex) => (
        <option key={ratingIndex} value={rating.rating.toString()}>
          {rating.rating}
        </option>
      ))}
    </CFormSelect>
  )
}

export default ReviewRatingInput
