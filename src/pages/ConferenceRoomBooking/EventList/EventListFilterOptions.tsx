import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React from 'react'
import ReactDatePicker from 'react-datepicker'

const EventListFilterOptions = (): JSX.Element => {
  // const categoryOptions = [
  //     { label: 'Select Category', value: '' },
  //     { label: 'Working from Home', value: 'Home' },
  //     { label: 'Working from Office', value: 'Office' },
  //     { label: 'External Vendor', value: 'External Vendor' },
  //     { label: 'Employment Contract', value: 'Employment Contract' },
  //   ]

  return (
    <>
      <CRow>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Select:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            size="sm"
            id="selectEvent"
            data-testid="form-select"
            name="selectEvent"
          >
            <option value={''}>Current Month</option>
          </CFormSelect>
        </CCol>

        <CCol sm={7} className="d-md-flex justify-content-md-end">
          <CCol sm={3} className="ticket-from-date-col">
            <CRow>
              <CFormLabel>
                From:
                {/* {(ticketFromDate == null || ticketFromDate === '') && (
                  <span className="text-danger">*</span>
                )} */}
              </CFormLabel>
              <ReactDatePicker
                id="from-date"
                data-testid="ticketsApprovalsFromDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yy"
                name="ticketsFromDate"
                value="xyz"
                onChange={(e) => e?.getDate()}
                // value={
                //   ticketFromDate
                //     ? new Date(ticketFromDate).toLocaleDateString(
                //         deviceLocale,
                //         {
                //           year: 'numeric',
                //           month: '2-digit',
                //           day: '2-digit',
                //         },
                //       )
                //     : ''
                // }
                // onChange={(date: Date) =>
                //   setTicketFromDate(moment(date).format(commonDateFormat))
                // }
              />
            </CRow>
          </CCol>

          <CCol sm={3} className="justify-content-md-end">
            <CRow>
              <CFormLabel>
                To:
                {/* {(ticketToDate == null || ticketToDate === '') && (
                  <span className="text-danger">*</span>
                )} */}
              </CFormLabel>
              <ReactDatePicker
                id="from-date"
                data-testid="ticketsApprovalsToDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yy"
                name="ticketsToDate"
                value="xyz"
                onChange={(e) => e?.getDate()}
                // value={
                //   ticketToDate
                //     ? new Date(ticketToDate).toLocaleDateString(deviceLocale, {
                //         year: 'numeric',
                //         month: '2-digit',
                //         day: '2-digit',
                //       })
                //     : ''
                // }
                // onChange={(date: Date) =>
                //   setTicketToDate(moment(date).format(commonDateFormat))
                // }
              />
              {/* {dateError && (
                <CCol sm={12} className="mt-1 pt-1">
                  <span className="text-danger">
                    To date should be greater than From date
                  </span>
                </CCol>
              )} */}
            </CRow>
          </CCol>
        </CCol>
      </CRow>
    </>
  )
}

export default EventListFilterOptions
