import MyProfileTabs from './MyProfileTabs'
import OCard from '../../../components/ReusableComponent/OCard'
import React from 'react'
const MyProfile = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Profile Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <MyProfileTabs />
      </OCard>
    </>
  )
}

export default MyProfile
