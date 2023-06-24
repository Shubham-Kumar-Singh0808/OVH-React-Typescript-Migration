import React, { useMemo } from 'react'
import { CTableDataCell } from '@coreui/react-pro'
import {
  MyReviewKPI,
  MyReviewUpdateRoleEnum,
  MyReviewUpdateTypeEnum,
  UpdateMyReviewFieldsDTO,
} from '../../../../../types/Performance/MyReview/myReviewTypes'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../../stateStore'
import ReviewCommentsInput from '../ReviewFormComponents/ReviewCommentsInput'
import ReviewRatingInput from '../ReviewFormComponents/ReviewRatingInput'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

// this component is used to allow the manager to enter the ratings and comments for the employee

const ManagerInput = ({
  kraId,
  kpi,
}: {
  kraId: number
  kpi: MyReviewKPI
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
      updateRole: MyReviewUpdateRoleEnum.manager,
    }
    // used to dispatch the final created object to the redux
    dispatch(reduxServices.myReview.actions.updateKRAList(finalDTO))
  }

  const managerRatingChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatchFinalDTO(e.target.value, MyReviewUpdateTypeEnum.Rating)
  }

  const managerCommentsChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    dispatchFinalDTO(e.target.value, MyReviewUpdateTypeEnum.comments)
  }

  const ratingTestId = useMemo(() => {
    return `${kpi.id}-managerRating`
  }, [kpi])

  const commentsTestId = useMemo(() => {
    return `${kpi.id}-managerComments`
  }, [kpi])

  return (
    <>
      <CTableDataCell>
        <ReviewRatingInput
          testId={generateMyReviewTestId(ratingTestId)}
          value={kpi.managerRating}
          changeHandler={managerRatingChangeHandler}
        />
      </CTableDataCell>
      <CTableDataCell>
        <ReviewCommentsInput
          testId={commentsTestId}
          value={kpi.managerFeedback}
          changeHandler={managerCommentsChangeHandler}
        />
      </CTableDataCell>
    </>
  )
}

export default ManagerInput
