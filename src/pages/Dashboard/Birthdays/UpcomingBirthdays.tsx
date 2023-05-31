import { CImage } from '@coreui/react-pro'
import React from 'react'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { base64Extension } from '../../Achievements/AchievementConstants'

const UpcomingBirthdays = (): JSX.Element => {
  const upcomingEmployeeBirthdays = useTypedSelector(
    reduxServices.upcomingBirthdays.selectors.upcomingEmployeeBirthdays,
  )

  const isLoading = useTypedSelector(
    reduxServices.upcomingBirthdays.selectors.isLoading,
  )

  return (
    <>
      {isLoading !== ApiLoadingState.loading &&
      upcomingEmployeeBirthdays?.length ? (
        <>
          <div className="birthdays-panel-body ps-0 pe-0">
            <ul className="birthdays-list-group recent-comments mb0">
              {upcomingEmployeeBirthdays?.map((birthday, index) => {
                return (
                  <li
                    className="birthdays-list-group-item clearfix"
                    key={index}
                  >
                    <div className="pull-left mr15">
                      <CImage
                        className="birthday-avatar"
                        src={`${base64Extension}${birthday.imagePath}`}
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
          {upcomingEmployeeBirthdays?.length !== 0 && (
            <div className="panel-footer mbtrl0">
              <p className="text-right mb0">
                <a href="/birthdaylist">
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

export default UpcomingBirthdays
