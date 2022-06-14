import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardHeader,
  CCardBody,
  CLink,
  CRow,
  CCol,
} from '@coreui/react-pro'
import React, { useState, useEffect, useMemo } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { currentPageData } from '../../../utils/paginationUtils'
const EmployeeMyAssetsTab = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [specification, setSpecification] = useState<string>('')

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const employeeMyAssets = useTypedSelector(
    reduxServices.employeeMyAssets.selectors.employeeMyAssets,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.employeeMyAssets.getEmployeeMyAssets(employeeId))
  }, [dispatch, employeeId])

  const handleModal = (specification: string) => {
    setIsModalVisible(true)
    setSpecification(specification)
  }

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(employeeMyAssets.length, 20)

  useEffect(() => {
    setPageSize(20)
    setCurrentPage(1)
  }, [employeeMyAssets, setPageSize, setCurrentPage])

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentPageItems = useMemo(
    () => currentPageData(employeeMyAssets, currentPage, pageSize),
    [employeeMyAssets, currentPage, pageSize],
  )

  return (
    <>
      <CCardHeader>
        <h4 className="h4">My Assets</h4>
      </CCardHeader>
      <br />
      <CCardBody className="ps-0 pe-0">
        {employeeMyAssets.length ? (
          <>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Asset Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Asset Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Product Specifications
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Asset Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentPageItems.map((assetsItem, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell scope="row">
                        {getItemNumber(index)}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {assetsItem.assetNumber}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {assetsItem.assetType}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {assetsItem.productName}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        <CLink
                          className="cursor-pointer text-decoration-none text-primary"
                          onClick={() => handleModal(assetsItem.pSpecification)}
                        >
                          {assetsItem.pSpecification}
                        </CLink>
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {assetsItem.location}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {assetsItem.status}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {assetsItem.employeeName}
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
            <br />
            <CRow>
              <CCol xs={4}>
                <p>
                  <strong>Total Records: {employeeMyAssets.length}</strong>
                </p>
              </CCol>
              <CCol xs={3}>
                {employeeMyAssets.length > 20 && (
                  <OPageSizeSelect
                    handlePageSizeSelectChange={handlePageSizeSelectChange}
                  />
                )}
              </CCol>
              {employeeMyAssets.length > 20 && (
                <CCol
                  xs={5}
                  className="d-grid gap-2 d-md-flex justify-content-md-end"
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
        ) : (
          <>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Asset Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Asset Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Product Specifications
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Asset Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
            </CTable>
            <br />
            <CCol xs={4}>
              <p>
                <strong>No Records Found... </strong>
              </p>
            </CCol>
          </>
        )}
        <OModal
          alignment="center"
          modalFooterClass="d-none"
          modalHeaderClass="d-none"
          visible={isModalVisible}
          setVisible={setIsModalVisible}
        >
          {specification}
        </OModal>
      </CCardBody>
    </>
  )
}

export default EmployeeMyAssetsTab
