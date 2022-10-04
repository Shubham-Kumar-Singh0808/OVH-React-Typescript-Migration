import React from 'react'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const UpcomingProbationaryEndDates = (): JSX.Element => {
  const employeesUnderProbation = useTypedSelector(
    reduxServices.employeeProbationPeriod.selectors
      .employeesUnderProbationPeriod,
  )

  const isLoading = useTypedSelector(
    reduxServices.employeeProbationPeriod.selectors.isLoading,
  )

  return (
    <>
      {isLoading !== ApiLoadingState.loading &&
      employeesUnderProbation?.length ? (
        <>
          <div className="holidays-panel-body ps-0 pe-0">
            <ul className="holidays-list-group recent-comments mb0">
              {employeesUnderProbation?.slice(0, 3).map((provision, index) => {
                return (
                  <li
                    className="birthdays-list-group-item clearfix"
                    key={index}
                  >
                    <p className="text-ellipsis">
                      <span className="strong">{provision.username}</span>
                    </p>
                    <span className="small pull-right">
                      {provision.provisionDate}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          {employeesUnderProbation?.length !== 0 && (
            <div className="panel-footer mbtrl0">
              <p className="text-right mb0">
                <a href="/probationaryList">
                  More {''}
                  <i className="fa fa-angle-double-right fa-lg"></i>
                </a>
              </p>
            </div>
          )}
        </>
      ) : (
        <strong className="ml14">No Records Found...</strong>
      )}
    </>
  )
}

export default UpcomingProbationaryEndDates
