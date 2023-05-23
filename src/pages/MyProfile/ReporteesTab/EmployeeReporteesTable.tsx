import React, { useEffect, useMemo, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCol,
  CLink,
  CRow,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import EmployeeReporteesEntryTable from './EmployeeReporteesEntryTable'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { currentPageData } from '../../../utils/paginationUtils'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import OModal from '../../../components/ReusableComponent/OModal'

const EmployeeReportessTable = (): JSX.Element => {
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const employeeReportees = useTypedSelector(
    reduxServices.employeeReportees.selectors.employeeReportees,
  )
  const empID = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.employeeReportees.getEmployeeReportees(
        isViewingAnotherEmployee ? selectedEmployeeId : empID,
      ),
    )
  }, [dispatch, empID, isViewingAnotherEmployee, selectedEmployeeId])

  const handleModal = (personId: number) => {
    setIsModalVisible(true)
    dispatch(reduxServices.employeeReportees.getEmployeeReporteesKRAs(personId))
  }
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(employeeReportees.length, 20)

  useEffect(() => {
    setPageSize(20)
    setCurrentPage(1)
  }, [employeeReportees, setPageSize, setCurrentPage])

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const currentPageItems = useMemo(
    () => currentPageData(employeeReportees, currentPage, pageSize),
    [employeeReportees, currentPage, pageSize],
  )

  const tableHeaderCellProps = {
    scope: 'col',
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellProps}>
              Manager
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Reportee</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mobile No.</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Reportee Project Name & Allocation %
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">KRAs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employeeReportees.length > 0 &&
            currentPageItems?.map((reportee, index) => (
              <CTableRow key={index}>
                <CTableDataCell scope="row">
                  {' '}
                  {getItemNumber(index)}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <Link
                    to={`/employeeProfile/${reportee.managerId}`}
                    className="employee-name"
                  >
                    {reportee.managerName}
                  </Link>
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <Link
                    to={`/employeeProfile/${reportee.reporteeId}`}
                    className="employee-name"
                  >
                    {reportee.reporteeName}
                  </Link>
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {reportee.mobile || 'N/A'}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {reportee.allcoationDetails || 'N/A'}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <CLink
                    className="cursor-pointer text-decoration-none text-primary"
                    data-testid="report-test"
                    onClick={() => handleModal(reportee.reporteeId)}
                  >
                    Click for KRAs
                  </CLink>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      {employeeReportees?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {employeeReportees?.length}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {employeeReportees?.length > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {employeeReportees?.length > 20 && (
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
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <EmployeeReporteesEntryTable />
      </OModal>
    </>
  )
}

export default EmployeeReportessTable
