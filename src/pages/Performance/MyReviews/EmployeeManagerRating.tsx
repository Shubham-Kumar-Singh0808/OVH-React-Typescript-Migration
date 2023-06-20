import { CRow } from '@coreui/react-pro'
import React, { useMemo } from 'react'
import { generateMyReviewTestId } from './MyReviewHelpers'
import { useTypedSelector } from '../../../stateStore'

// this component is used to display the ratings of employee and manager

const EmployeeManagerRating = (): JSX.Element => {
  const empAvgRating = useTypedSelector(
    (state) => state.myReview.appraisalForm.empAvgRating,
  )
  const employeeName = useTypedSelector(
    (state) => state.myReview.appraisalForm.employee.fullName,
  )
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

  return (
    <CRow className="mt-2">
      <div className="d-flex flex-row flex-wrap" style={{ gap: '200px' }}>
        <div data-testid={generateMyReviewTestId('employeeRating')}>
          <span
            style={{ color: '#2768a3', paddingRight: '8px' }}
            data-testid={generateMyReviewTestId('employeeRatingName')}
          >
            <b>{employeeName}</b> Rating:
          </span>
          {empAvgRating}
        </div>
        <div data-testid={generateMyReviewTestId('managerRating')}>
          <span
            style={{ color: '#2768a3', paddingRight: '8px' }}
            data-testid={generateMyReviewTestId('managerRatingName')}
          >
            <b>{managerName}</b> Rating:
          </span>
          {finalManagerRating}
        </div>
      </div>
    </CRow>
  )
}

export default EmployeeManagerRating
