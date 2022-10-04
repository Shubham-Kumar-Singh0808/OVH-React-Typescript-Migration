import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const EmployeeEarnedLeaves = (): JSX.Element => {
  const financialYear = useTypedSelector(
    reduxServices.earnedLeaves.selectors.financialYear,
  )

  const getLeaveSummary = useTypedSelector(
    reduxServices.employeeLeaveSummary.selectors.employeeLeaveSummary,
  )

  return (
    <>
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
          <p className="text-right mb0">
            <a className="text-white" href="/employeeLeaveSummary">
              More {''}
              <i className="fa fa-angle-double-right fa-lg"></i>
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default EmployeeEarnedLeaves
