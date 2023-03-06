import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { dateFormat } from '../../../../constant/DateFormat'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import {
  LeadershipListDateFiltersEnums,
  LeadershipListQueryParameters,
  LeadershipListStatusFiltersEnums,
} from '../../../../types/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListTypes'
import { emptyString } from '../../AchievementConstants'

const dateFilterList: string[] = [
  String(LeadershipListDateFiltersEnums.currentMonth),
  String(LeadershipListDateFiltersEnums.custom),
  String(LeadershipListDateFiltersEnums.lastMonth),
  String(LeadershipListDateFiltersEnums.lastWeek),
  String(LeadershipListDateFiltersEnums.thisWeek),
  String(LeadershipListDateFiltersEnums.today),
  String(LeadershipListDateFiltersEnums.yesterday),
]

const statusFilterList: string[] = [
  String(LeadershipListStatusFiltersEnums.new),
  String(LeadershipListStatusFiltersEnums.approved),
  String(LeadershipListStatusFiltersEnums.rejected),
]

const formatDate = (date: string): string => {
  if (date === emptyString) {
    return emptyString
  }
  const list = date.split('/')
  const month = list[0]
  list[0] = list[1]
  list[1] = month
  return list.join('/')
}

const compareDates = (fromDate: string, toDate: string) => {
  const fromD = Date.parse(fromDate)
  const toD = Date.parse(toDate)
  return fromD > toD
}

const LeadershipEnrollmentListFilterOptions = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isViewButtonEnabled, setViewButtonEnabled] = useState<boolean>(true)
  const [selectedDateOption, setSelectedDateOption] = useState<string>(
    String(LeadershipListDateFiltersEnums.currentMonth),
  )
  const [fromDate, setFromDate] = useState<string>(emptyString)
  const [toDate, setToDate] = useState<string>(emptyString)

  const [selectedStatusOption, setSelectedStatusOption] = useState<string>(
    String(LeadershipListStatusFiltersEnums.new),
  )
  const [dateErrorMsg, setDateErrorMsg] = useState<boolean>(false)

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(fromDate, dateFormat).format(newDateFormatForIsBefore)
    const end = moment(toDate, dateFormat).format(newDateFormatForIsBefore)

    setDateErrorMsg(moment(end).isBefore(start))
  }, [fromDate, toDate])

  useEffect(() => {
    if (
      selectedDateOption === String(LeadershipListDateFiltersEnums.custom) &&
      (fromDate === emptyString ||
        toDate === emptyString ||
        compareDates(fromDate, toDate))
    ) {
      setViewButtonEnabled(false)
    } else {
      setViewButtonEnabled(true)
    }
  }, [fromDate, toDate, selectedDateOption])

  useEffect(() => {
    if (selectedDateOption !== String(LeadershipListDateFiltersEnums.custom)) {
      setFromDate(emptyString)
      setToDate(emptyString)
    }
  }, [selectedDateOption])

  const dateOptionChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDateOption(e.target.value)
  }

  const statusChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatusOption(e.target.value)
  }

  const viewButtonHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const finalQueries: LeadershipListQueryParameters = {
      dateSelection: selectedDateOption,
      from: formatDate(fromDate),
      statusSelection: selectedStatusOption,
      to: formatDate(toDate),
    }
    dispatch(
      reduxServices.leadershipEnrollmentList.getLeadershipListThunk(
        finalQueries,
      ),
    )
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSelectedDateOption(String(LeadershipListDateFiltersEnums.currentMonth))
    setSelectedStatusOption(String(LeadershipListStatusFiltersEnums.new))
    setFromDate(emptyString)
    setToDate(emptyString)
    const finalQueries: LeadershipListQueryParameters = {
      dateSelection: String(LeadershipListDateFiltersEnums.currentMonth),
      from: emptyString,
      to: emptyString,
      statusSelection: String(LeadershipListStatusFiltersEnums.new),
    }
    dispatch(
      reduxServices.leadershipEnrollmentList.getLeadershipListThunk(
        finalQueries,
      ),
    )
  }

  const fromDateAsterix = fromDate === emptyString ? TextDanger : TextWhite
  const toDateAsterix = toDate === emptyString ? TextDanger : TextWhite

  const onHandleFromDatePicker = (value: Date) => {
    setFromDate(moment(value).format(dateFormat))
  }
  const onHandleToDatePicker = (value: Date) => {
    setToDate(moment(value).format(dateFormat))
  }
  return (
    <CForm onSubmit={viewButtonHandler}>
      <CContainer className="mt-2 ms-2 mb-4">
        <CRow className="justify-content-end">
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel data-testid="date-label" className="mt-2">
              Date:
            </CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              value={selectedDateOption}
              data-testid="date-sel"
              onChange={dateOptionChangeHandler}
            >
              {dateFilterList.map((item, index) => (
                <option key={index} value={item} data-testid="date-opt">
                  {item}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          {selectedDateOption ===
          String(LeadershipListDateFiltersEnums.custom) ? (
            <>
              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-2">From:</CFormLabel>
                <span className={fromDateAsterix}>*</span>
              </CCol>
              <CCol sm={2}>
                <ReactDatePicker
                  placeholderText="dd/mm/yyyy"
                  className="form-control form-control-sm sh-date-picker"
                  value={fromDate}
                  onChange={(date: Date) => onHandleFromDatePicker(date)}
                />
              </CCol>
              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-2">To:</CFormLabel>
                <span className={toDateAsterix}>*</span>
              </CCol>
              <CCol sm={2}>
                <ReactDatePicker
                  placeholderText="dd/mm/yyyy"
                  className="form-control form-control-sm sh-date-picker"
                  value={toDate}
                  onChange={(date: Date) => onHandleToDatePicker(date)}
                />
                <CCol>
                  {dateErrorMsg && (
                    <span className="text-danger" data-testid="errorMessage">
                      <b>To date should be greater than From date</b>
                    </span>
                  )}
                </CCol>
              </CCol>
            </>
          ) : (
            <CCol sm={6}></CCol>
          )}
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel data-testid="status-label" className="mt-2">
              Status:
            </CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              data-testid="status-sel"
              value={selectedStatusOption}
              onChange={statusChangeHandler}
            >
              {statusFilterList.map((item, index) => (
                <option key={index} value={item} data-testid={`status-opt`}>
                  {item}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
      </CContainer>
      <CRow className="mt-4">
        <CFormLabel className="col-form-label category-label col-sm-3 col-form-label text-end"></CFormLabel>
        <CCol sm={4}>
          <CButton
            data-testid="view-btn-id"
            type="submit"
            className="btn-ovh me-1"
            color="success"
            disabled={!isViewButtonEnabled || dateErrorMsg}
          >
            View
          </CButton>
          <CButton
            data-testid="clear-btn-id"
            color="warning"
            onClick={clearButtonHandler}
            className="btn-ovh me-1"
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default LeadershipEnrollmentListFilterOptions
