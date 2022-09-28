import React from 'react'
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
import { Link } from 'react-router-dom'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { BirthdayListTableProps } from '../../../types/Dashboard/Birthdays/birthdayListTypes'

const BirthdaysListTable = (props: BirthdayListTableProps): JSX.Element => {
  const birthdaysList = useTypedSelector(
    reduxServices.birthdaysList.selectors.employeesBirthdayList,
  )
  const birthdayListSize = useTypedSelector(
    reduxServices.birthdaysList.selectors.listSize,
  )

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handleBirthdayListPageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      <CRow>
        <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end pe-0">
          <Link to={`/dashboard`}>
            <CButton color="info btn-ovh me-1" data-testid="back-btn">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </Link>
        </CCol>
      </CRow>
      {birthdaysList.length ? (
        <>
          <CTable className="mt-4" striped responsive align="middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell className="text-center" scope="col">
                  Name
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {birthdaysList.map((employeeBirthday, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{employeeBirthday.date}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {employeeBirthday.name}
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Number of Birthdays: {birthdayListSize}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {birthdayListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={
                    handleBirthdayListPageSizeSelectChange
                  }
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {birthdayListSize > 20 && (
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
        <></>
      )}
    </>
  )
}

export default BirthdaysListTable
