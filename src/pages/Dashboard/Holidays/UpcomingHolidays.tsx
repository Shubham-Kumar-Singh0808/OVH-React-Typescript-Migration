import React from 'react'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const UpcomingHolidays = (): JSX.Element => {
  const upcomingHolidays = useTypedSelector(
    reduxServices.holidays.selectors.upcomingHolidays,
  )

  const isLoading = useTypedSelector(reduxServices.holidays.selectors.isLoading)

  return (
    <>
      {isLoading !== ApiLoadingState.loading && upcomingHolidays?.length ? (
        <>
          <div className="holidays-panel-body ps-0 pe-0">
            <ul className="holidays-list-group recent-comments mb0">
              {upcomingHolidays?.slice(0, 3).map((holiday, index) => {
                return (
                  <li
                    className="birthdays-list-group-item clearfix"
                    key={index}
                  >
                    <p className="text-ellipsis">
                      <span className="strong">{holiday.name}</span>
                    </p>
                    <span className="small pull-right">{holiday.date}</span>
                  </li>
                )
              })}
            </ul>
          </div>
          {upcomingHolidays?.length !== 0 && (
            <div className="panel-footer mbtrl0">
              <p className="text-right mb0">
                <a href="/holidaylist">
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

export default UpcomingHolidays
