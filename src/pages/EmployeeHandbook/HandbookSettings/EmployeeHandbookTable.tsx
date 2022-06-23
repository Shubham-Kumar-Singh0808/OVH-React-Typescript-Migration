import {
  CButton,
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
import React from 'react'
import { EmployeeHandbookTableProps } from '../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const EmployeeHandbookTable = (
  props: EmployeeHandbookTableProps,
): JSX.Element => {
  const employeeHandbooks = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.employeeHandbooks,
  )
  const listSize = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.listSize,
  )

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      {employeeHandbooks.length ? (
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
              {employeeHandbooks.map((employeeHandbook, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableHeaderCell>
                      {employeeHandbook.title}
                    </CTableHeaderCell>
                    <CTableDataCell>{employeeHandbook.pageName}</CTableDataCell>
                    <CTableDataCell>
                      {employeeHandbook.displayOrder}
                    </CTableDataCell>
                    {employeeHandbook.handCountry.map(
                      (country, indexNumber) => (
                        <CTableDataCell key={indexNumber}>
                          {country.name}
                        </CTableDataCell>
                      ),
                    )}
                    <CTableDataCell>
                      <CButton color="info" className="btn-ovh me-1">
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                      <CButton color="danger" className="btn-ovh me-1">
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {employeeHandbooks.length} </strong>
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
          </CRow>
        </>
      ) : (
        <CCol>
          <CRow>
            <h4 className="text-center">No data to display</h4>
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default EmployeeHandbookTable
