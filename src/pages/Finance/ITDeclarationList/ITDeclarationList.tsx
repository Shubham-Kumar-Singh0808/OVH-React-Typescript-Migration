import React, { useEffect } from 'react'
import FilterOptions from './FilterOptions'
import ITDeclarationListTable from './ITDeclarationListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const ITDeclarationList = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const isLoading = useTypedSelector(
    reduxServices.itDeclarationList.selectors.isLoading,
  )
  const listSize = useTypedSelector(
    reduxServices.itDeclarationList.selectors.listSize,
  )

  const searchEmployee = useTypedSelector(
    reduxServices.itDeclarationList.selectors.searchEmployee,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(reduxServices.itDeclarationList.getCycles())
  }, [dispatch])

  useEffect(() => {
    dispatch(
      reduxServices.itDeclarationList.getITDeclarationForm({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        cycleId: 2,
        searchEmployee,
      }),
    )
  }, [currentPage, dispatch, pageSize, searchEmployee])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="IT Declaration List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <FilterOptions />
        <ITDeclarationListTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </OCard>
    </>
  )
}

export default ITDeclarationList
