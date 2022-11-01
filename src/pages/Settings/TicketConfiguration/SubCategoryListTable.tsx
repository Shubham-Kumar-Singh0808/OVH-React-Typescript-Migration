import React from 'react'
import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { SubCategoryListTableProps } from '../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'

const SubCategoryListTable = (
  props: SubCategoryListTableProps,
): JSX.Element => {
  const subCategoryList = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.subCategories,
  )
  const subCategoryListSize = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.listSize,
  )
  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handleSubCategoryListPageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      <CTable className="mt-4 ps-0 alignment" striped responsive align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Department Name</CTableHeaderCell>
            <CTableHeaderCell>Category Name</CTableHeaderCell>
            <CTableHeaderCell>Sub-Category Name</CTableHeaderCell>
            <CTableHeaderCell>Estimated Time(hh.mm)</CTableHeaderCell>
            <CTableHeaderCell>Work Flow</CTableHeaderCell>
            <CTableHeaderCell>Level of Hierarchy</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {subCategoryList?.map((ticket, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{ticket.departmentName}</CTableDataCell>
                <CTableDataCell>{ticket.categoryName}</CTableDataCell>
                <CTableDataCell>{ticket.subCategoryName}</CTableDataCell>
                <CTableDataCell>{ticket.estimatedTime}</CTableDataCell>
                <CTableDataCell>{ticket.workFlow}</CTableDataCell>
                <CTableDataCell>{ticket?.levelOfHierarchy}</CTableDataCell>
                <CTableDataCell>Buttons</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {subCategoryListSize}</strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {subCategoryListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={
                handleSubCategoryListPageSizeSelectChange
              }
              options={[20, 40, 60, 80]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {subCategoryListSize > 20 && (
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

export default SubCategoryListTable
