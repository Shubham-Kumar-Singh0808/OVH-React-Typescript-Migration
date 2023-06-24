import React from 'react'
import { CTableHeaderCell } from '@coreui/react-pro'
import { useTypedSelector } from '../../../../../stateStore'
import { MyReviewAppraisalFormStatus } from '../../../../../types/Performance/MyReview/myReviewTypes'
import { canEmployeeViewAfterManagerSubmit } from '../../MyReviewHelpers'

/* This component is used to render the correct manager rating and comment columns
  based on the formStatus and appraisalFormStatus
*/

const ManagerColumns = (): JSX.Element => {
  const myReviewFormStatus = useTypedSelector(
    (state) => state.myReview.myReviewFormStatus,
  )
  // used to differentiate between employee and manager
  const appraisalFormStatusEmpManager = useTypedSelector(
    (state) => state.myReview.appraisalForm.appraisalFormStatus,
  )

  return (
    <>
      {
        // this is for employee only
        canEmployeeViewAfterManagerSubmit(
          myReviewFormStatus,
          appraisalFormStatusEmpManager,
        ) && (
          <>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Manager Rating
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Manager Comments
            </CTableHeaderCell>
          </>
        )
      }

      {
        // this is for manager only
        appraisalFormStatusEmpManager ===
          MyReviewAppraisalFormStatus.NotSubmittedByYou && (
          <>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Manager Rating
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Manager Comments
            </CTableHeaderCell>
          </>
        )
      }
    </>
  )
}

export default ManagerColumns
