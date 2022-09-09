import React, { useEffect } from 'react'
import BirthdaysListTable from './BirthdaysListTable'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OCard from '../../../components/ReusableComponent/OCard'

const ListOfBirthdays = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const employeesBirthdayListSize = useTypedSelector(
    reduxServices.birthdaysList.selectors.listSize,
  )
  const isBirthdayListLoading = useTypedSelector(
    reduxServices.birthdaysList.selectors.isLoading,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(employeesBirthdayListSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.birthdaysList.getAllEmployeesBirthdayList({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }, [currentPage, dispatch, pageSize])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="List of Birthdays"
        CFooterClassName="d-none"
      >
        {isBirthdayListLoading !== ApiLoadingState.loading ? (
          <>
            <BirthdaysListTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </>
        ) : (
          <></>
        )}
      </OCard>
    </>
  )
}

export default ListOfBirthdays
