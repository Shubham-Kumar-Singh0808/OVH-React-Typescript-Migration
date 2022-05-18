import { Link } from 'react-router-dom'
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
        <Link to="/profile">
          <img
            src={employeeGeneralInformation?.profilePicPath}
            alt={employeeGeneralInformation?.fullName}
            className="user-profile-img"
          />
        </Link>
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
