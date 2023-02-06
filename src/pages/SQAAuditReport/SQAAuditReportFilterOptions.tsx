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

  useEffect(() => {
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
        startdate: undefined,
        enddate: undefined,
        multiSearch: '',
      },
    )

    downloadFile(sqaAuditReportDownload, 'SQAAuditReport.csv')
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
            onChange={(e) => setSelectDate(e.target.value)}
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
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value={''}>Select Status</option>
            <option value="open">open</option>
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
                onChange={(e) => setRescheduleStatus(e.target.value)}
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
              <CFormLabel>
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
                className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yy"
                name="fromDate"
                value={fromDateValue}
                onChange={(date: Date) =>
                  setFromDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel>
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
                className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yy"
                name="toDate"
                value={toDateValue}
                onChange={(date: Date) =>
                  setToDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
          </CRow>
          {dateError && (
            <CRow className="mt-2">
              <CCol sm={{ span: 6, offset: 4 }}>
                <span className="text-danger">
                  To date should be greater than From date
                </span>
              </CCol>
            </CRow>
          )}
        </>
      ) : (
        <></>
      )}
      <CRow className="mt-5 mb-4">
        <CCol sm={{ span: 6, offset: 3 }}>
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            onClick={viewButtonHandler}
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
          <CButton color="info btn-ovh me-0">
            <i className="fa fa-plus me-1"></i>Add
          </CButton>
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
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
              onKeyDown={viewButtonHandler}
            />
            <CButton
              disabled={!searchInput}
              data-testid="multi-search-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              onClick={viewButtonHandler}
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
