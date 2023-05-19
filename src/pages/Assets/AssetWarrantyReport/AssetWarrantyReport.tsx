import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AssetWarrantyReportTable from './AssetWarrantyReportTable'
import WarrantyDateStatus from './WarrantyDateStatus'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const AssetWarrantyReport = (): JSX.Element => {
  const [selectDate, setSelectDate] = useState<string>('Current Month')
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()

  const listSize = useTypedSelector(
    reduxServices.assetsWarrantyList.selectors.listSize,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  const data = useTypedSelector(
    reduxServices.assetsWarrantyList.selectors.assetsWarrantyList,
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.assetsWarrantyList.getAssetsWarrantyList({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        dateSelection: selectDate,
        from: (fromDate as string) || '',
        to: (toDate as string) || '',
      }),
    )
  }, [dispatch, currentPage, pageSize])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Warranty Asset Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <WarrantyDateStatus
          pageSize={0}
          currentPage={0}
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
        />
        <AssetWarrantyReportTable
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

export default AssetWarrantyReport
