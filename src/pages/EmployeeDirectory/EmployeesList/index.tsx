import React, { useEffect } from 'react'
import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import EmployeeList from './EmployeeList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'

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
        <CCol>
          <CRow className="category-loading-spinner">
            <CSpinner />
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default EmployeeListDirectory
