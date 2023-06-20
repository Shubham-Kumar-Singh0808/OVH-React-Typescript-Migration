import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CButton } from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import MyReviewTabs from '../MyReviewTabs'
import OCard from '../../../../components/ReusableComponent/OCard'
import EmployeeManagerRating from '../EmployeeManagerRating'
import {
  hierarchyReviewListFeatureId,
  individualReviewListFeatureId,
  reviewListFeatureId,
  showCloseBtnForManager,
} from '../MyReviewHelpers'

const ManagerAppraisal = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { employeeId } = useParams<{ employeeId: string }>()
  const isMyReviewError = useTypedSelector((state) => state.myReview.error)
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

  const getAppraisalLatestData = async () => {
    const appraisalResult = await dispatch(
      reduxServices.myReview.getAppraisalFormThunk(+employeeId),
    )
    if (
      reduxServices.myReview.getAppraisalFormThunk.fulfilled.match(
        appraisalResult,
      )
    ) {
      // validating and getting the correct data from the api
      dispatch(
        reduxServices.myReview.getExistingAppraisalFormThunk(
          appraisalResult.payload.id,
        ),
      )
    }
  }

  useEffect(() => {
    getAppraisalLatestData()
    dispatch(reduxServices.myReview.getPerformanceRatingsThunk())
  }, [])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Appraisal Form"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {isMyReviewError === null ? (
        <>
          <div className="d-flex flex-row justify-content-end align-items-center">
            {reviewListFeatures.viewaccess &&
              individualReviewListFeatures.viewaccess === false &&
              hierarchyReviewListFeatures.viewaccess === false && (
                <div>
                  {showCloseBtnForManager(formStatus) && (
                    <CButton className="btn-ovh" color="danger">
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
          <EmployeeManagerRating />
          <MyReviewTabs />
        </>
      ) : (
        <p>Loading</p>
      )}
    </OCard>
  )
}

export default ManagerAppraisal
