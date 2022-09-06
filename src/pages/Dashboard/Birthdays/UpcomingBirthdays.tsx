import { CImage } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const UpcomingBirthdays = (): JSX.Element => {
  const upcomingEmployeeBirthdays = useTypedSelector(
    reduxServices.upcomingBirthdays.selectors.upcomingEmployeeBirthdays,
  )

  return (
    <>
      <div className="birthdays-panel-body ps-0 pe-0">
        <ul className="birthdays-list-group recent-comments mb0">
          {upcomingEmployeeBirthdays?.map((birthday, index) => {
            return (
              <li className="birthdays-list-group-item clearfix" key={index}>
                <div className="pull-left mr15">
                  <CImage
                    className="birthday-avatar"
                    src={birthday.imagePath}
                  />
                </div>
                <p className="text-ellipsis mb0">
                  <span className="strong">{birthday.name}</span>
                </p>
                <span className="small pull-right">{birthday.date}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default UpcomingBirthdays
