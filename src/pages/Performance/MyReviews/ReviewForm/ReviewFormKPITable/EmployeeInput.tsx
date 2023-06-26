import { CTableDataCell } from '@coreui/react-pro'
import React, { useMemo } from 'react'
import ReviewCommentsInput from '../ReviewFormComponents/ReviewCommentsInput'
import ReviewRatingInput from '../ReviewFormComponents/ReviewRatingInput'
import {
  MyReviewKPI,
  MyReviewUpdateRoleEnum,
  MyReviewUpdateTypeEnum,
  UpdateMyReviewFieldsDTO,
} from '../../../../../types/Performance/MyReview/myReviewTypes'
import { useAppDispatch } from '../../../../../stateStore'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

const EmployeeInput = ({
  kpi,
  kraId,
}: {
  kpi: MyReviewKPI
  kraId: number
}): JSX.Element => {
  const dispatch = useAppDispatch()
  // used to form the DTO for updating the list and dispatches it
  const dispatchFinalDTO = (
    updatedValue: string,
    updateType: MyReviewUpdateTypeEnum,
  ) => {
    const finalDTO: UpdateMyReviewFieldsDTO = {
      data: {
        kraId,
        kpiId: kpi.id,
        updatedValue,
      },
      updateType,
      updateRole: MyReviewUpdateRoleEnum.employee,
    }
    // used to dispatch the final created object to the redux
    dispatch(reduxServices.myReview.actions.updateKRAList(finalDTO))
  }

  const employeeRatingChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatchFinalDTO(e.target.value, MyReviewUpdateTypeEnum.Rating)
  }

  const employeeCommentsChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    dispatchFinalDTO(e.target.value, MyReviewUpdateTypeEnum.comments)
  }

  const ratingTestId = useMemo(() => {
    return `${kpi.id}-empRating`
  }, [kpi])

  const commentsTestId = useMemo(() => {
    return `${kpi.id}-empComments`
  }, [kpi])

  return (
    <>
      <CTableDataCell>
        <ReviewRatingInput
          value={kpi.employeeRating}
          changeHandler={employeeRatingChangeHandler}
          testId={`${generateMyReviewTestId(ratingTestId)}`}
        />
      </CTableDataCell>
      <CTableDataCell>
        <ReviewCommentsInput
          testId={commentsTestId}
          value={kpi.employeeFeedback}
          changeHandler={employeeCommentsChangeHandler}
        />
      </CTableDataCell>
    </>
  )
}

export default EmployeeInput
