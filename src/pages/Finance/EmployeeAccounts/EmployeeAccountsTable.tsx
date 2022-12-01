import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CCol,
  CRow,
  CTableBody,
  CLink,
  CTableDataCell,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import EmployeeAccountsExpandTable from './EmployeeAccountsExpandTable'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { EmployeeAccountExpandableTableProps } from '../../../types/Finance/EmployeeAccounts/employeeAccountsTypes'

const EmployeeAccountsTable = (
  props: EmployeeAccountExpandableTableProps,
): JSX.Element => {
  const [isIconVisible, setIsIconVisible] = useState(false)

  const financeData = useTypedSelector(
    reduxServices.employeeAccount.selectors.financeInfo,
  )
  const listSize = useTypedSelector(
    reduxServices.employeeAccount.selectors.listSize,
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

  const handleExpandRow = () => {
    setIsIconVisible(true)
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
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">Employee Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">P.F A/C No.</CTableHeaderCell>
            <CTableHeaderCell scope="col">UAN</CTableHeaderCell>
            <CTableHeaderCell scope="col">Pan Card No.</CTableHeaderCell>
            <CTableHeaderCell scope="col">Aadhar Card No.</CTableHeaderCell>
            <CTableHeaderCell scope="col">Attachment</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {financeData.length > 0 &&
            financeData?.map((data, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {isIconVisible ? (
                      <i
                        data-testid="expandIcon"
                        className="fa fa-minus-circle cursor-pointer"
                        onClick={() => setIsIconVisible(false)}
                      />
                    ) : (
                      <i
                        data-testid="collapseIcon"
                        className="fa fa-plus-circle cursor-pointer"
                        onClick={() => handleExpandRow}
                      />
                    )}
                  </CTableDataCell>
                  <CTableDataCell scope="row">{data.employeeId}</CTableDataCell>
                  <CTableDataCell scope="row" className="sh-organization-link">
                    <CLink className="cursor-pointer">
                      {data.employeeName}
                    </CLink>
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {data.financeDetails.pfAccountNumber}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {data.financeDetails.uaNumber}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {data.financeDetails.panCardAccountNumber}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {data.financeDetails.aadharCardNumber}
                  </CTableDataCell>
                  <CTableDataCell scope="row" className="sh-organization-link">
                    <CLink className="cursor-pointer">
                      {data.financeDetails.financeFilePath}
                    </CLink>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          {isIconVisible ? (
            <CTableDataCell colSpan={10}>
              <EmployeeAccountsExpandTable />
            </CTableDataCell>
          ) : (
            <></>
          )}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {listSize}</strong>
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
  )
}
export default EmployeeAccountsTable
