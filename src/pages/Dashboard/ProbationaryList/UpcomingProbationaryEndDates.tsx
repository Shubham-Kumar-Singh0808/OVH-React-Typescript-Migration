import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const UpcomingProbationaryEndDates = (): JSX.Element => {
  const employeesUnderProbation = useTypedSelector(
    reduxServices.employeeProbationPeriod.selectors
      .employeesUnderProbationPeriod,
  )

  return (
    <>
      <div className="holidays-panel-body ps-0 pe-0">
        <ul className="holidays-list-group recent-comments mb0">
          {employeesUnderProbation?.slice(0, 3).map((provision, index) => {
            return (
              <li className="birthdays-list-group-item clearfix" key={index}>
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
    </>
  )
}

export default UpcomingProbationaryEndDates
