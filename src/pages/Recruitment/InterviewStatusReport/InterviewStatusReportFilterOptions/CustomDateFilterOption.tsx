import { CFormLabel, CCol } from '@coreui/react-pro'
import React, { useEffect, useMemo } from 'react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { CandidateDateFilterEnum } from '../../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'
import { commonDateFormat } from '../../../../utils/dateFormatUtils'
import { interchangeMonthAndDay } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { openToDateHandler } from '../../../../utils/datePicketUtils'
import { compareFromAndToDate } from '../../../../constant/constantData'
import OToast from '../../../../components/ReusableComponent/OToast'

const CustomDateFilterOption = () => {
  const dispatch = useAppDispatch()
  const filterOptions = useTypedSelector(
    (state) => state.interviewStatusReport.filterOptions,
  )

  const fromDateValue = useMemo(() => {
    return filterOptions.fromDate ? filterOptions.fromDate : ''
  }, [filterOptions.fromDate])

  const toDateValue = useMemo(() => {
    return filterOptions.toDate ? filterOptions.toDate : ''
  }, [filterOptions.toDate])

  const dateChangeHandler = (date: Date, dateType: CandidateDateFilterEnum) => {
    const finalValue = moment(date).format(commonDateFormat)
    dispatch(
      reduxServices.interviewStatusReport.actions.setDatesInFilter({
        dateType,
        value: interchangeMonthAndDay(finalValue),
      }),
    )
  }

  // used to compare the dates to check if ToDate is more than from date
  useEffect(() => {
    if (compareFromAndToDate(fromDateValue, toDateValue)) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="To Date must be greater than From Date"
          />,
        ),
      )
      dispatch(
        reduxServices.interviewStatusReport.actions.setDatesInFilter({
          dateType: CandidateDateFilterEnum.fromDate,
          value: null,
        }),
      )
      dispatch(
        reduxServices.interviewStatusReport.actions.setDatesInFilter({
          dateType: CandidateDateFilterEnum.toDate,
          value: null,
        }),
      )
    }
  }, [fromDateValue, toDateValue])

  return (
    <div className="d-flex flex-row align-items-center justify-content-start mt-4">
      <CFormLabel className="col-sm-2"></CFormLabel>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row align-items-center mb-2">
          <CCol sm={3}>
            <CFormLabel className="me-2">From:</CFormLabel>
          </CCol>
          <ReactDatePicker
            className="form-control form-control-sm sh-date-picker"
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/mm/yyyy"
            dropdownMode="select"
            maxDate={new Date()}
            value={fromDateValue}
            onChange={(date: Date) =>
              dateChangeHandler(date, CandidateDateFilterEnum.fromDate)
            }
            highlightDates={[{ 'today-date-highlight': [new Date()] }]}
            openToDate={openToDateHandler(
              interchangeMonthAndDay(fromDateValue),
            )}
          />
        </div>
        <div className="d-flex flex-row align-items-center">
          <CCol sm={3}>
            <CFormLabel className="me-2">To:</CFormLabel>
          </CCol>
          <ReactDatePicker
            className="form-control form-control-sm sh-date-picker"
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/mm/yyyy"
            dropdownMode="select"
            value={toDateValue}
            onChange={(date: Date) =>
              dateChangeHandler(date, CandidateDateFilterEnum.toDate)
            }
            maxDate={new Date()}
            openToDate={openToDateHandler(interchangeMonthAndDay(toDateValue))}
            highlightDates={[{ 'today-date-highlight': [new Date()] }]}
          />
        </div>
      </div>
    </div>
  )
}

export default CustomDateFilterOption
