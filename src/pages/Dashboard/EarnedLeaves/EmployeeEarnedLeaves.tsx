import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const EmployeeEarnedLeaves = (): JSX.Element => {
  const financialYear = useTypedSelector(
    reduxServices.earnedLeaves.selectors.financialYear,
  )

  const getLeaveSummary = useTypedSelector(
    reduxServices.earnedLeaves.selectors.employeeLeaveSummary,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToEarnedLeaves = userAccessToFeatures?.find(
    (feature) => feature.name === 'Dashboard-Earned Leaves',
  )
  const userAccessToLeaveSummary = userAccessToFeatures?.find(
    (feature) => feature.name === 'Leave Summary',
  )

  return (
    <>
      {userAccessToEarnedLeaves?.viewaccess && (
        <div className="leaves-panel panel-danger panel-colorful text-center">
          <div className="pad-all leaves-media widget-inner">
            <h4>Earned Leaves</h4>
            <div className="leaves-media-left"></div>
            <div className="leaves-media-body">
              <h4>{financialYear}</h4>
              <h2>
                <>
                  {getLeaveSummary?.allTakenLeaves} /{' '}
                  {getLeaveSummary?.allAvailableLeaves}
                </>
              </h2>
              <h5>Approved / Remaining</h5>
            </div>
          </div>
          <div className="panel-footer">
            {userAccessToLeaveSummary?.viewaccess && (
              <p className="text-right mb0">
                <a className="text-white" href="/employeeLeaveSummary">
                  More {''}
                  <i className="fa fa-angle-double-right fa-lg"></i>
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default EmployeeEarnedLeaves
