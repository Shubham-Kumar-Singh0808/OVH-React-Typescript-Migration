import React from 'react'
import { Link } from 'react-router-dom'
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
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { ITDeclarationListTableProps } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const ITDeclarationListTable = (
  props: ITDeclarationListTableProps,
): JSX.Element => {
  const itDeclarationForms = useTypedSelector(
    reduxServices.itDeclarationList.selectors.itDeclarationForms,
  )
  const itDeclarationListSize = useTypedSelector(
    reduxServices.itDeclarationList.selectors.listSize,
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
      {itDeclarationForms?.length ? (
        <>
          <CTable className="mt-4" striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Employee ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                <CTableHeaderCell scope="col">My Saving</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {itDeclarationForms?.map((itDeclaration, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{itDeclaration.employeeId}</CTableDataCell>
                    <CTableDataCell>
                      {itDeclaration.employeeName}
                    </CTableDataCell>
                    <CTableDataCell>{itDeclaration.designation}</CTableDataCell>
                    <CTableDataCell>{itDeclaration.grandTotal}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="btn-ovh me-2 sh-eye-btn-color btn-sm btn-ovh-employee-list cursor-pointer"
                        data-testid={`viewItDeclarationForm-btn${index}`}
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i>
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
                <strong>Total Records: {itDeclarationListSize}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {itDeclarationListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {itDeclarationListSize > 20 && (
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
        <CRow className="mt-4">
          <h5>No Records Found... </h5>
        </CRow>
      )}
    </>
  )
}

export default ITDeclarationListTable
