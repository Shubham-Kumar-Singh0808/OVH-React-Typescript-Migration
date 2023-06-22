import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
} from '@coreui/react-pro'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { CompaniesListProps } from '../../../types/Recruitment/CompaniesList/CompaniesListTypes'

const EmployeesCountTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: CompaniesListProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const candidatesInfoListDetails = useTypedSelector(
    reduxServices.companiesList.selectors.candidatesInfoListData,
  )

  const RecordListSize = useTypedSelector(
    reduxServices.companiesList.selectors.listSize,
  )

  const totalList = candidatesInfoListDetails?.length
    ? `Total Records: ${RecordListSize}`
    : `No Records found...`

  const handlePaginationSize = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Company Name</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Position Applied for</CTableHeaderCell>
            <CTableHeaderCell>Job Code</CTableHeaderCell>
            <CTableHeaderCell>Mobile</CTableHeaderCell>
            <CTableHeaderCell>Email ID</CTableHeaderCell>
            <CTableHeaderCell>Experience</CTableHeaderCell>
            <CTableHeaderCell>Skills</CTableHeaderCell>
            <CTableHeaderCell>Recruiter</CTableHeaderCell>
            <CTableHeaderCell>Reference</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {candidatesInfoListDetails?.length > 0 &&
            candidatesInfoListDetails?.map((data, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell>
                    {data.currentEmployer || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{data.fullName || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {data.appliedFor.positionVacant || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {data.appliedFor.jobCode || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{data.mobile || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{data.email || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{data.experience || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{data.skills || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{data.recruiter || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {data.sourcelookUp.sourceName || 'N/A'}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p className="mt-2">
            <strong>{totalList}</strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {RecordListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePaginationSize}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {RecordListSize > 20 && (
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

export default EmployeesCountTable
