import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CCol,
  CRow,
  CLink,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import React, { useState } from 'react'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { AssetsWarrantyListTableProps } from '../../../types/Assets/AssetWarrantyreport/AssetWarrantyReportTypes'
import assetsWarrantyListApi from '../../../middleware/api/Assets/AssetWarrantyReport/assetWarrantyReportApi'
import { downloadFile } from '../../../utils/helper'

const AssetWarrantyReportTable = (
  props: AssetsWarrantyListTableProps,
): JSX.Element => {
  const [isproductSpecification, setProductSpecification] =
    useState<boolean>(false)
  const [specification, setSpecification] = useState('')
  const assetWarrantyList = useTypedSelector(
    reduxServices.assetsWarrantyList.selectors.assetsWarrantyList,
  )

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handleExportEmployeeDesignationData = async () => {
    const assetsWarrantyReportList =
      await assetsWarrantyListApi.getExportAssetsWarrantyList({
        startIndex: 0,
        endIndex: 20,
        from: '',
        to: '',
        dateSelection: 'Current Month',
        token: '',
      })
    downloadFile(assetsWarrantyReportList, 'AssetsWarrantyReportListReport.csv')
  }
  const assetListSizeRecords = useTypedSelector(
    reduxServices.assetsWarrantyList.selectors.listSize,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const handleAgendaModal = (appraisalCycleSpecification: string) => {
    setProductSpecification(true)
    setSpecification(appraisalCycleSpecification)
    // setReasonModal(appraisalCycleInfo)
  }

  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            className="text-white"
            size="sm"
            data-testid="export-button"
            onClick={handleExportEmployeeDesignationData}
          >
            <i className="fa fa-plus me-1"></i>
            Click to Export
          </CButton>
        </CCol>
      </CRow>
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Asset Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Asset Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Asset Ref.Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Vendor Name</CTableHeaderCell>
            <CTableHeaderCell className="commentWidth" scope="col">
              Product Specifications
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">License Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Warranty Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Warranty End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Asset Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {assetWarrantyList?.length > 0 &&
            assetWarrantyList.map((warranty, index) => {
              const removeSpaces1 = warranty.otherAssetNumber
                ?.replace(/\s+/g, ' ')
                .trim()
                .replace(/&nbsp;/g, '')
              const agendaLimit1 =
                removeSpaces1 && removeSpaces1.length > 15
                  ? `${removeSpaces1.substring(0, 15)}...`
                  : removeSpaces1

              const removeSpaces = warranty.pSpecification
                ?.replace(/\s+/g, ' ')
                .trim()
                .replace(/&nbsp;/g, '')
              const agendaLimit =
                removeSpaces && removeSpaces.length > 15
                  ? `${removeSpaces.substring(0, 15)}...`
                  : removeSpaces

              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                  <CTableDataCell>
                    {warranty.assetNumber || 'N/A'}
                  </CTableDataCell>

                  <CTableDataCell>{warranty.assetType || 'N/A'}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    {warranty.referenceNumber || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {warranty.productName || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {warranty.vendorName || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell scope="row" className="sh-organization-link">
                    {warranty.pSpecification ? (
                      <CLink
                        className="cursor-pointer text-decoration-none"
                        data-testid={`specification-modal-link${index}`}
                        onClick={() =>
                          handleAgendaModal(warranty.pSpecification)
                        }
                      >
                        {parse(agendaLimit)}
                      </CLink>
                    ) : (
                      'N/A'
                    )}
                  </CTableDataCell>
                  <CTableDataCell scope="row" className="sh-organization-link">
                    {warranty.otherAssetNumber ? (
                      <CLink
                        className="cursor-pointer text-decoration-none"
                        data-testid={`description-modal-link${index}`}
                        onClick={() =>
                          handleAgendaModal(warranty.otherAssetNumber)
                        }
                      >
                        {parse(agendaLimit1)}
                      </CLink>
                    ) : (
                      'N/A'
                    )}
                  </CTableDataCell>
                  <CTableDataCell>{warranty.purchasedDate}</CTableDataCell>

                  <CTableDataCell>{warranty.warrantyEndDate}</CTableDataCell>
                  <CTableDataCell>{warranty.status}</CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {assetListSizeRecords} </strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {assetListSizeRecords > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              options={[20, 40, 60, 80]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {assetListSizeRecords > 20 && (
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
        visible={isproductSpecification}
        setVisible={setProductSpecification}
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
  )
}

export default AssetWarrantyReportTable
