/* eslint-disable react/prop-types */
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
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { AssetListTableProps } from '../../../types/Assets/AssetList/AssetListTypes'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OModal from '../../../components/ReusableComponent/OModal'

const AssetListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: AssetListTableProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isAssetWarranty, setAssetWarranty] = useState<boolean>(false)
  const [specification, setSpecification] = useState('')

  const assets = useTypedSelector(
    reduxServices.assetList.selectors.allAssetListData,
  )
  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }
  const assetListSize = useTypedSelector(
    reduxServices.assetList.selectors.listSize,
  )

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const handleAgendaModal = (appraisalCycleSpecification: string) => {
    setAssetWarranty(true)
    setSpecification(appraisalCycleSpecification)
  }

  const totalNoOfRecords = assets?.length
    ? `Total Records: ${assetListSize}`
    : `No Records found...`

  const modelPopup = (
    <CTableDataCell data-testid="action-cell">
      <div className="sh-btn-group">
        <CTooltip content="Edit">
          <CButton color="info" size="sm" className="mb-1">
            <i className="text-white fa fa-pencil-square-o"></i>
          </CButton>
        </CTooltip>
        <br />
        <CTooltip content="History">
          <CButton color="info" size="sm" className="mb-1">
            <i className=" fa fa-wrench"></i>
          </CButton>
        </CTooltip>
        <br />
        <CTooltip content="Change-Status">
          <CButton color="info" size="sm" className="mb-1">
            <i className="fa fa-bar-chart text-white"></i>
          </CButton>
        </CTooltip>
      </div>
    </CTableDataCell>
  )

  return (
    <>
      {assets?.length > 0 && (
        <>
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <CButton
                color="info"
                className="text-white"
                size="sm"
                data-testid="export-button-download"
                // onClick={handleExportEmployeeDesignationData}
              >
                <i className="fa fa-plus me-1"></i>
                Click to Export
              </CButton>
            </CCol>
          </CRow>
          <CTable striped responsive className="mt-5 align-middle alignment">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Asset Number</CTableHeaderCell>
                <CTableHeaderCell scope="col"> Asset Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Product Specifications
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">License Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Asset Reference No.
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Asset Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Invoice Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {assets.map((asset, index) => {
                const removeSpaces1 = asset.otherAssetNumber
                  ?.replace(/\s+/g, ' ')
                  .trim()
                  .replace(/&nbsp;/g, '')
                const agendaLimit1 =
                  removeSpaces1 && removeSpaces1.length > 15
                    ? `${removeSpaces1.substring(0, 15)}...`
                    : removeSpaces1

                const removeSpaces = asset.pSpecification
                  ?.replace(/\s+/g, ' ')
                  .trim()
                  .replace(/&nbsp;/g, '')
                const agendaLimit =
                  removeSpaces && removeSpaces.length > 15
                    ? `${removeSpaces.substring(0, 15)}...`
                    : removeSpaces

                const removeSpaces2 = asset.location
                  ?.replace(/\s+/g, ' ')
                  .trim()
                  .replace(/&nbsp;/g, '')
                const locationModel =
                  removeSpaces2 && removeSpaces2.length > 15
                    ? `${removeSpaces2.substring(0, 15)}...`
                    : removeSpaces2
                const result = asset.pSpecification ? (
                  <CLink
                    className="cursor-pointer text-decoration-none"
                    data-testid={`specification-modal-link1${index}`}
                    onClick={() => handleAgendaModal(asset.pSpecification)}
                  >
                    {parse(agendaLimit)}
                  </CLink>
                ) : (
                  'N/A'
                )
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                    <CTableDataCell>
                      {asset.assetNumber || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>{asset.assetType || 'N/A'}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {asset.productName || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell
                      scope="row"
                      className="sh-organization-link"
                    >
                      {result}
                    </CTableDataCell>
                    <CTableDataCell
                      scope="row"
                      className="sh-organization-link"
                    >
                      {asset.otherAssetNumber ? (
                        <CLink
                          className="cursor-pointer text-decoration-none"
                          data-testid={`description-modal-link2${index}`}
                          onClick={() =>
                            handleAgendaModal(asset.otherAssetNumber)
                          }
                        >
                          {parse(agendaLimit1)}
                        </CLink>
                      ) : (
                        'N/A'
                      )}
                    </CTableDataCell>
                    <CTableDataCell
                      scope="row"
                      className="sh-organization-link"
                    >
                      {asset.location ? (
                        <CLink
                          className="cursor-pointer text-decoration-none"
                          data-testid={`specification-modal-link${index}`}
                          onClick={() => handleAgendaModal(asset.location)}
                        >
                          {parse(locationModel)}
                        </CLink>
                      ) : (
                        'N/A'
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {asset.referenceNumber || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>{asset.status || 'N/A'}</CTableDataCell>
                    <CTableDataCell>
                      {asset.invoiceNumber || 'N/A'}
                    </CTableDataCell>
                    <CTableDataCell>{asset.amount || 'N/A'}</CTableDataCell>
                    <CTableDataCell>
                      {asset.employeeName || 'N/A'}
                    </CTableDataCell>
                    {modelPopup}
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p className="mt-2">
                <strong>{totalNoOfRecords}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {assetListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSize}
                  options={[20, 40, 60, 80, 100]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {assetListSize > 20 && (
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
            visible={isAssetWarranty}
            setVisible={setAssetWarranty}
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

export default AssetListTable
