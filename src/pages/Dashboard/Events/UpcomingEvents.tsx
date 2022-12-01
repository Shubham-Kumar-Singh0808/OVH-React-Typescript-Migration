import React from 'react'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const UpcomingEvents = (): JSX.Element => {
  const upcomingEvents = useTypedSelector(
    reduxServices.trainingsAndEvents.selectors.upcomingEvent,
  )

  const isLoading = useTypedSelector(
    reduxServices.trainingsAndEvents.selectors.isLoading,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccessToEventList = userAccessToFeatures?.find(
    (feature) => feature.name === 'Event List',
  )

  return (
    <>
      {isLoading !== ApiLoadingState.loading && upcomingEvents?.length ? (
        <>
          <div className="holidays-panel-body ps-0 pe-0">
            <ul className="holidays-list-group recent-comments mb0">
              {upcomingEvents?.slice(0, 3).map((event, index) => {
                return (
                  <li
                    className="birthdays-list-group-item clearfix"
                    key={index}
                  >
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
          {upcomingEvents?.length !== 0 && (
            <div className="panel-footer mbtrl0">
              {userAccessToEventList?.viewaccess && (
                <p className="text-right mb0">
                  <a href="/eventList">
                    More {''}
                    <i className="fa fa-angle-double-right fa-lg"></i>
                  </a>
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <strong className="ml14">No Records Found...</strong>
      )}
    </>
  )
}

export default UpcomingEvents
