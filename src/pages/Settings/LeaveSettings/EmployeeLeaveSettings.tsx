import React, { useState } from 'react'
import EmployeeLeaveCalender from './EmployeeLeaveCalender'
import EmployeeLeaveCategories from './EmployeeLeaveCategories'
import AddEditLeaveCategories from './AddLeaveCategories'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { UserAccessToFeatures } from '../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'

const EmployeeLeaveSettings = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Leave Categories',
  )

  const userAccessCalender = userAccessToFeatures?.find(
    (feature) => feature.name === 'Leave Settings',
  )
  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Leave Settings"
            CFooterClassName="d-none"
          >
            <EmployeeLeaveCalender
              userAccess={userAccessCalender as UserAccessToFeatures}
            />
            <EmployeeLeaveCategories
              setToggle={setToggle}
              userAccess={userAccess as UserAccessToFeatures}
            />
          </OCard>
        </>
      )}
      {toggle === 'addLeaveCategory' && (
        <AddEditLeaveCategories
          backButtonHandler={() => setToggle('')}
          confirmButtonText="Add"
        />
      )}
    </>
  )
}
export default EmployeeLeaveSettings
