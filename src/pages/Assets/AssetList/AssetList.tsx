import React, { useEffect, useState } from 'react'
import AssetListTable from './AssetListTable'
import AssetListFilters from './AssetListFilters'
import ChangeAssetStatus from './ChangeAssetStatus/ChangeAssetStatus'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { AllAssetsList } from '../../../types/Assets/AssetList/AssetListTypes'

const AssetList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.ProductTypeList.getAllLookUpsApi())
  }, [dispatch])

  const [selectDate, setSelectDate] = useState<string>('')
  const [fromDate, setFromDate] = useState<string>()
  const [toggle, setToggle] = useState('')
  const [toDate, setToDate] = useState<string>()
  const [searchInput, setSearchInput] = useState<string>()
  const [searchByEmployee, setSearchByEmployee] = useState<boolean>(false)

  const changeReportStatusTypes = {} as AllAssetsList

  const [changeReportStatus, setChangeReportStatus] = useState(
    changeReportStatusTypes,
  )

  const listSize = useTypedSelector(reduxServices.assetList.selectors.listSize)

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
  } = usePagination(listSize, 20)

  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Asset List"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <AssetListFilters
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
            />
            <AssetListTable
              paginationRange={paginationRange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              setToggle={setToggle}
              setChangeReportStatus={setChangeReportStatus}
            />
          </OCard>
        </>
      )}
      {toggle === 'changeAsset' && (
        <ChangeAssetStatus
          setToggle={setToggle}
          changeReportStatus={changeReportStatus}
          setChangeReportStatus={setChangeReportStatus}
        />
      )}
    </>
  )
}

export default AssetList
