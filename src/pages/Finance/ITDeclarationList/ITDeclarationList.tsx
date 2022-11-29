import React, { useEffect, useState } from 'react'
import FilterOptions from './FilterOptions'
import ITDeclarationListTable from './ITDeclarationListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { Cycle } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const ITDeclarationList = (): JSX.Element => {
  const [investmentCycle, setInvestmentCycle] = useState<string>()
  const [searchInput, setSearchInput] = useState<string>('')
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
        investmentCycle,
        employeeName: searchEmployee,
      }),
    )
  }, [currentPage, dispatch, pageSize, searchEmployee, investmentCycle])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="IT Declaration List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <FilterOptions
          investmentCycle={investmentCycle}
          setInvestmentCycle={setInvestmentCycle}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        {isLoading !== ApiLoadingState.loading ? (
          <ITDeclarationListTable
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        ) : (
          <>
            <OLoadingSpinner type={LoadingType.PAGE} />
          </>
        )}
      </OCard>
    </>
  )
}

export default ITDeclarationList
