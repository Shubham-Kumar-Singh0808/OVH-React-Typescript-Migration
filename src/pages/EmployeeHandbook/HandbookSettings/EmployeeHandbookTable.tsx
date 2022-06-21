import {
  CButton,
  CCol,
  CImage,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

import { EmployeeListTableProps } from '../../../types/EmployeeDirectory/EmployeesList/employeeListTypes'
import { Link } from 'react-router-dom'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import React from 'react'
import { EmployeeHandbookTableProps } from '../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'

const EmployeeHandbookTable = (
  props: EmployeeHandbookTableProps,
): JSX.Element => {
  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props
  return (
    <>
      <>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Title</CTableHeaderCell>
              <CTableHeaderCell scope="col">Page Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Display Order</CTableHeaderCell>
              <CTableHeaderCell scope="col">Country</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {/* {x.map((y, index) => { */}
            return (
            <CTableRow>
              <CTableHeaderCell scope="row"></CTableHeaderCell>
              <CTableDataCell>xxxx</CTableDataCell>
              <CTableDataCell>yyyy</CTableDataCell>
              <CTableDataCell>zzzz</CTableDataCell>
              <CTableDataCell>zzzz</CTableDataCell>
              <CTableDataCell>edit delete</CTableDataCell>
            </CTableRow>
            ){/* })} */}
          </CTableBody>
        </CTable>
        {/* <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: </strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {listSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {listSize > 20 && (
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
        </CRow> */}
      </>
      ) : (
      <CCol>
        <CRow>
          <h4 className="text-center">No data to display</h4>
        </CRow>
      </CCol>
      {/* )} */}
    </>
  )
}

export default EmployeeHandbookTable
