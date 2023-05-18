import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import moment from 'moment'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import { dateFormat } from '../../../constant/DateFormat'
import { commonDateFormat } from '../../../utils/dateFormatUtils'

const WarrantyDateStatus = ({
  pageSize,
  currentPage,
  selectDate,
  setSelectDate,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: {
  pageSize: number
  currentPage: number
  selectDate: string
  setSelectDate: React.Dispatch<React.SetStateAction<string>>
  fromDate: string | undefined
  setFromDate: React.Dispatch<React.SetStateAction<string | undefined>>
  toDate: string | undefined
  setToDate: React.Dispatch<React.SetStateAction<string | undefined>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [dateError, setDateError] = useState<boolean>(false)
  const [isAllocateButtonEnabled, setIsAllocateButtonEnabled] = useState(false)
  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(fromDate, dateFormat).format(newDateFormatForIsBefore)
    const end = moment(toDate, dateFormat).format(newDateFormatForIsBefore)

    setDateError(moment(end).isBefore(start))
  }, [fromDate, toDate])

  useEffect(() => {
    if (fromDate && toDate) {
      setIsAllocateButtonEnabled(true)
    } else {
      setIsAllocateButtonEnabled(false)
    }
  }, [fromDate, toDate])
  const viewButtonHandler = () => {
    dispatch(
      reduxServices.assetsWarrantyList.getAssetsWarrantyList({
        dateSelection: selectDate,
        endIndex: 20,
        from: fromDate || '',
        startIndex: 0,
        to: toDate || '',
      }),
    )
  }

  const clearButtonHandler = () => {
    setSelectDate('Current Month')
    setFromDate('')
    setToDate('')
    dispatch(
      reduxServices.assetsWarrantyList.getAssetsWarrantyList({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        dateSelection: 'Current Month',
        from: fromDate || '',
        to: toDate || '',
      }),
    )
  }

  const onHandleFromDate = (value: Date) => {
    setFromDate(moment(value).format(dateFormat))
  }
  const onHandleToDate = (value: Date) => {
    setToDate(moment(value).format(dateFormat))
  }

  return (
    <>
      <CRow className="employeeAllocation-form  mt-4">
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-2">Select:</CFormLabel>
        </CCol>

        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="selectDate"
            data-testid="form-select1"
            name="selectDate"
            value={selectDate}
            onChange={(e) => {
              setSelectDate(e.target.value)
            }}
          >
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="This Week">This Week</option>
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
            <option value="Current Month">Current Month</option>
            <option value="Custom">Custom</option>
          </CFormSelect>
        </CCol>
        {selectDate === 'Custom' ? (
          <>
            <CCol sm={2} md={1} className="text-end">
              {/* <CFormLabel className="mt-1">
                From:
                <span className={showIsRequired(fromDate as string)}>*</span>
              </CFormLabel> */}
              <CFormLabel>
                From:
                {(fromDate == null || fromDate === '') && (
                  <span className="text-danger">*</span>
                )}
              </CFormLabel>
            </CCol>
            <CCol sm={2}>
              <DatePicker
                className="form-control form-control-sm sh-date-picker"
                data-testid="date-picker"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/mm/yy"
                name="fromDate"
                id="fromDate"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={fromDate}
                onChange={(date: Date) => onHandleFromDate(date)}
              />
            </CCol>
            <CCol sm={2} md={1} className="text-end">
              {/* <CFormLabel className="mt-1">To:</CFormLabel> */}
              <CFormLabel>
                To:
                {(toDate == null || toDate === '') && (
                  <span className="text-danger">*</span>
                )}
              </CFormLabel>
            </CCol>
            <CCol sm={2}>
              <DatePicker
                className="form-control form-control-sm sh-date-picker"
                data-testid="date-picker"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/mm/yy"
                name="toDate"
                id="toDate"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={toDate}
                onChange={(date: Date) => onHandleToDate(date)}
                // selected={toDate as Date}
              />
              {dateError && (
                <CCol sm={12} className="mt-1 pt-1">
                  <span className="text-danger fw-bold">
                    To date should be greater than From date
                  </span>
                </CCol>
              )}
            </CCol>
          </>
        ) : (
          <></>
        )}
        <CRow className="mt-4 mb-4">
          <CCol sm={9} md={{ offset: 3 }}>
            {/* <CButton
              className="cursor-pointer"
              color="success btn-ovh me-1"
              data-testid="view-btn"
              onClick={viewButtonHandler}
              disabled={
                (selectDate === 'Custom' &&
                  !(fromDate !== '' && toDate !== '')) ||
                dateError
              }
            >
              View
            </CButton> */}
            <CButton
              className="cursor-pointer"
              color="success btn-ovh me-1"
              data-testid="view-btn"
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
              color="warning btn-ovh me-1"
              data-testid="clear-btn"
              onClick={clearButtonHandler}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </CRow>
    </>
  )
}

export default WarrantyDateStatus
