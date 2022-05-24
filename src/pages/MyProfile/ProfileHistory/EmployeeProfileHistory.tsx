import React, { useEffect } from 'react'
import {
  getProfileHistoryThunk,
  profileHistorySelectors,
} from '../../../reducers/MyProfile/ProfileHistory/profileHistorySlice'

import { CCardHeader } from '@coreui/react-pro'
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
  const employeeProfileHistoryIsLoading = useTypedSelector(
    profileHistorySelectors.profileHistoryIsLoading,
  )
  useEffect(() => {
    if (authenticatedToken) {
      const prfHist = dispatch(
        getProfileHistoryThunk.getProfileHistory(employeeId),
      )
    }
  }, [authenticatedToken, dispatch, employeeId])
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Employee Profile History</h4>
      </CCardHeader>
      {!employeeProfileHistoryIsLoading ? (
        <>
          <ProfileHistoryTimeLine />
        </>
      ) : (
        <>No Data</>
      )}
    </>
  )
}

export default EmployeeProfileHistory
