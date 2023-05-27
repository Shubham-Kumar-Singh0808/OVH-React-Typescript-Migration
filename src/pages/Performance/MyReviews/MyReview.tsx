import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react-pro'
import MyReviewTabs from './MyReviewTabs'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const MyReview = (): JSX.Element => {
  const appraisalForm = useTypedSelector(
    reduxServices.myReview.selectors.appraisalForm,
  )
  const [isRequestDiscussion, setIsRequestDiscussion] = useState(false)
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const appraisalFormId = useTypedSelector(
    reduxServices.myReview.selectors.appraisalFormId,
  )
  const dispatch = useAppDispatch()
  const handleRequestDiscussionClick = () => {
    // Perform save logic here
    setIsRequestDiscussion(true)
    dispatch(reduxServices.myReview.getReviewComments(appraisalFormId))
  }
  useEffect(() => {
    dispatch(reduxServices.myReview.getEmployeeReviewForm(Number(employeeId)))
  }, [dispatch])
  console.log(appraisalForm.kra?.length)
  const errorMessage = useTypedSelector(
    reduxServices.myReview.selectors.errorMessage,
  )
  const result =
    appraisalForm?.overallAvgRating === 'NaN'
      ? 'N/A'
      : appraisalForm?.overallAvgRating

  const reviewComments = useTypedSelector(
    reduxServices.myReview.selectors.reviewComments,
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="My Review"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {errorMessage === 406 ? (
          <p className="status_label col-sm-12">
            <strong ng-bind="errorMessage" className="text-danger">
              <b> You are in probationary period.So you don`t have access.</b>
            </strong>
          </p>
        ) : (
          <>
            {appraisalForm.formStatus === 'PENDINGAGREEMENT' ||
            appraisalForm.formStatus === 'OPENFORDISCUSSION' ||
            (appraisalForm.formStatus !== 'COMPLETED' &&
              appraisalForm.formStatus !== 'SUBMIT' &&
              appraisalForm.formStatus !== 'SAVE') ? (
              <div className="d-inline ml15 pull-right">
                <CButton type="submit" className="btn btn-success">
                  Acknowledge
                </CButton>
                &nbsp; &nbsp; &nbsp;
                {/* {appraisalForm?.formStatus === 'PENDINGAGREEMENT' ||
                  (!isRequestDiscussion && (
                    <CButton
                      type="submit"
                      className="btn btn-warning"
                      onClick={handleRequestDiscussionClick}
                    >
                      Request Discussion
                    </CButton>
                  ))} */}
                {appraisalForm.formStatus === 'COMPLETED' ||
                !isRequestDiscussion ||
                reviewComments.length === 0 ? (
                  ''
                ) : (
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
            {appraisalForm?.formStatus === 'COMPLETED' ||
            appraisalForm?.formStatus === 'SUBMIT' ||
            appraisalForm?.formStatus === 'PENDINGAGREEMENT' ? (
              <>
                <div className="form-group">
                  <label className="pull-left text-primary">
                    <b className="ng-binding">
                      {appraisalForm.employee?.fullName}
                    </b>
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
                      <span className="ng-binding">{result}</span>
                    </label>
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
            <MyReviewTabs />
          </>
        )}
      </OCard>
      :
    </>
  )
}

export default MyReview
