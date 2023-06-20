import { CTableRow, CTableDataCell } from '@coreui/react-pro'
import React from 'react'
import EmployeeInput from './EmployeeInput'
import ManagerInput from './ManagerInput'
import {
  MyReviewAppraisalFormStatus,
  MyReviewFormStatus,
  MyReviewKPI,
  MyReviewModalProps,
} from '../../../../../types/Performance/MyReview/myReviewTypes'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import ReviewReadonlyData from '../ReviewFormComponents/ReviewReadonlyData'
import {
  canEmployeeViewAfterManagerSubmit,
  generateMyReviewTestId,
} from '../../MyReviewHelpers'
import KPIDescriptionModal from '../ReviewFormModals/KPIDescriptionModal'
import { reduxServices } from '../../../../../reducers/reduxServices'

const ReviewFormKPITableRow = ({
  kpi,
  kpiIndex,
  kraId,
}: {
  kpi: MyReviewKPI
  kpiIndex: number
  kraId: number
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const reviewFormStatus = useTypedSelector(
    (state) => state.myReview.myReviewFormStatus,
  )
  // this is used to differentiate between employee and manager
  const appraisalFormStatus = useTypedSelector(
    (state) => state.myReview.appraisalForm.appraisalFormStatus,
  )

  const kpiNameClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const modalObject: MyReviewModalProps = {
      showModal: true,
      description: <KPIDescriptionModal kpi={kpi} />,
      confirmBtnAction: undefined,
      modalFooterClass: 'd-none',
      modalHeaderClass: 'd-none',
    }
    dispatch(reduxServices.myReview.actions.setModal(modalObject))
  }

  return (
    <CTableRow data-testid="myReview-kpiRow">
      <CTableDataCell>{kpiIndex + 1}</CTableDataCell>
      <CTableDataCell>
        <div
          className="text-info cursor-pointer"
          onClick={kpiNameClickHandler}
          data-testid={generateMyReviewTestId(`kpiName-${kpi.id}`)}
        >
          {kpi.name}
        </div>
      </CTableDataCell>
      {
        // initial entry for an employee. not submitted yet
        reviewFormStatus === MyReviewFormStatus.saveForEmployee && (
          <EmployeeInput kpi={kpi} kraId={kraId} />
        )
      }
      {
        // once the employee has submitted, he/she can only read the data, as well as the manager
        reviewFormStatus !== MyReviewFormStatus.saveForEmployee && (
          <ReviewReadonlyData
            commentsTestId={`${kpi.id}-empCommentsReadonly`}
            rating={kpi.employeeRating}
            comments={kpi.employeeFeedback}
          />
        )
      }
      {
        // once the manager has submitted their feedback, the employee can see the feedback
        canEmployeeViewAfterManagerSubmit(
          reviewFormStatus,
          appraisalFormStatus,
        ) && (
          <ReviewReadonlyData
            commentsTestId={`${kpi.id}-managerCommentsReadonly`}
            rating={
              kpi.managerCommentsDtos
                ? kpi.managerCommentsDtos[0]?.managerRating
                : null
            }
            comments={
              kpi.managerCommentsDtos
                ? kpi.managerCommentsDtos[0]?.managerComments
                : null
            }
          />
        )
      }
      {
        // this is displayed only to manager. manager has write access until it is closed
        appraisalFormStatus ===
          MyReviewAppraisalFormStatus.NotSubmittedByYou && (
          <ManagerInput kraId={kraId} kpi={kpi} />
        )
      }
    </CTableRow>
  )
}

export default ReviewFormKPITableRow
