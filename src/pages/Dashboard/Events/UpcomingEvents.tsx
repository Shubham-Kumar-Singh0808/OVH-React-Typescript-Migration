import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const UpcomingEvents = (): JSX.Element => {
  const upcomingEvents = useTypedSelector(
    reduxServices.trainingsAndEvents.selectors.upcomingEvent,
  )

  return (
    <>
      <div className="holidays-panel-body ps-0 pe-0">
        <ul className="holidays-list-group recent-comments mb0">
          {upcomingEvents?.slice(0, 3).map((event, index) => {
            return (
              <li className="birthdays-list-group-item clearfix" key={index}>
                <p className="text-ellipsis">
                  <span className="strong">{event.agenda}</span>
                </p>
                <span className="pull-right"></span>
                <span>{event.locationName}</span>
                <span>{event.roomName}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default UpcomingEvents
