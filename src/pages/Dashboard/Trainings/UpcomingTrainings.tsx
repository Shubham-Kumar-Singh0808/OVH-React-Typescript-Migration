import React from 'react'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const UpcomingTrainings = (): JSX.Element => {
  const upcomingTrainings = useTypedSelector(
    reduxServices.trainingsAndEvents.selectors.upcomingTraining,
  )

  const isTrainingLoading = useTypedSelector(
    reduxServices.trainingsAndEvents.selectors.isLoading,
  )

  return (
    <>
      {isTrainingLoading !== ApiLoadingState.loading &&
      upcomingTrainings?.length ? (
        <>
          <div className="holidays-panel-body ps-0 pe-0">
            <ul className="holidays-list-group recent-comments mb0">
              {upcomingTrainings?.slice(0, 3).map((training, index) => {
                return (
                  <li
                    className="birthdays-list-group-item clearfix"
                    key={index}
                  >
                    <p className="text-ellipsis mb0">
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
          {upcomingTrainings?.length !== 0 && (
            <div className="panel-footer mbtrl0">
              <p className="text-right mb0">
                <a href="/eventList">
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

export default UpcomingTrainings
