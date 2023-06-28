import React, { useEffect, useState } from 'react'
import AssetTransactionalListFilter from './AssetTransactionalListFilter'
import AssetTransactionalListTable from './AssetTransactionalListTable'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { AssetTransactionalList } from '../../../types/Assets/AssetTransactionalList/AssetTransactionalListTypes'
import AssetTransactionHistory from '../AssetTransactionHistory/AssetTransactionHistory'
// import { AssetTransactionalList } from '../../../types/Assets/AssetTransactionalList/AssetTransactionalListTypes'

const AssetTransactionalList = (): JSX.Element => {
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(reduxServices.ProductTypeList.getAllLookUpsApi())
  // }, [dispatch])

  const [selectDatePicker, setselectDatePicker] =
    useState<string>('Current Month')
  const [fromDatePicker, setFromDatePicker] = useState<string>()
  const [toDatePicker, setToDatePicker] = useState<string>()
  const [searchInputField, setSearchInputField] = useState<string>()
  const [searchByEmployeeName, setSearchByEmployeeName] =
    useState<boolean>(false)
  const [isAssetTableView, setIsAssetTableView] = useState(false)
  const [toggle, setToggle] = useState<string>('')
  const initialCycle = {} as AssetTransactionalList

  const [assetTransactionInfo, setAssetTransactionInfo] = useState(initialCycle)

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
          fromDatePicker={fromDatePicker as string}
          setFromDatePicker={setFromDatePicker}
          toDatePicker={toDatePicker as string}
          setToDatePicker={setToDatePicker}
          searchInputField={searchInputField as string}
          setSearchInputField={setSearchInputField}
          selectDatePicker={selectDatePicker}
          setSelectDatePicker={setselectDatePicker}
          searchByEmployeeName={searchByEmployeeName}
          setSearchByEmployeeName={setSearchByEmployeeName}
          currentPage={currentPage}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
          setIsTableView={setIsAssetTableView}
        />
        <AssetTransactionalListTable
          paginationRange={paginationRange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          isAssetTableView={isAssetTableView}
          setToggle={setToggle}
          setAssetTransactionInfo={setAssetTransactionInfo}
        />
      </OCard>

      {toggle === 'transactionalList' && (
        <AssetTransactionHistory
          setToggle={setToggle}
          assetTransactionInfo={{
            id: 0,
            assetNumber: '',
            productName: '',
            pSpecification: '',
            employeeName: '',
            employeeId: null,
            assignedDate: null,
            description: '',
            status: '',
            date: '',
            updatedBy: '',
            location: '',
            referenceNumber: '',
            vendorName: '',
            vendorId: null,
            assetId: 0,
            productId: null,
            multipleSearch: null,
            searchByEmpName: null,
            locationForEmpAssets: null,
            invoiceNumber: '',
            amount: '',
          }}
          setAssetTransactionInfo={setAssetTransactionInfo}
        />
      )}
      {toggle === 'transactionalList' && (
        <AssetTransactionHistory
          setToggle={setToggle}
          setAssetTransactionInfo={setAssetTransactionInfo}
          assetTransactionInfo={{
            id: 0,
            assetNumber: '',
            productName: '',
            pSpecification: '',
            employeeName: '',
            employeeId: null,
            assignedDate: null,
            description: '',
            status: '',
            date: '',
            updatedBy: '',
            location: '',
            referenceNumber: '',
            vendorName: '',
            vendorId: null,
            assetId: 0,
            productId: null,
            multipleSearch: null,
            searchByEmpName: null,
            locationForEmpAssets: null,
            invoiceNumber: '',
            amount: '',
          }}
        />
      )}
    </>
  )
}

export default AssetTransactionalList
