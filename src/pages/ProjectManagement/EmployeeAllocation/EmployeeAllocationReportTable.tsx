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
import React, { useState } from 'react'
import EmployeeAllocationEntryTable from './EmployeeAllocationEntryTable'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

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

  const handleExpandRow = (
    id: number | React.MouseEvent<HTMLButtonElement>,
  ) => {
    setSelectedKRA(id as number)
    dispatch(
      reduxServices.employeeAllocationReport.projectUnderEmployeesReport({
        dateSelection: Select,
        employeeid: id as number,
        enddate: toDate as string,
        isAllocated: allocationStatus,
        isBillale: billingStatus,
        startdate: fromDate as string,
      }),
    )
    setIsIconVisible(true)
  }

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
        <CTableBody>
          {employeeAllocationReport?.map((allocationReport, index) => {
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
                  <CTableDataCell scope="row">
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
          })}
        </CTableBody>
      </CTable>
      <CCol>
        <CRow className="mt-5">
          <strong>
            {employeeAllocationReport?.length
              ? `Total Records: ${employeeAllocationReport?.length}`
              : `No Records found`}
          </strong>
        </CRow>
      </CCol>
    </>
  )
}
export default EmployeeAllocationReportTable
