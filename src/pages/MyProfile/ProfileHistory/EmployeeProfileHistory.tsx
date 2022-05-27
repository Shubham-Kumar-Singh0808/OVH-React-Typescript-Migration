import { CCardHeader, CSpinner } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import {
  profileHistorySelectors,
  profileHistoryThunk,
} from '../../../reducers/MyProfile/ProfileHistory/profileHistorySlice'

import ProfileHistoryTimeLine from './ProfileHistoryTimeLine'
import { authenticationSelectors } from '../../../reducers/Login/authenticationSlice'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../stateStore'

const EmployeeProfileHistory = (): JSX.Element => {
  const employeeId = useTypedSelector(authenticationSelectors.selectEmployeeId)
  const authenticatedToken = useTypedSelector(
    authenticationSelectors.selectToken,
  )

  const dispatch = useDispatch()
  const isLoading = useTypedSelector(
    profileHistorySelectors.profileHistoryIsLoading,
  )

  useEffect(() => {
    if (authenticatedToken) {
      dispatch(profileHistoryThunk.getProfileHistory(employeeId))
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
