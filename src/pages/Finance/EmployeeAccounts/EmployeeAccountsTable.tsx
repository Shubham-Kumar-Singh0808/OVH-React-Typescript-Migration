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
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeAccountsExpandTable from './EmployeeAccountsExpandTable'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { EmployeeAccountExpandableTableProps } from '../../../types/Finance/EmployeeAccounts/employeeAccountsTypes'
import panDetailsApi from '../../../middleware/api/Finance/PanDetails/panDetailsApi'
import { downloadFile } from '../../../utils/helper'

const EmployeeAccountsTable = (
  props: EmployeeAccountExpandableTableProps,
): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isIconVisible, setIsIconVisible] = useState(false)
  const [selectEmpId, setSelectEmpId] = useState<number>()

  const financeData = useTypedSelector(
    reduxServices.employeeAccount.selectors.financeInfo,
  )

  const FinanceDataListSize = useTypedSelector(
    reduxServices.employeeAccount.selectors.listSize,
  )

  const sortedEmpId = useMemo(() => {
    if (financeData) {
      return financeData
        ?.slice()
        .sort(
          (sortNode1, sortNode2) => sortNode1.employeeId - sortNode2.employeeId,
        )
    }
    return []
  }, [financeData])

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleExpandRow = (id: number) => {
    setIsIconVisible(true)
    setSelectEmpId(id)
  }

  const handleFinanceData = async (financeFilePath: string) => {
    const employeeBankDetailsDownload = await panDetailsApi.downloadFinanceFile(
      {
        fileName: financeFilePath,
      },
    )

    downloadFile(employeeBankDetailsDownload, 'paySlip.csv')
  }

  const totalNoOfRecords = financeData?.length
    ? `Total Records: ${FinanceDataListSize}`
    : `No Records found...`

  const handler = () => {
    dispatch(reduxServices.bankDetails.bankNameList)
    dispatch(
      reduxServices.panDetails.bankInformation({
        key: 'loggedInEmpId',
        value: Number(financeData[0].employeeId),
      }),
    )
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
        <CTableBody color="light">
          {sortedEmpId?.length > 0 &&
            sortedEmpId?.map((data, index) => {
              const document = data?.financeDetails?.financeFilePath
              const attachment = document ? (
                <i className="fa fa-paperclip me-1">DOC</i>
              ) : (
                'N/A'
              )
              return (
                <React.Fragment key={index}>
                  <CTableRow>
                    <CTableDataCell scope="row">
                      {isIconVisible && selectEmpId === data.employeeId ? (
                        <i
                          data-testid="minus-btn"
                          className="fa fa-minus-circle cursor-pointer"
                          onClick={() => setIsIconVisible(false)}
                        />
                      ) : (
                        <i
                          data-testid="plus-btn"
                          className="fa fa-plus-circle cursor-pointer"
                          onClick={() => handleExpandRow(data.employeeId)}
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
                        to={`/myFinance/${data.financeDetails.employeeId}`}
                        className="cursor-pointer"
                        onClick={handler}
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
                      {data.financeDetails.financeFilePath ? (
                        <CLink
                          className="cursor-pointer sh-hive-activity-link"
                          onClick={() =>
                            handleFinanceData(
                              String(data.financeDetails.financeFilePath),
                            )
                          }
                        >
                          {attachment}
                        </CLink>
                      ) : (
                        <CTableDataCell scope="row">
                          {data.financeDetails.financeFilePath || 'N/A'}
                        </CTableDataCell>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                  {isIconVisible && selectEmpId === data.employeeId ? (
                    <CTableDataCell colSpan={10}>
                      <EmployeeAccountsExpandTable
                        bankDetails={data.bankDetails}
                      />
                    </CTableDataCell>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
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
          {FinanceDataListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSize}
              options={[20, 40, 60, 80]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {FinanceDataListSize > 20 && (
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
