import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import EmployeeListTable from './EmployeeListTable'
import ListOptions from './ListOptions'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { UserAccessToFeatures } from '../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'

const EmployeeList = ({ updateaccess }: UserAccessToFeatures): JSX.Element => {
  const dispatch = useAppDispatch()
  const listSize = useTypedSelector(
    reduxServices.employeeList.selectors.listSize,
  )
  const isLoading = useTypedSelector(
    reduxServices.employeeList.selectors.isLoading,
  )
  const selectedEmploymentStatus = useTypedSelector(
    reduxServices.employeeList.selectors.selectedEmploymentStatus,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Employee',
  )
  const userAccessTo = userAccessToFeatures?.find(
    (feature) => feature.name === 'Employee Directory-Options',
  )
  const searchString = useTypedSelector(
    reduxServices.searchEmployee.selectors.searchString,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.employeeList.getEmployees({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        selectionStatus: selectedEmploymentStatus,
        searchStr: searchString,
      }),
    )
  }, [currentPage, dispatch, pageSize, selectedEmploymentStatus, searchString])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Directory"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <ListOptions
              userCreateAccess={userAccess?.createaccess as boolean}
              userViewAccess={userAccessTo?.viewaccess as boolean}
            />
            <EmployeeListTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
              updateaccess={updateaccess}
              userEditAccess={userAccess?.updateaccess as boolean}
            />
          </>
        ) : (
          <CCol>
            <CRow className="category-loading-spinner">
              <CSpinner />
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}

export default EmployeeList
