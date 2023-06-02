import React, { useEffect, useState } from 'react'
import AssetTransactionalListFilter from './AssetTransactionalListFilter'
import AssetTransactionalListTable from './AssetTransactionalListTable'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const AssetTransactionalList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.ProductTypeList.getAllLookUpsApi())
  }, [dispatch])

  const [selectDate, setSelectDate] = useState<string>('Current Month')
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()
  const [searchInput, setSearchInput] = useState<string>()
  const [searchByEmployee, setSearchByEmployee] = useState<boolean>(false)
  const [isTableView, setIsTableView] = useState(false)

  const assetListSize = useTypedSelector(
    reduxServices.assetTransactionList.selectors.listSize,
  )

  const CurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    if (CurrentPage) {
      setCurrentPage(CurrentPage)
    }
  }, [CurrentPage])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(assetListSize, 20)

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Asset Transactional History"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <AssetTransactionalListFilter
          fromDate={fromDate as string}
          setFromDate={setFromDate}
          toDate={toDate as string}
          setToDate={setToDate}
          searchInput={searchInput as string}
          setSearchInput={setSearchInput}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          searchByEmployee={searchByEmployee}
          setSearchByEmployee={setSearchByEmployee}
          currentPage={currentPage}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          setIsTableView={setIsTableView}
        />
        <AssetTransactionalListTable
          paginationRange={paginationRange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          isTableView={isTableView}
        />
      </OCard>
    </>
  )
}

export default AssetTransactionalList
