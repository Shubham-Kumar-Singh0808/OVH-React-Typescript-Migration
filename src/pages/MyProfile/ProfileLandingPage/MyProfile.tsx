import React, { useEffect } from 'react'
import {
  getEmployeeGeneralInformation,
  selectLoggedInData,
} from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import MyProfileTabs from './MyProfileTabs'
import OCard from '../../../components/ReusableComponent/OCard'
import ProfileDetails from './ProfileDetails'
import { selectEmployeeId } from '../../../reducers/Login/authenticationSlice'

const MyProfile = (): JSX.Element => {
  const employeeId = useTypedSelector(selectEmployeeId)
  const employeeGeneralInformation = useTypedSelector(selectLoggedInData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getEmployeeGeneralInformation(employeeId as string))
  }, [dispatch, employeeId])
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
