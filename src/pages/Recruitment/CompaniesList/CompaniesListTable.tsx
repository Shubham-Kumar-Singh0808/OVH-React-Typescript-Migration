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
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { CompaniesListProps } from '../../../types/Recruitment/CompaniesList/CompaniesListTypes'

const CompaniesListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: CompaniesListProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const companiesListDetails = useTypedSelector(
    reduxServices.companiesList.selectors.allCompaniesListData,
  )

  const companiesListSize = useTypedSelector(
    reduxServices.companiesList.selectors.listSize,
  )

  const totalNoOfRecords = companiesListDetails?.length
    ? `Total Records: ${companiesListSize}`
    : `No Records found...`

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Company Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Candidates Count</CTableHeaderCell>
            <CTableHeaderCell scope="col"> Employees Count</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {companiesListDetails?.length > 0 &&
            companiesListDetails?.map((data, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell>{data.companyNmae || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {data.candidatesCount || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {data.employeesCount || 'N/A'}
                  </CTableDataCell>
                </CTableRow>
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
          {companiesListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSize}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {companiesListSize > 20 && (
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

export default CompaniesListTable
