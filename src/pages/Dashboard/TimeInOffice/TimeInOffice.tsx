import React from 'react'

const TimeInOffice = (): JSX.Element => {
  return (
    <>
      <div className="panel panel-success panel-colorful text-center">
        <div className="pad-all media widget-inner">
          <h4>Time in Office</h4>
          <div className="media-left"></div>
        </div>
        <div className="media-body text-center">
          <div className="col-xs-2 ng-scope col-sm-offset-1">
            <h4>F</h4>
            <h2>24</h2>
            <h5>08:00</h5>
          </div>
        </div>
        <div className="panel-footer">
          <p className="mb0">
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
