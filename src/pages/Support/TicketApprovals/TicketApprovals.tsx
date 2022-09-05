import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormCheck,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import TicketApprovalsFilterOptions from './TicketApprovalsFilterOptions'
import TicketApprovalsTable from './TicketApprovalsTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const TicketApprovals = (): JSX.Element => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.ticketApprovals.getDepartmentNameList())
  }, [dispatch])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={'Ticket Approvals'}
      CFooterClassName="d-none"
    >
      <TicketApprovalsFilterOptions />
      <CRow className="mt-4">
        <CCol sm={2}>
          <CFormLabel>Tracker:</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="interviewStatus"
            data-testid="interviewStatusSelect"
            name="interviewStatus"
            // value={selectInterviewStatus}
            // onChange={(e) => {
            //   setSelectInterviewStatus(e.target.value)
            // }}
          >
            <option value={'pending'}>Pending</option>
            <option value={'completed'}>Completed</option>
          </CFormSelect>
        </CCol>
        <CCol sm={10} className="d-md-flex justify-content-md-end">
          <CCol sm={2}>
            <CRow>
              <CFormLabel>From:</CFormLabel>
              <ReactDatePicker
                id="from-date"
                data-testid="scheduledCandidatesFromDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yy"
                name="scheduledCandidatesFromDate"
                onChange={(date: Date) => console.log(date)}
              />
            </CRow>
          </CCol>

          <CCol sm={2} className="justify-content-md-end">
            <CRow>
              <CFormLabel>To:</CFormLabel>
              <ReactDatePicker
                id="from-date"
                data-testid="scheduledCandidatesFromDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yy"
                name="scheduledCandidatesFromDate"
                onChange={(date: Date) => console.log(date)}
              />
            </CRow>
          </CCol>
        </CCol>
      </CRow>
      <CRow className="time-in-office-report-options mt-4">
        <CCol md={12}>
          <CButton
            color="info"
            className="text-white btn-ovh pull-right"
            size="sm"
            // onClick={handleExportHiveActivityReport}
          >
            <i className="fa fa-plus me-1"></i>
            Click to Export
          </CButton>
        </CCol>
      </CRow>
      <CRow className="mt-3">
        <CCol sm={{ span: 6, offset: 4 }}>
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            // disabled={!isViewBtnEnabled || candidateDateError}
            // onClick={viewButtonHandler}
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            disabled={false}
            color="warning btn-ovh me-1"
            // onClick={clearButtonHandler}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <div className="d-md-flex justify-content-md-end pull-right">
          <CFormCheck
            inline
            type="checkbox"
            name="internalProject"
            data-testid="internalProject"
            id="internalProject"
            label="Search by Employee Name"
            // onChange={(event) => handleIsInternalStatus(event.target.checked)}
            // checked={params.intrnalOrNot}
          />
        </div>
      </CRow>
      <CRow>
        <div className="d-md-flex justify-content-md-end pull-right">
          <CFormCheck
            inline
            type="checkbox"
            name="internalProject"
            data-testid="internalProject"
            id="internalProject"
            label="Search by Assignee Name"
            // onChange={(event) => handleIsInternalStatus(event.target.checked)}
            // checked={params.intrnalOrNot}
          />
        </div>
      </CRow>
      <CRow className="gap-2 d-md-flex justify-content-md-end">
        <CCol sm={6} md={4} lg={5} xl={4} xxl={3}>
          <CInputGroup className="global-search me-0">
            <CFormInput
              placeholder="Multiple Search"
              aria-label="Multiple Search"
              aria-describedby="search-field"
              data-testid="multi-search-input"
              // value={params.multiSearch}
              // onChange={(event) => handleMultipleSearch(event.target.value)}
            />
            <CButton
              data-testid="multi-search-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="search-field"
              // onClick={viewHandler}
              // disabled={params.multiSearch == null || params.multiSearch === ''}
            >
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
      <TicketApprovalsTable />
    </OCard>
  )
}

export default TicketApprovals
