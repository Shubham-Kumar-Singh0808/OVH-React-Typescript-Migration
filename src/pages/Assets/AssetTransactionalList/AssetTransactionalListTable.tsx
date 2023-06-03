/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable require-await */
import {
  CButton,
  CCol,
  CLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import XLSX from 'xlsx'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OModal from '../../../components/ReusableComponent/OModal'
import { AssetTransactionListTableProps } from '../../../types/Assets/AssetTransactionalList/AssetTransactionalListTypes'

const AssetTransactionalListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  isAssetTableView,
}: AssetTransactionListTableProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isAssetTransaction, setAssetTransaction] = useState<boolean>(false)
  const [specification, setSpecification] = useState('')

  const assetsResponse = useTypedSelector(
    reduxServices.assetTransactionList.selectors.assetTransactionList,
  )
  const getPageItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }
  const assetResponseListSize = useTypedSelector(
    reduxServices.assetTransactionList.selectors.listSize,
  )

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const handleAgendaModalpopup = (assetTransactionSpecification: string) => {
    setAssetTransaction(true)
    setSpecification(assetTransactionSpecification)
  }

  const handleExportEmployeeFinanceData = async () => {
    const contentElement = document.getElementById('transactionalExportId')
    if (contentElement) {
      const worksheet = XLSX.utils.table_to_sheet(
        document.getElementById('transactionalExportId'),
      )
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'TranscationalList')
      XLSX.writeFile(workbook, 'TranscationalList.xls')
    }
  }

  const totalNoOfAssetRecords = assetsResponse?.length
    ? `Total Records: ${assetResponseListSize}`
    : `No Records found...`

  return (
    <>
      {isAssetTableView && (
        <>
          <CRow className="mt-2">
            <CCol
              lg={12}
              className="gap-2 d-md-flex justify-content-end mt-3 mb-3"
              data-testid="exportBtn"
            >
              <CButton
                color="info"
                className="text-white"
                size="sm"
                onClick={handleExportEmployeeFinanceData}
              >
                <i className="fa fa-plus me-1"></i>
                Click to Export
              </CButton>
            </CCol>
          </CRow>
          <CTable
            striped
            responsive
            className="mt-5 align-middle alignment"
            id="transactionalExportId"
          >
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Asset Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Vendor Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Asset Ref.Number
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                <CTableHeaderCell scope="col">Updated by</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {assetsResponse.map((assetstransactonData, index) => {
                const removeSpacesDescription = assetstransactonData.description
                  ?.replace(/\s+/g, ' ')
                  .trim()
                  .replace(/&nbsp;/g, '')
                const descriptionPopUp =
                  removeSpacesDescription && removeSpacesDescription.length > 15
                    ? `${removeSpacesDescription.substring(0, 15)}...`
                    : removeSpacesDescription

                const removeSpacesLocation = assetstransactonData.location
                  ?.replace(/\s+/g, ' ')
                  .trim()
                  .replace(/&nbsp;/g, '')
                const locationModelPopUp =
                  removeSpacesLocation && removeSpacesLocation.length > 15
                    ? `${removeSpacesLocation.substring(0, 15)}...`
                    : removeSpacesLocation
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{getPageItemNumber(index)}</CTableDataCell>
                    <CTableDataCell>
                      {assetstransactonData.assetNumber || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {assetstransactonData.vendorName || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {assetstransactonData.referenceNumber || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {assetstransactonData.productName || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {assetstransactonData.status || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {assetstransactonData.date || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>
                      {assetstransactonData.employeeName || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell
                      scope="row"
                      className="sh-organization-link"
                    >
                      {assetstransactonData.description ? (
                        <CLink
                          className="cursor-pointer text-decoration-none"
                          data-testid={`description-modal-link2${index}`}
                          onClick={() =>
                            handleAgendaModalpopup(
                              assetstransactonData.description,
                            )
                          }
                        >
                          {parse(descriptionPopUp)}
                        </CLink>
                      ) : (
                        'N/A'
                      )}
                    </CTableDataCell>
                    <CTableDataCell
                      scope="row"
                      className="sh-organization-link"
                    >
                      {assetstransactonData.location ? (
                        <CLink
                          className="cursor-pointer text-decoration-none"
                          data-testid={`specification-modal-link${index}`}
                          onClick={() =>
                            handleAgendaModalpopup(
                              assetstransactonData.location,
                            )
                          }
                        >
                          {parse(locationModelPopUp)}
                        </CLink>
                      ) : (
                        'N/A'
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {assetstransactonData.updatedBy || 'N/A'}
                    </CTableDataCell>

                    <CTableDataCell data-testid="action-cell">
                      <div className="sh-btn-group">
                        <CTooltip content="Edit">
                          <CButton color="info" size="sm" className="mb-1">
                            <i className="fa fa-bar-chart text-white"></i>
                          </CButton>
                        </CTooltip>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p className="mt-2">
                <strong>{totalNoOfAssetRecords}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {assetResponseListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSize}
                  options={[20, 40, 60, 80, 100]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {assetResponseListSize > 20 && (
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
          <OModal
            modalSize="lg"
            alignment="center"
            visible={isAssetTransaction}
            setVisible={setAssetTransaction}
            confirmButtonText="Yes"
            cancelButtonText="No"
            modalFooterClass="d-none"
            modalHeaderClass="d-none"
          >
            <>
              <span className="descriptionField">
                <div
                  dangerouslySetInnerHTML={{
                    __html: specification,
                  }}
                />
              </span>
            </>
          </OModal>
        </>
      )}
    </>
  )
}

export default AssetTransactionalListTable
