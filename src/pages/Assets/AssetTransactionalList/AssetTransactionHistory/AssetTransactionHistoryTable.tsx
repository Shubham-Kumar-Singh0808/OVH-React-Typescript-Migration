import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
} from '@coreui/react-pro'
import React, { useMemo } from 'react'
import { useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { currentPageData } from '../../../../utils/paginationUtils'

const AssetTransactionHistoryTable = (): JSX.Element => {
  const assetHistory = useTypedSelector(
    reduxServices.assetList.selectors.assetHistory,
  )

  const pageFromState = useTypedSelector(
    reduxServices.addLocationList.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.addLocationList.selectors.pageSizeFromState,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(assetHistory?.length, pageSizeFromState, pageFromState)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const assetPageItems = useMemo(
    () => currentPageData(assetHistory, currentPage, pageSize),
    [assetHistory, currentPage, pageSize],
  )

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  return (
    <>
      <CTable responsive striped align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Asset Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Vendor Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Asset Ref.Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Invoice Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
            <CTableHeaderCell scope="col">Updated by</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <>
            {assetPageItems.length > 0 &&
              assetPageItems.map((historyItems, index) => {
                return (
                  <>
                    <CTableRow key={index}>
                      <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                      <CTableDataCell className="ng-binding">
                        {historyItems.assetNumber}
                      </CTableDataCell>
                      <CTableDataCell>{historyItems.vendorName}</CTableDataCell>
                      <CTableDataCell className="ng-binding">
                        {historyItems.referenceNumber}
                      </CTableDataCell>
                      <CTableDataCell>
                        {historyItems.productName}
                      </CTableDataCell>
                      <CTableDataCell className="ng-binding">
                        {historyItems.status}
                      </CTableDataCell>
                      <CTableDataCell>{historyItems.date}</CTableDataCell>
                      <CTableDataCell className="ng-binding">
                        {historyItems.employeeName}
                      </CTableDataCell>
                      <CTableDataCell>
                        {historyItems.invoiceNumber}
                      </CTableDataCell>
                      <CTableDataCell className="ng-binding">
                        {historyItems.amount}
                      </CTableDataCell>
                      <CTableDataCell>
                        {historyItems.description}
                      </CTableDataCell>
                      <CTableDataCell className="ng-binding">
                        {historyItems.location}
                      </CTableDataCell>
                      <CTableDataCell>{historyItems.updatedBy}</CTableDataCell>
                    </CTableRow>
                  </>
                )
              })}
          </>
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong data-testid="records">
            {assetHistory?.length
              ? `Total Records: ${assetHistory?.length}`
              : `No Records Found...`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {assetHistory?.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {assetHistory?.length > 20 && (
          <CCol
            xs={5}
            className="d-grid gap-1 d-md-flex justify-content-md-end"
          >
            <OPagination
              currentPage={currentPage}
              pageSetter={setCurrentPage}
              paginationRange={paginationRange}
            />
          </CCol>
        )}
      </CRow>
    </>
  )
}

export default AssetTransactionHistoryTable
