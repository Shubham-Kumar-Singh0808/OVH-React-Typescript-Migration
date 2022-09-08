import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const UpcomingTrainings = (): JSX.Element => {
  const upcomingTrainings = useTypedSelector(
    reduxServices.trainingsAndEvents.selectors.upcomingTrainingsAndEvents,
  )

  return (
    <>
      <div className="holidays-panel-body ps-0 pe-0">
        <ul className="holidays-list-group recent-comments mb0">
          {upcomingTrainings?.slice(0, 3).map((training, index) => {
            return (
              <li className="birthdays-list-group-item clearfix" key={index}>
                <p className="text-ellipsis">
                  <span className="strong">{training.agenda}</span>
                </p>
                <span className="pull-right"></span>
                <span>{training.locationName}</span>
                <span>{training.roomName}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default UpcomingTrainings
