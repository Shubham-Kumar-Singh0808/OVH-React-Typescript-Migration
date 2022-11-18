import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import ResignationListTable from './ResignationListTable'
import {
  deviceLocale,
  downloadFile,
  showIsRequired,
} from '../../../utils/helper'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import resignationListApi from '../../../middleware/api/Separation/ResignationList/resignationListApi'

const ResignationListFilterOptions = ({
  Select,
  setSelect,
}: {
  Select: string
  setSelect: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const [dateError, setDateError] = useState<boolean>(false)
  const [selectFromDate, setSelectFromDate] = useState<Date | string>()
  const [selectToDate, setSelectToDate] = useState<Date | string>()
  const [status, setStatus] = useState<string>()
  const [employeeStatus, setEmployeeStatus] = useState<string>()
  const [searchInput, setSearchInput] = useState<string>('')
  const listSize = useTypedSelector(
    reduxServices.resignationList.selectors.resignationListSize,
  )
  const dispatch = useAppDispatch()
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)
  const commonFormatDate = 'l'
  const fromDateValue = selectFromDate
    ? new Date(selectFromDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const toDateValue = selectToDate
    ? new Date(selectToDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''
  useEffect(() => {
    const newFromDate = new Date(
      moment(selectFromDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(selectToDate?.toString()).format(commonFormatDate),
    )
    if (
      selectFromDate &&
      selectToDate &&
      newToDate.getTime() < newFromDate.getTime()
    ) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [selectFromDate, selectToDate])
  const handleViewButtonHandler = () => {
    dispatch(
      reduxServices.resignationList.getResignationList({
        dateSelection: Select,
        empStatus: employeeStatus as string,
        endIndex: pageSize * currentPage,
        from: selectFromDate
          ? new Date(selectFromDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        multiplesearch: '',
        startIndex: pageSize * (currentPage - 1),
        status: status as string,
        to: selectToDate
          ? new Date(selectToDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
      }),
    )
  }
  const handleSearchInput = () => {
    dispatch(
      reduxServices.resignationList.getResignationList({
        dateSelection: '',
        empStatus: '',
        endIndex: pageSize * currentPage,
        from: '',
        multiplesearch: searchInput,
        startIndex: pageSize * (currentPage - 1),
        status: 'ALL',
        to: '',
      }),
    )
  }
  const clearButtonHandler = () => {
    setSelect('')
    setStatus('')
    setEmployeeStatus('')
    setSelectFromDate('')
    setSelectToDate('')
    dispatch(
      reduxServices.resignationList.getResignationList({
        dateSelection: '',
        empStatus: '',
        endIndex: pageSize * currentPage,
        from: '',
        multiplesearch: '',
        startIndex: pageSize * (currentPage - 1),
        status: 'ALL',
        to: '',
      }),
    )
  }

  const handleExportResignationListData = async () => {
    const resignationListDownload =
      await resignationListApi.exportResignationListData({
        status: 'ALL',
        from: '',
        to: '',
        multiplesearch: '',
        dateSelection: '',
        empStatus: '',
      })

    downloadFile(resignationListDownload, 'ResignationListList.csv')
  }
  return (
    <>
      <CRow className="employeeAllocation-form mt-4">
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Select:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="Select"
            data-testid="form-select1"
            name="Select"
            value={Select}
            onChange={(e) => {
              setSelect(e.target.value)
            }}
          >
            <option value="">Select Month</option>
            <option value="Last Month">Last Month</option>
            <option value="Current Month">Current Month</option>
            <option value="Custom">Custom</option>
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Status:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="status"
            data-testid="form-select2"
            name="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
            }}
          >
            <option value="All" selected>
              All
            </option>
            <option value="SUBMITRESIGNATION">Resigned</option>
            <option value="DISCUSSIONWITHREPORTINGMANAGER">
              Pending Approval
            </option>
            <option value="UNDERNOTICE">Under Notice</option>
            <option value="RELIEVED">Relieved</option>
            <option value="ABSCOND">Absconding</option>
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Employee Status:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="employeeStatus"
            data-testid="form-select3"
            name="employeeStatus"
            value={employeeStatus}
            onChange={(e) => {
              setEmployeeStatus(e.target.value)
            }}
          >
            <option value="">Employee Status</option>
            <option value="Active">Active</option>
            <option value="InActive">InActive</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={{ span: 6, offset: 3 }}>
          <CButton color="info btn-ovh me-3" data-testid="view-btn">
            <i className="fa fa-eye"></i>View Chart
          </CButton>
          <CButton
            color="info btn-ovh me-3"
            data-testid="export-btn"
            onClick={handleExportResignationListData}
          >
            <i className="fa fa-plus me-1"></i>Click to Export
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        {Select === 'Custom' ? (
          <>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">
                From:{' '}
                <span className={showIsRequired(selectFromDate as string)}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={2}>
              <DatePicker
                className="form-control form-control-sm sh-date-picker"
                data-testid="date-picker"
                placeholderText="dd/mm/yy"
                name="fromDate"
                maxDate={new Date()}
                autoComplete="off"
                id="fromDate"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={fromDateValue}
                onChange={(date: Date) => setSelectFromDate(date)}
                selected={selectFromDate as Date}
              />
            </CCol>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">
                To:
                <span className={showIsRequired(selectToDate as string)}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={2}>
              <DatePicker
                className="form-control form-control-sm sh-date-picker"
                data-testid="date-picker"
                placeholderText="dd/mm/yy"
                name="toDate"
                id="toDate"
                autoComplete="off"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={toDateValue}
                onChange={(date: Date) => setSelectToDate(date)}
                selected={selectToDate as Date}
              />
              {dateError && (
                <span className="text-danger" data-testid="errorMessage">
                  To date should be greater than From date
                </span>
              )}
            </CCol>
          </>
        ) : (
          <></>
        )}
      </CRow>
      <CRow className="mt-4 mb-4">
        <CCol sm={{ span: 6, offset: 3 }}>
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            data-testid="view-btn"
            onClick={handleViewButtonHandler}
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            disabled={false}
            data-testid="clear-btn"
            color="warning btn-ovh me-1"
            onClick={clearButtonHandler}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
      <CRow className="gap-2 d-md-flex justify-content-md-end">
        <CCol sm={3} md={4} lg={5} xl={4} xxl={3}>
          <CInputGroup className="global-search me-0">
            <CFormInput
              placeholder="Multiple Search"
              aria-label="Multiple Search"
              data-testid="search-input"
              aria-describedby="button-addon2"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
            />
            <CButton
              data-testid="multi-search-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              onClick={handleSearchInput}
            >
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
      <ResignationListTable
        paginationRange={paginationRange}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  )
}

export default ResignationListFilterOptions
