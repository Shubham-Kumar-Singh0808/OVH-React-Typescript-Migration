/* eslint-disable react/prop-types */
import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import AssetListTableBody from './AssetListTableBody'
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
  setEditAddAssetList,
  setToggle,
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
              {assets?.map((item, index) => {
                return (
                  <AssetListTableBody
                    key={index}
                    item={item}
                    index={index}
                    handleAgendaModal={handleAgendaModal}
                    getItemNumber={getItemNumber}
                    setToggle={setToggle}
                  />
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
