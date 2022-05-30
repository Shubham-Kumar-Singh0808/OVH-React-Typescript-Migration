import { CCardHeader, CSpinner } from '@coreui/react-pro'
import React, { useEffect } from 'react'

import ProfileHistoryTimeLine from './ProfileHistoryTimeLine'
import { authenticationService } from '../../../reducers/Login/authenticationSlice'
import { profileHistoryService } from '../../../reducers/MyProfile/ProfileHistory/profileHistorySlice'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../stateStore'

const EmployeeProfileHistory = (): JSX.Element => {
  const employeeId = useTypedSelector(
    authenticationService.selectors.selectEmployeeId,
  )
  const authenticatedToken = useTypedSelector(
    authenticationService.selectors.selectToken,
  )

  const dispatch = useDispatch()
  const isLoading = useTypedSelector(
    profileHistoryService.selectors.profileHistoryIsLoading,
  )

  useEffect(() => {
    if (authenticatedToken) {
      dispatch(profileHistoryService.getProfileHistory(employeeId))
    }
  }, [authenticatedToken, dispatch, employeeId])
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Employee Profile History</h4>
      </CCardHeader>
      {/* <ProfileHistoryTimeLine /> */}
      {!isLoading ? (
        <>
          <ProfileHistoryTimeLine />
        </>
      ) : (
        <>
          <CSpinner />
        </>
      )}
    </>
  )
}

export default EmployeeProfileHistory
