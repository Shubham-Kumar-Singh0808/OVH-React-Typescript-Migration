import { Link, NavLink } from 'react-router-dom'

import { CNavItem } from '@coreui/react-pro'
import React from 'react'
import { selectLoggedInEmployeeData } from '../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import { useTypedSelector } from '../../stateStore'

const UserProfile = (): JSX.Element => {
  const employeeGeneralInformation = useTypedSelector(
    selectLoggedInEmployeeData,
  )

  return (
    <>
      <div className="user-profile-wrap">
        <CNavItem>
          <NavLink to="/profile">
            <img
              src={employeeGeneralInformation?.profilePicPath}
              alt={employeeGeneralInformation?.fullName}
              className="user-profile-img"
            />
          </NavLink>
        </CNavItem>
        <div className="user-profile-text">
          <h4>
            <span className="user-profile-name">
              {employeeGeneralInformation?.fullName}
            </span>
          </h4>
          <h5>
            <span className="user-profile-designation">
              {employeeGeneralInformation?.designation}
            </span>
          </h5>
        </div>
      </div>
    </>
  )
}

export default UserProfile
