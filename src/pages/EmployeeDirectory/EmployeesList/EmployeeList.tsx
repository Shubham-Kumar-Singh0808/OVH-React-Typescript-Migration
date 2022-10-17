import React, { useEffect } from 'react'
import EmployeeListTable from './EmployeeListTable'
import ListOptions from './ListOptions'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { UserAccessToFeatures } from '../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'

const EmployeeList = ({ updateaccess }: UserAccessToFeatures): JSX.Element => {
  const dispatch = useAppDispatch()
  const listSize = useTypedSelector(
    reduxServices.employeeList.selectors.listSize,
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
      }),
    )
  }, [currentPage, dispatch, pageSize, selectedEmploymentStatus])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Directory"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <>
          <ListOptions userCreateAccess={userAccess?.createaccess as boolean} />
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
      </OCard>
    </>
  )
}

export default EmployeeList
