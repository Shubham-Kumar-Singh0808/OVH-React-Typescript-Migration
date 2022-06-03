import { CCardHeader, CSpinner } from '@coreui/react-pro'
import React, { useEffect } from 'react'

import ProfileHistoryTimeLine from './ProfileHistoryTimeLine'
import { profileHistoryService } from '../../../reducers/MyProfile/ProfileHistory/profileHistorySlice'
import { reduxServices } from '../../../reducers/reduxServices'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../stateStore'

const EmployeeProfileHistory = (): JSX.Element => {
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const authenticatedToken = useTypedSelector(
    reduxServices.authentication.selectors.selectToken,
  )
  const employeeProfileHistory = useTypedSelector(
    profileHistoryService.selectors.profileHistoryData,
  )
  const dispatch = useDispatch()
  const isLoading = useTypedSelector(
    reduxServices.profileHistory.selectors.profileHistoryIsLoading,
  )

  useEffect(() => {
    if (authenticatedToken) {
      dispatch(reduxServices.profileHistory.getProfileHistory(employeeId))
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
          <ProfileHistoryTimeLine
            employeeProfileHistory={employeeProfileHistory}
          />
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
