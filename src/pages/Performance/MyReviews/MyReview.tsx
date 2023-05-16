import React from 'react'
import MyReviewTabs from './MyReviewTabs'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const MyReview = (): JSX.Element => {
  const appraisalForm = useTypedSelector(
    reduxServices.myReview.selectors.appraisalForm,
  )
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="My Review"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {appraisalForm?.adjustedAvgRating === undefined ||
        appraisalForm?.adjustedAvgRating === null ? (
          <>
            <div className="form-group">
              <label className="pull-left text-primary">
                <b className="ng-binding">{appraisalForm.employee?.fullName}</b>
                Rating:
              </label>

              <div className="col-sm-2">
                <label className="ng-binding">
                  <span
                    ng-show="avgRating.adjustedAvgRating == undefined || avgRating.adjustedAvgRating == null"
                    className="ng-binding"
                  >
                    {appraisalForm?.empAvgRating}
                  </span>
                </label>
              </div>

              <label className="pull-left text-primary">
                <b className="ng-binding">
                  {appraisalForm.employee?.empManager}
                </b>
                Rating:
              </label>

              <div className="col-sm-2">
                <label className="ng-binding">
                  <span
                    ng-show="avgRating.adjustedAvgRating == undefined || avgRating.adjustedAvgRating == null"
                    className="ng-binding"
                  >
                    {appraisalForm?.overallAvgRating}
                  </span>
                </label>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        <MyReviewTabs />
      </OCard>
    </>
  )
}

export default MyReview
