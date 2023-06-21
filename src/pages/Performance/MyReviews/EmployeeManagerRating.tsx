import { CRow } from '@coreui/react-pro'
import React, { useMemo } from 'react'
import {
  generateMyReviewTestId,
  sortAvgRatingDTOsByLevel,
} from './MyReviewHelpers'
import { useTypedSelector } from '../../../stateStore'

// this component is used to display the ratings of employee and manager

const EmployeeManagerRating = (): JSX.Element => {
  const managerName = useTypedSelector(
    (state) => state.myReview.appraisalForm.manager1Name,
  )
  // getting this for manager avg rating
  const managerAvgRatingDTO = useTypedSelector(
    (state) =>
      state.myReview.appraisalForm.avgRatingsDtos.filter(
        (dto) => dto.employeeName === managerName,
      )[0],
  )

  const finalManagerRating = useMemo(() => {
    return managerAvgRatingDTO?.defaultAvgRating
      ? managerAvgRatingDTO.defaultAvgRating
      : 'N/A'
  }, [managerAvgRatingDTO])

  // all the dtos
  const avgRatingsDTOs = useTypedSelector(
    (state) => state.myReview.appraisalForm.avgRatingsDtos,
  )

  return (
    <>
      <CRow className="mt-2">
        <div className="d-flex flex-row flex-wrap" style={{ gap: '200px' }}>
          {sortAvgRatingDTOsByLevel(avgRatingsDTOs).map(
            (rating, ratingIndex) => (
              <div
                key={ratingIndex}
                data-testid={generateMyReviewTestId(`avgDTORatingDiv`)}
              >
                <span
                  style={{ color: '#2768a3', paddingRight: '8px' }}
                  data-testid={generateMyReviewTestId(
                    `avgDTORatingRating-${ratingIndex}`,
                  )}
                >
                  <b>{rating.employeeName}</b> Rating:
                </span>
                {rating.defaultAvgRating ? rating.defaultAvgRating : 'N/A'}
              </div>
            ),
          )}
        </div>
      </CRow>
      {
        // shown only when delivery manager involved
        avgRatingsDTOs.length > 2 && (
          <CRow>
            <hr className="mt-4" />
            <div
              data-testid={generateMyReviewTestId(`avgDTORatingManagerRating`)}
            >
              <span
                style={{ color: '#2768a3', paddingRight: '8px' }}
                data-testid={generateMyReviewTestId(
                  `avgDTORatingManagerRatingLabel`,
                )}
              >
                Manager&apos;s Average Rating:
              </span>
              {finalManagerRating}
            </div>
          </CRow>
        )
      }
    </>
  )
}

export default EmployeeManagerRating
