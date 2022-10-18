import React, { useEffect } from 'react'
import EmployeeList from './EmployeeList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const EmployeeListDirectory = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const isLoading = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.isLoading,
  )

  useEffect(() => {
    if (employeeId) {
      dispatch(
        reduxServices.userAccessToFeatures.getUserAccessToFeatures(employeeId),
      )
    }
  }, [dispatch, employeeId])

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Employee',
  )

  return (
    <>
      {isLoading === ApiLoadingState.succeeded ? (
        <EmployeeList
          viewaccess={userAccess?.viewaccess}
          createaccess={userAccess?.createaccess}
          updateaccess={userAccess?.updateaccess}
          deleteaccess={userAccess?.deleteaccess}
        />
      ) : (
        <>
          <OLoadingSpinner type={LoadingType.PAGE} />
        </>
      )}
    </>
  )
}

export default EmployeeListDirectory
