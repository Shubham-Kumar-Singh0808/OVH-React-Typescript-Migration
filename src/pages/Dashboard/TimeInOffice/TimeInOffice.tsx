import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const TimeInOffice = (): JSX.Element => {
  const weeklyTimeInOffice = useTypedSelector(
    reduxServices.weeklyTimeInOffice.selectors.timeInOffice,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToEarnedLeaves = userAccessToFeatures?.find(
    (feature) => feature.name === 'Dashboard-Time In Office',
  )

  const userAccessToTimeInOfficeReport = userAccessToFeatures?.find(
    (feature) => feature.name === 'Time in Office Report',
  )

  return (
    <>
      {userAccessToEarnedLeaves?.viewaccess && (
        <div className="panel-success panel-colorful text-center">
          <div className="pad-all media widget-inner">
            <h4>Time in Office</h4>
            <div className="media-left"></div>
          </div>
          <div className="media-body text-center d-flex justify-content-around">
            {weeklyTimeInOffice.length > 0 &&
              weeklyTimeInOffice?.map((timeInOffice, index) => {
                return (
                  <div
                    className="col-xs-2 ng-scope col-sm-offset-1"
                    key={index}
                  >
                    <h4>{timeInOffice.week.substring(0, 1)}</h4>
                    <h2>{timeInOffice.date.substring(0, 2)}</h2>
                    <h5>{timeInOffice.totalSpentHours.replace(' ', '')}</h5>
                  </div>
                )
              })}
          </div>
          <div className="panel-footer">
            {userAccessToTimeInOfficeReport?.viewaccess && (
              <p className="text-right mb0">
                <a className="text-white" href="/timeInOfficeReport">
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

export default TimeInOffice
