import { CCardHeader } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ProfileHistoryTimeLine from './ProfileHistoryTimeLine'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { profileHistoryService } from '../../../reducers/MyProfile/ProfileHistory/profileHistorySlice'
import { reduxServices } from '../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import { useTypedSelector } from '../../../stateStore'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const EmployeeProfileHistory = (): JSX.Element => {
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()
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
    reduxServices.profileHistory.selectors.isLoading,
  )

  useEffect(() => {
    if (authenticatedToken) {
      dispatch(
        reduxServices.profileHistory.getProfileHistory(
          isViewingAnotherEmployee ? selectedEmployeeId : employeeId,
        ),
      )
    }
  }, [
    authenticatedToken,
    dispatch,
    employeeId,
    isViewingAnotherEmployee,
    selectedEmployeeId,
  ])
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Employee Profile History</h4>
      </CCardHeader>

      {isLoading !== ApiLoadingState.loading ? (
        <>
          <ProfileHistoryTimeLine
            employeeProfileHistory={employeeProfileHistory}
          />
        </>
      ) : (
        <>
          <OLoadingSpinner type={LoadingType.PAGE} />
        </>
      )}
    </>
  )
}

export default EmployeeProfileHistory
