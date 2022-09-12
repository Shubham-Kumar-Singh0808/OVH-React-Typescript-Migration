import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const UpcomingHolidays = (): JSX.Element => {
  const upcomingHolidays = useTypedSelector(
    reduxServices.holidays.selectors.upcomingHolidays,
  )

  return (
    <>
      <div className="holidays-panel-body ps-0 pe-0">
        <ul className="holidays-list-group recent-comments mb0">
          {upcomingHolidays?.slice(0, 3).map((holiday, index) => {
            return (
              <li className="birthdays-list-group-item clearfix" key={index}>
                <p className="text-ellipsis">
                  <span className="strong">{holiday.name}</span>
                </p>
                <span className="small pull-right">{holiday.date}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default UpcomingHolidays
