import { CButton, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import EmployeeAccountsTable from './EmployeeAccountsTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { downloadFile } from '../../../utils/helper'
import employeeAccountsApi from '../../../middleware/api/Finance/EmployeeAccounts/employeeAccountsApi'

const EmployeeAccounts = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')

  const dispatch = useAppDispatch()

  const listSize = useTypedSelector(
    reduxServices.employeeAccount.selectors.listSize,
  )

  const CurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    if (CurrentPage) {
      setCurrentPage(CurrentPage)
    }
  }, [CurrentPage])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(reduxServices.bankDetails.bankNameList())
    dispatch(
      reduxServices.employeeAccount.getFinanceDetails({
        startIndex: pageSize * (CurrentPage - 1),
        endIndex: pageSize * CurrentPage,
        employeeName: '',
      }),
    )
  }, [CurrentPage, dispatch, pageSize])

  const handleExportEmployeeFinanceData = async () => {
    const employeeFinanceList = await employeeAccountsApi.exportFinanceList({
      employeeNameSearch: searchInput,
    })
    downloadFile(employeeFinanceList, 'FinanceList.csv')
  }

  const handleSearchBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.employeeAccount.getFinanceDetails({
          endIndex: 20,
          employeeName: searchInput,
          startIndex: 0,
        }),
      )
    }
  }

  const multiSearchBtnHandler = () => {
    dispatch(
      reduxServices.employeeAccount.getFinanceDetails({
        endIndex: 20,
        employeeName: searchInput,
        startIndex: 0,
      }),
    )
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Accounts"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mt-2">
          <CCol
            lg={12}
            className="gap-2 d-md-flex justify-content-end mt-3 mb-3"
            data-testid="exportBtn"
          >
            <CButton
              color="info"
              className="text-white"
              size="sm"
              onClick={handleExportEmployeeFinanceData}
            >
              <i className="fa fa-plus me-1"></i>
              Click to Export
            </CButton>
          </CCol>
        </CRow>
        <CRow className="gap-2 d-md-flex justify-content-md-end">
          <CCol sm={3} md={3}>
            <CInputGroup className="global-search me-0 justify-content-md-end">
              <CFormInput
                data-testid="searchField"
                placeholder="Multiple Search"
                aria-label="Multiple Search"
                aria-describedby="button-addon2"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value)
                }}
                onKeyDown={handleSearchBtn}
              />
              <CButton
                disabled={!searchInput}
                data-testid="multi-search-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
                onClick={multiSearchBtnHandler}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
        <EmployeeAccountsTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </OCard>
    </>
  )
}
export default EmployeeAccounts
