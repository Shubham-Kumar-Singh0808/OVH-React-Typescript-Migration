import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
} from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import EmployeeAllocationEntryTable from './EmployeeAllocationEntryTable'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import { deviceLocale } from '../../../utils/dateFormatUtils'
import { usePagination } from '../../../middleware/hooks/usePagination'

const EmployeeAllocationReportTable = (props: {
  Select: string
  toDate: string
  allocationStatus: string
  billingStatus: string
  fromDate: string
}): JSX.Element => {
  const [isIconVisible, setIsIconVisible] = useState(false)
  const [selectedKRA, setSelectedKRA] = useState(0)
  const dispatch = useAppDispatch()

  const employeeAllocationReport = useTypedSelector(
    reduxServices.employeeAllocationReport.selectors.employeeAllocationReport,
  )
  const { Select, toDate, allocationStatus, billingStatus, fromDate } = props

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(employeeAllocationReport?.Empsize, 20)
  const isLoading = useTypedSelector(
    reduxServices.employeeAllocationReport.selectors.isLoading,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }
  const handleExpandRow = (
    id: number | React.MouseEvent<HTMLButtonElement>,
  ) => {
    setSelectedKRA(id as number)
    dispatch(
      reduxServices.employeeAllocationReport.projectUnderEmployeesReport({
        dateSelection: Select,
        employeeid: id as number,
        enddate: toDate
          ? new Date(toDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        isAllocated: allocationStatus,
        isBillale: billingStatus,
        startdate: fromDate
          ? new Date(fromDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
      }),
    )
    setIsIconVisible(true)
  }

  useEffect(() => {
    dispatch(
      reduxServices.employeeAllocationReport.getEmployeeAllocationReport({
        Billingtype: billingStatus,
        EmployeeStatus: '',
        dateSelection: Select,
        departmentNames: [],
        employeeName: '',
        endIndex: pageSize * currentPage,
        enddate: '',
        firstIndex: pageSize * (currentPage - 1),
        startdate: '',
        technology: '',
      }),
    )
  }, [dispatch])

  return (
    <>
      <CTable className="text-left" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell className="text-center"></CTableHeaderCell>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
            <CTableHeaderCell scope="col">Department</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Project Allocation(%)
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            employeeAllocationReport &&
            employeeAllocationReport.emps?.map((allocationReport, index) => {
              return (
                <>
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">
                      {isIconVisible && selectedKRA === allocationReport.id ? (
                        <i
                          className="fa fa-minus-circle cursor-pointer"
                          onClick={() => setIsIconVisible(false)}
                        />
                      ) : (
                        <i
                          className="fa fa-plus-circle cursor-pointer"
                          onClick={() =>
                            handleExpandRow(allocationReport.id as number)
                          }
                        />
                      )}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {allocationReport.id}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {allocationReport.firstName +
                        ' ' +
                        allocationReport.lastName}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {allocationReport.designation}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {allocationReport.departmentName}
                    </CTableDataCell>
                    <CTableDataCell
                      scope="row"
                      className={
                        allocationReport.percent > 100 ? 'text-danger' : ''
                      }
                    >
                      {allocationReport.percent}
                    </CTableDataCell>
                  </CTableRow>
                  {isIconVisible && selectedKRA === allocationReport.id ? (
                    <>
                      <EmployeeAllocationEntryTable
                        id={allocationReport.id}
                        Select={Select}
                        toDate={toDate as string}
                        allocationStatus={allocationStatus}
                        billingStatus={billingStatus}
                        fromDate={fromDate as string}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {employeeAllocationReport?.Empsize ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>
                Total Records: {employeeAllocationReport?.Empsize}
              </strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {employeeAllocationReport?.Empsize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {employeeAllocationReport?.Empsize > 20 && (
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
    </>
  )
}
export default EmployeeAllocationReportTable
