import React, { useEffect } from 'react'
import {
  getEmployeeGeneralInformation,
  selectLoggedInEmployeeData,
} from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import MyProfileTabs from './MyProfileTabs'
import OCard from '../../../components/ReusableComponent/OCard'
import ProfileDetails from './ProfileDetails'
import { selectEmployeeId } from '../../../reducers/Login/authenticationSlice'

const MyProfile = (): JSX.Element => {
  const employeeGeneralInformation = useTypedSelector(
    selectLoggedInEmployeeData,
  )
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Profile Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ProfileDetails
          employeeGeneralInformation={employeeGeneralInformation}
        />
        <MyProfileTabs />
      </OCard>
    </>
  )
}

export default MyProfile
