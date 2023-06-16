import {
  CCol,
  CLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import parse from 'html-react-parser'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { currentPageData } from '../../../utils/paginationUtils'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'

const EmployeeAssetsTable = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [specification, setSpecification] = useState<string>('')
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()

  const userEmployeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const employeeAssets = useTypedSelector(
    reduxServices.employeeAssets.selectors.employeeAssets,
  )

  const isLoading = useTypedSelector(
    reduxServices.employeeAssets.selectors.isLoading,
  )

  const dispatch = useAppDispatch()
  // useEffect(() => {
  //   dispatch(reduxServices.employeeAssets.getEmployeeAssets(employeeId))
  // }, [dispatch, employeeId])

  useEffect(() => {
    dispatch(
      reduxServices.employeeAssets.getEmployeeAssets(
        isViewingAnotherEmployee ? String(selectedEmployeeId) : userEmployeeId,
      ),
    )
  }, [dispatch, userEmployeeId, isViewingAnotherEmployee, selectedEmployeeId])

  const handleModal = (productSpecification: string) => {
    setIsModalVisible(true)
    setSpecification(productSpecification)
  }

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(employeeAssets.length, 20)

  useEffect(() => {
    setPageSize(20)
    setCurrentPage(1)
  }, [employeeAssets, setPageSize, setCurrentPage])

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
    () => currentPageData(employeeAssets, currentPage, pageSize),
    [employeeAssets, currentPage, pageSize],
  )

  return (
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
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            employeeAssets &&
            currentPageItems?.map((assetsItem, index) => {
              const descriptionLimit =
                assetsItem.pSpecification &&
                assetsItem.pSpecification.length > 30
                  ? `${assetsItem.pSpecification.substring(0, 30)}...`
                  : assetsItem.pSpecification
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
                  <CTableDataCell scope="row" className="w-25">
                    <CLink
                      className="cursor-pointer text-decoration-none text-primary"
                      data-testid="specification-link"
                      onClick={() => handleModal(assetsItem.pSpecification)}
                    >
                      {parse(descriptionLimit)}
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
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {employeeAssets?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {employeeAssets?.length}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {employeeAssets?.length > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {employeeAssets?.length > 20 && (
            <CCol
              xs={5}
              className="gap-1 d-grid d-md-flex justify-content-md-end"
            >
              <OPagination
                currentPage={currentPage}
                pageSetter={setCurrentPage}
                paginationRange={paginationRange}
              />
            </CCol>
          )}
        </CRow>
      ) : (
        <CCol>
          <CRow className="mt-3 ms-3">
            <h5>No Records Found... </h5>
          </CRow>
        </CCol>
      )}
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      >
        {specification}
      </OModal>
    </>
  )
}

export default EmployeeAssetsTable
