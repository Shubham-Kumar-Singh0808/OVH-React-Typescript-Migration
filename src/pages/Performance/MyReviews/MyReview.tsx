import React, { useState } from 'react'
import { CButton } from '@coreui/react-pro'
import MyReviewTabs from './MyReviewTabs'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const MyReview = (): JSX.Element => {
  const appraisalForm = useTypedSelector(
    reduxServices.myReview.selectors.appraisalForm,
  )
  const [isRequestDiscussion, setIsRequestDiscussion] = useState(false)
  const handleRequestDiscussionClick = () => {
    // Perform save logic here
    setIsRequestDiscussion(true)
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="My Review"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {appraisalForm.formStatus === 'PENDINGAGREEMENT' ||
        appraisalForm.formStatus === 'OPENFORDISCUSSION' ? (
          <div className="d-inline ml15 pull-right">
            <CButton type="submit" className="btn btn-success">
              Acknowledge
            </CButton>
            &nbsp; &nbsp; &nbsp;
            {!isRequestDiscussion && (
              <CButton
                type="submit"
                className="btn btn-warning"
                onClick={handleRequestDiscussionClick}
              >
                Request Discussion
              </CButton>
            )}
          </div>
        ) : (
          ''
        )}
        {appraisalForm?.formStatus === 'COMPLETED' ? (
          <>
            <div className="form-group">
              <label className="pull-left text-primary">
                <b className="ng-binding">{appraisalForm.employee?.fullName}</b>
                Rating:
              </label>
              <div className="col-sm-2">
                <label className="ng-binding">
                  <span className="ng-binding">
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
                  <span className="ng-binding">
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
