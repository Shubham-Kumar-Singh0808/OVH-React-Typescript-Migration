import React, { useEffect } from 'react'

import { CCardHeader } from '@coreui/react-pro'
import ProfileHistoryTimeLine from './ProfileHistoryTimeLine'
import { authenticationSelectors } from '../../../reducers/Login/authenticationSlice'
import { getProfileHistoryThunk } from '../../../reducers/MyProfile/ProfileHistory/profileHistorySlice'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../stateStore'

const EmployeeProfileHistory = (): JSX.Element => {
  const employeeId = useTypedSelector(authenticationSelectors.selectEmployeeId)
  const authenticatedToken = useTypedSelector(
    authenticationSelectors.selectToken,
  )
  const dispatch = useDispatch()
  useEffect(() => {
    if (authenticatedToken) {
      dispatch(getProfileHistoryThunk.getProfileHistory(employeeId))
    }
  }, [authenticatedToken, dispatch, employeeId])
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Employee Profile History</h4>
      </CCardHeader>
      <ProfileHistoryTimeLine />
    </>
  )
}

export default EmployeeProfileHistory
