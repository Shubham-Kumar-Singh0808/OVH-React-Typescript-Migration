import MyProfileTabs from './MyProfileTabs'
import OCard from '../../../components/ReusableComponent/OCard'
import ProfileDetails from './ProfileDetails'
import React from 'react'
import { loggedInEmployeeSelectors } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import { useTypedSelector } from '../../../stateStore'

const MyProfile = (): JSX.Element => {
  const employeeGeneralInformation = useTypedSelector(
    loggedInEmployeeSelectors.selectLoggedInEmployeeData,
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
