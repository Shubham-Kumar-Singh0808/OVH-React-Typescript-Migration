import { CButton } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import {
  individualReviewListFeatureId,
  hierarchyReviewListFeatureId,
  reviewListFeatureId,
  showCloseBtnForManager,
} from '../../MyReviewHelpers'
import { MyReviewModalProps } from '../../../../../types/Performance/MyReview/myReviewTypes'
import CloseAppraisalFormModal from '../ReviewFormModals/CloseAppraisalFormModal'
import { reduxServices } from '../../../../../reducers/reduxServices'

// this component renders the buttons that are on top right for managers

const ManagerAppraisalTopButtons = () => {
  const dispatch = useAppDispatch()
  const individualReviewListFeatures = useTypedSelector((state) =>
    state.userAccessToFeatures.userAccessToFeatures.filter(
      (feature) => feature.featureId === individualReviewListFeatureId,
    ),
  )[0]
  const hierarchyReviewListFeatures = useTypedSelector((state) =>
    state.userAccessToFeatures.userAccessToFeatures.filter(
      (feature) => feature.featureId === hierarchyReviewListFeatureId,
    ),
  )[0]
  const reviewListFeatures = useTypedSelector((state) =>
    state.userAccessToFeatures.userAccessToFeatures.filter(
      (feature) => feature.featureId === reviewListFeatureId,
    ),
  )[0]
  const formStatus = useTypedSelector(
    (state) => state.myReview.myReviewFormStatus,
  )

  const closeButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const modalObject: MyReviewModalProps = {
      showModal: true,
      description: <CloseAppraisalFormModal />,
      modalHeaderClass: 'd-none',
      modalFooterClass: 'd-none',
    }
    dispatch(reduxServices.myReview.actions.setModal(modalObject))
  }

  return (
    <div className="d-flex flex-row justify-content-end align-items-center">
      {reviewListFeatures.viewaccess &&
        individualReviewListFeatures.viewaccess === false &&
        hierarchyReviewListFeatures.viewaccess === false && (
          <div>
            {showCloseBtnForManager(formStatus) && (
              <CButton
                className="btn-ovh"
                color="danger"
                onClick={closeButtonHandler}
              >
                Close
              </CButton>
            )}
          </div>
        )}
      <div className="ms-2">
        <Link to="/listofAppraisal">
          <CButton color="info" className="btn-ovh me-1">
            <i className="fa fa-arrow-left me-1"></i>
            Back
          </CButton>
        </Link>
      </div>
    </div>
  )
}

export default ManagerAppraisalTopButtons
