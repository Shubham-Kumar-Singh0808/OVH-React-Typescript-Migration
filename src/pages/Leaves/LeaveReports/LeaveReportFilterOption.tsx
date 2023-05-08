import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { downloadFile } from '../../../utils/helper'
import leaveReportsApi from '../../../middleware/api/Leaves/LeaveReports/leaveReportApi'
import { LeaveReportOptionsProps } from '../../../types/Leaves/LeaveReports/leaveReportTypes'

const LeaveReportsFilterOption = ({
  selectYear,
  setSelectYear,
  setCurrentPage,
  setPageSize,
}: LeaveReportOptionsProps): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const dispatch = useAppDispatch()

  const listSize = useTypedSelector(
    reduxServices.leaveReport.selectors.listSize,
  )
  const getCreditYearData = useTypedSelector(
    reduxServices.leaveReport.selectors.creditedYears,
  )

  const getFinancialYear = useTypedSelector(
    reduxServices.leaveReport.selectors.financialYear,
  )

  useEffect(() => {
    dispatch(reduxServices.leaveReport.getFinancialYear())
  }, [dispatch])

  useEffect(() => {
    dispatch(reduxServices.leaveReport.creditedYearDetails())
  }, [dispatch])
  const { currentPage, pageSize } = usePagination(listSize, 20)

  const handleSearch = () => {
    dispatch(
      reduxServices.leaveReport.searchLeaveSummaries({
        financialYear: selectYear,
        search: searchInput,
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }

  const handleSearchByEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.leaveReport.searchLeaveSummaries({
          financialYear: selectYear,
          search: searchInput,
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
        }),
      )
    }
  }
  const handleExportLeaveReportData = async () => {
    const employeeLeaveReportDataDownload =
      await leaveReportsApi.exportLeaveReportData({
        financialYear: selectYear,
        search: searchInput,
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      })

    downloadFile(employeeLeaveReportDataDownload, 'LeaveReportList.csv')
  }

  const formLabelProps = {
    htmlFor: 'inputNewLeaveReports',
    className: 'col-form-label category-label',
  }

  const result = getCreditYearData
    ?.filter((value) => value.yearOfEra.value <= getFinancialYear)
    .map((val2) => val2.yearOfEra.value)

  const uniqueValue = Array.from(new Set(result))

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectYear(e.target.value)
    setCurrentPage(1)
    setPageSize(20)
  }
  return (
    <>
      <CRow className="mt-1">
        <CCol sm={12}>
          <CRow>
            <CCol sm={4}>
              <CFormLabel
                {...formLabelProps}
                className="col-sm-4 col-form-label"
              >
                Select Year:
              </CFormLabel>
              <CFormSelect
                data-testid="leave-form-select2"
                aria-label="leaveCycleMonth"
                name="selectYear"
                id="selectYear"
                value={selectYear}
                // onChange={(e) => setSelectYear(e.target.value)}
                onChange={onChangeHandler}
              >
                {uniqueValue.map((value, index) => {
                  return <option key={index}>{value}</option>
                })}
              </CFormSelect>
            </CCol>
            <CCol sm={4}>
              <CFormLabel
                {...formLabelProps}
                className="col-sm-6 col-form-label"
              >
                Search Employees:
              </CFormLabel>
              <CInputGroup
                className="global-search me-0"
                data-testid="searchField"
              >
                <CFormInput
                  data-testid="searchInput"
                  placeholder="Search Employees"
                  aria-label="Multiple Search"
                  aria-describedby="button-addon2"
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value)
                  }}
                  onKeyUp={handleSearchByEnter}
                />
                <CButton
                  disabled={!searchInput}
                  data-testid="search-btn1"
                  className="cursor-pointer"
                  type="button"
                  color="info"
                  id="button-addon2"
                  onClick={handleSearch}
                >
                  <i className="fa fa-search"></i>
                </CButton>
              </CInputGroup>
            </CCol>
            <CCol xs={4}>
              <CButton
                color="primary me-1 leavereport-exportbutton"
                onClick={handleExportLeaveReportData}
                data-testid="leaveReportExport-btn"
              >
                <i className="fa fa-plus me-1"></i>Click to Export
              </CButton>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}
export default LeaveReportsFilterOption
