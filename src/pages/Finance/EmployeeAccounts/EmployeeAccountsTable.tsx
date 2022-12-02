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
import { Link } from 'react-router-dom'
import EmployeeAccountsExpandTable from './EmployeeAccountsExpandTable'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { EmployeeAccountExpandableTableProps } from '../../../types/Finance/EmployeeAccounts/employeeAccountsTypes'
import panDetailsApi from '../../../middleware/api/Finance/PanDetails/panDetailsApi'
import { downloadFile } from '../../../utils/helper'

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

  const handleFinanceData = async (financeFilePath: string) => {
    const employeeBankDetailsDownload = await panDetailsApi.downloadFinanceFile(
      {
        fileName: financeFilePath,
      },
    )

    downloadFile(employeeBankDetailsDownload, 'paySlip.csv')
    console.log(financeFilePath)
  }

  const totalRecords = financeData?.length
    ? `Total Records: ${listSize}`
    : `No Records found...`

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
        <CTableBody color="light">
          {financeData?.length > 0 &&
            financeData?.map((data, index) => {
              return (
                <>
                  <React.Fragment key={index}>
                    <CTableRow>
                      <CTableDataCell scope="row">
                        {isIconVisible ? (
                          <i
                            data-testid="minus-btn"
                            className="fa fa-minus-circle cursor-pointer"
                            onClick={() => setIsIconVisible(false)}
                          />
                        ) : (
                          <i
                            data-testid="plus-btn"
                            className="fa fa-plus-circle cursor-pointer"
                            onClick={() => handleExpandRow}
                          />
                        )}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {data.financeDetails.employeeId}
                      </CTableDataCell>
                      <CTableDataCell
                        scope="row"
                        className="sh-organization-link"
                      >
                        <Link
                          to={`/employeeFinance/${data.financeDetails.employeeId}`}
                          className="cursor-pointer"
                        >
                          {data.employeeName}
                        </Link>
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {data.financeDetails.pfAccountNumber || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {data.financeDetails.uaNumber || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {data.financeDetails.panCardAccountNumber || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {data.financeDetails.aadharCardNumber || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell
                        scope="row"
                        className="sh-organization-link"
                      >
                        <CLink
                          className="cursor-pointer sh-hive-activity-link"
                          onClick={() =>
                            handleFinanceData(
                              String(data.financeDetails.financeFilePath),
                            )
                          }
                        >
                          {data.financeDetails.financeFilePath ? (
                            <i className="fa fa-paperclip me-1">DOC</i>
                          ) : (
                            'N/A'
                          )}
                        </CLink>
                      </CTableDataCell>
                    </CTableRow>
                    {isIconVisible ? (
                      <CTableDataCell colSpan={10}>
                        <EmployeeAccountsExpandTable />
                      </CTableDataCell>
                    ) : (
                      <></>
                    )}
                  </React.Fragment>
                </>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p className="mt-2">
            <strong>{totalRecords}</strong>
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
