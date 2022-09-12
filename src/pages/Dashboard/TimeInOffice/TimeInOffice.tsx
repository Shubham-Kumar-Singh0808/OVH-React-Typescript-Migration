import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const TimeInOffice = (): JSX.Element => {
  const weeklyTimeInOffice = useTypedSelector(
    reduxServices.weeklyTimeInOffice.selectors.timeInOffice,
  )
  return (
    <>
      <div className="panel-success panel-colorful text-center">
        <div className="pad-all media widget-inner">
          <h4>Time in Office</h4>
          <div className="media-left"></div>
        </div>
        <div className="media-body text-center d-flex justify-content-around">
          {weeklyTimeInOffice.length > 0 &&
            weeklyTimeInOffice?.map((timeInOffice, index) => {
              return (
                <div className="col-xs-2 ng-scope col-sm-offset-1" key={index}>
                  <h4>{timeInOffice.week.substring(0, 1)}</h4>
                  <h2>{timeInOffice.date.substring(0, 2)}</h2>
                  <h5>{timeInOffice.totalSpentHours.replace(' ', '')}</h5>
                </div>
              )
            })}
        </div>
        <div className="panel-footer">
          <p className="text-right mb0">
            <a className="text-white" href="/timeInOfficeReport">
              More
              <i className="fa fa-angle-double-right fa-lg"></i>
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default TimeInOffice
