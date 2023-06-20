import { CTableDataCell } from '@coreui/react-pro'
import React from 'react'
import { useAppDispatch } from '../../../../../stateStore'
import { MyReviewModalProps } from '../../../../../types/Performance/MyReview/myReviewTypes'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

const ReviewReadonlyData = ({
  rating,
  comments,
  commentsTestId,
}: {
  rating: number | null
  comments: string | null
  commentsTestId: string
}): JSX.Element => {
  const dispatch = useAppDispatch()

  // in order to make it look good, comments are opened in the modal
  const commentsClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const modalObject: MyReviewModalProps = {
      showModal: true,
      description: comments ? comments : 'N/A',
      confirmBtnAction: undefined,
      modalFooterClass: 'd-none',
      modalHeaderClass: 'd-none',
    }
    dispatch(reduxServices.myReview.actions.setModal(modalObject))
  }

  return (
    <>
      <CTableDataCell>{rating}</CTableDataCell>
      <CTableDataCell>
        <div
          className="text-info cursor-pointer"
          onClick={commentsClickHandler}
          data-testid={generateMyReviewTestId(commentsTestId)}
        >
          {comments?.substring(0, 20)}...
        </div>
      </CTableDataCell>
    </>
  )
}

export default ReviewReadonlyData
