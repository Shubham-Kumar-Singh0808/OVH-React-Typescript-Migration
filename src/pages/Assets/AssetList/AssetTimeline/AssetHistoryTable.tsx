import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'

const AssetHistoryTable = ({
  currentPage,
  pageSize,
}: {
  currentPage: number
  pageSize: number
}): JSX.Element => {
  const assetHistory = useTypedSelector(
    reduxServices.assetList.selectors.assetHistory,
  )

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  return (
    <>
      <CTable striped align="middle">
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
            {assetHistory.length > 0 &&
              assetHistory.map((historyItems, index) => {
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
    </>
  )
}

export default AssetHistoryTable
