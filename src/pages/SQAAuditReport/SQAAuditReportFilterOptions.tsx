import React, { useEffect, useState } from 'react'
import moment from 'moment'
import ReactDatePicker from 'react-datepicker'
import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import SQAAuditReportTable from './SQAAuditReportTable'
import { usePagination } from '../../middleware/hooks/usePagination'
import { reduxServices } from '../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { deviceLocale, downloadFile } from '../../utils/helper'
import sqaAuditReportApi from '../../middleware/api/SQAAuditReport/SQAAuditReportApi'

const SQAAuditReportFilterOptions = ({
  selectDate,
  setSelectDate,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: {
  selectDate: string
  setSelectDate: React.Dispatch<React.SetStateAction<string>>
  fromDate: string
  setFromDate: React.Dispatch<React.SetStateAction<string>>
  toDate: string
  setToDate: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const [status, setStatus] = useState<string>('')
  const [rescheduleStatus, setRescheduleStatus] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [dateError, setDateError] = useState<boolean>(false)
  const sqaAuditReportListSize = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.sqaAuditReportListSize,
  )

  useEffect(() => {
    if (localStorage.getItem('status')) {
      setStatus(localStorage.getItem('status') ?? '')
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('rescheduleStatus')) {
      setRescheduleStatus(localStorage.getItem('rescheduleStatus') ?? '')
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('selectDate')) {
      setSelectDate(localStorage.getItem('selectDate') ?? '')
    }
  }, [])
  const dispatch = useAppDispatch()
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(sqaAuditReportListSize, 20)

  const toDateValue = toDate
    ? new Date(toDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : ''

  const fromDateValue = fromDate
    ? new Date(fromDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : ''
  const commonFormatDate = 'l'
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccessSqaAuditReport = userAccessToFeatures?.find(
    (feature) => feature.name === 'SQA Audit Report',
  )
  const disableAfterDate = new Date()
  disableAfterDate.setFullYear(disableAfterDate.getFullYear() + 1)

  useEffect(() => {
    dispatch(
      reduxServices.sqaAuditReport.getSQAAuditReport({
        endIndex: pageSize * currentPage,
        multiSearch: '',
        startIndex: pageSize * (currentPage - 1),
        SQAAuditSelectionDate:
          (localStorage.getItem('selectDate')
            ? localStorage.getItem('selectDate')
            : selectDate) || '',
        auditRescheduleStatus:
          (localStorage.getItem('rescheduleStatus')
            ? localStorage.getItem('rescheduleStatus')
            : rescheduleStatus) || '',
        auditStatus:
          (localStorage.getItem('status')
            ? localStorage.getItem('status')
            : status) || '',
        from: '',
        to: '',
      }),
    )
  }, [dispatch, pageSize, currentPage])

  const viewButtonHandler = () => {
    dispatch(
      reduxServices.sqaAuditReport.getSQAAuditReport({
        endIndex: pageSize * currentPage,
        multiSearch: searchInput || '',
        startIndex: pageSize * (currentPage - 1),
        SQAAuditSelectionDate: selectDate,
        auditRescheduleStatus: rescheduleStatus,
        auditStatus: status,
        from: fromDateValue,
        to: toDateValue,
      }),
    )
  }

  useEffect(() => {
    const newFromDate = new Date(
      moment(fromDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(toDate?.toString()).format(commonFormatDate),
    )
    if (fromDate && toDate && newToDate.getTime() < newFromDate.getTime()) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [fromDate, toDate])

  const clearButtonHandler = () => {
    setSelectDate('')
    setFromDate('')
    setToDate('')
    setStatus('')
    setRescheduleStatus('')
    setSearchInput('')
    dispatch(
      reduxServices.sqaAuditReport.getSQAAuditReport({
        endIndex: pageSize * currentPage,
        multiSearch: '',
        startIndex: pageSize * (currentPage - 1),
        SQAAuditSelectionDate: '',
        auditRescheduleStatus: '',
        auditStatus: '',
        from: '',
        to: '',
      }),
    )
  }
  const handleExportSQAAuditData = async () => {
    const sqaAuditReportDownload = await sqaAuditReportApi.exportSqaAuditReport(
      {
        SQAAuditSelectionDate: '',
        auditStatus: '',
        auditRescheduleStatus: '',
        startdate: '',
        enddate: '',
        multiSearch: '',
      },
    )

    downloadFile(sqaAuditReportDownload, 'SQAAuditReport.csv')
  }
  const searchButtonHandler = () => {
    dispatch(
      reduxServices.sqaAuditReport.getSQAAuditReport({
        endIndex: pageSize * currentPage,
        multiSearch: searchInput?.replace(/^\s*/, '') || '',
        startIndex: pageSize * (currentPage - 1),
        SQAAuditSelectionDate: '',
        auditRescheduleStatus: '',
        auditStatus: '',
        from: '',
        to: '',
      }),
    )
  }
  const searchKeyDownButtonHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.sqaAuditReport.getSQAAuditReport({
          endIndex: pageSize * currentPage,
          multiSearch: searchInput?.replace(/^\s*/, '') || '',
          startIndex: pageSize * (currentPage - 1),
          SQAAuditSelectionDate: '',
          auditRescheduleStatus: '',
          auditStatus: '',
          from: '',
          to: '',
        }),
      )
    }
  }
  return (
    <>
      <CRow>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Select :</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            className="pe-2"
            aria-label="Default select example"
            size="sm"
            id="selectDate"
            data-testid="selectDate"
            name="selectDate"
            value={selectDate}
            onChange={(e) => {
              setSelectDate(e.target.value)
              if (!localStorage.getItem('selectDate')) {
                localStorage.setItem('selectDate', e.target.value)
              }
            }}
          >
            <option value={''}>Select Date</option>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="This Week">This Week</option>
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
            <option value="Current Month">Current Month</option>
            <option value="Custom">Custom</option>
          </CFormSelect>
        </CCol>

        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Status :</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="status"
            data-testid="status"
            name="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              if (!localStorage.getItem('status')) {
                localStorage.setItem('status', e.target.value)
              }
            }}
          >
            <option value={''}>Select Status</option>
            <option value="open">Open</option>
            <option value="Closed">Closed</option>
          </CFormSelect>
        </CCol>
        <CCol sm={4}>
          <CRow>
            <CCol sm={3} lg={3} className="text-end">
              <CFormLabel className="mt-1">Reschedule Status :</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="rescheduleStatus"
                data-testid="rescheduleStatus"
                name="rescheduleStatus"
                value={rescheduleStatus}
                onChange={(e) => {
                  setRescheduleStatus(e.target.value)
                  if (!localStorage.getItem('rescheduleStatus')) {
                    localStorage.setItem('rescheduleStatus', e.target.value)
                  }
                }}
              >
                <option value={''}>Select Reschedule Status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      {selectDate === 'Custom' ? (
        <>
          <CRow>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-2">
                From :
                {(fromDate == null || fromDate === '') && (
                  <span className="text-danger">*</span>
                )}
              </CFormLabel>
            </CCol>
            <CCol sm={2}>
              <ReactDatePicker
                id="fromDate"
                data-testid="ticketReportFromDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                autoComplete="off"
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yyyy"
                name="fromDate"
                maxDate={disableAfterDate}
                value={fromDateValue}
                onChange={(date: Date) =>
                  setFromDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-2">
                To :
                {(toDate == null || toDate === '') && (
                  <span className="text-danger">*</span>
                )}
              </CFormLabel>
            </CCol>
            <CCol sm={2}>
              <ReactDatePicker
                id="toDate"
                data-testid="leaveApprovalFromDate"
                className="form-control form-control-sm sh-date-picker "
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                autoComplete="off"
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yyyy"
                name="toDate"
                value={toDateValue}
                onChange={(date: Date) =>
                  setToDate(moment(date).format(commonFormatDate))
                }
                maxDate={disableAfterDate}
              />
            </CCol>
          </CRow>
          {dateError && (
            <CRow className="mt-2">
              <CCol sm={{ span: 6, offset: 4 }}>
                <span className="text-danger">
                  <b>To date should be greater than From date</b>
                </span>
              </CCol>
            </CRow>
          )}
        </>
      ) : (
        <></>
      )}
      <CRow className="mt-3 mb-4">
        <CCol sm={{ span: 6, offset: 3 }}>
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            onClick={viewButtonHandler}
            disabled={
              (selectDate === 'Custom' &&
                !(fromDate !== '' && toDate !== '')) ||
              dateError
            }
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
        <CCol xs={3} className="d-md-flex justify-content-md-end">
          <CButton color="info btn-ovh me-1" onClick={handleExportSQAAuditData}>
            <i className="fa fa-plus me-1"></i>Click to Export
          </CButton>
          {userAccessSqaAuditReport?.createaccess && (
            <Link to={`/addAuditForm`}>
              <CButton color="info btn-ovh me-0">
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            </Link>
          )}
        </CCol>
      </CRow>
      <CRow className="gap-2 d-md-flex justify-content-md-end">
        <CCol sm={6} md={4} lg={5} xl={4} xxl={3}>
          <CInputGroup className="global-search me-0">
            <CFormInput
              data-testid="searchField"
              placeholder="Multiple Search"
              aria-label="Multiple Search"
              aria-describedby="button-addon2"
              value={searchInput?.replace(/^\s*/, '')}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
              onKeyDown={searchKeyDownButtonHandler}
            />
            <CButton
              disabled={!searchInput?.replace(/^\s*/, '')}
              data-testid="multi-search-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              onClick={searchButtonHandler}
            >
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
      <SQAAuditReportTable
        paginationRange={paginationRange}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  )
}

export default SQAAuditReportFilterOptions
