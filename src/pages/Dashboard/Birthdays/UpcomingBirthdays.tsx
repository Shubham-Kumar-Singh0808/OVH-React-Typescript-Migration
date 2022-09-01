import { CImage } from '@coreui/react-pro'
import React from 'react'

const UpcomingBirthdays = (): JSX.Element => {
  return (
    <>
      <div className="birthdays-panel-body">
        <ul className="birthdays-list-group recent-comments mb0">
          <li className="birthdays-list-group-item">
            <div className="birthday-avatar pull-left mr15">
              <CImage src="https://picsum.photos/seed/picsum/200/300" />
            </div>
            <p className="text-ellipsis mb0">
              <span className="strong"></span>
            </p>
            <span className="small pull-right"></span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default UpcomingBirthdays
