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
import { TextDanger } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import {
  LeadershipListDateFiltersEnums,
  LeadershipListQueryParameters,
  LeadershipListStatusFiltersEnums,
} from '../../../types/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListTypes'
import { commonDateFormat } from '../../../utils/dateFormatUtils'
import { emptyString, getFullDateForamatted } from '../AchievementConstants'

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

const LeadershipEnrollmentListFilterOptions = () => {
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

  useEffect(() => {
    if (
      selectedDateOption === String(LeadershipListDateFiltersEnums.custom) &&
      (fromDate === emptyString || toDate === emptyString)
    ) {
      setViewButtonEnabled(false)
    } else {
      setViewButtonEnabled(true)
    }
  }, [fromDate, toDate, selectedDateOption])

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
      from: fromDate,
      to: toDate,
      statusSelection: selectedStatusOption,
    }
    dispatch(
      reduxServices.leadershipEnrollmentList.getLeadershipListThunk(
        finalQueries,
      ),
    )
  }

  return (
    <CForm onSubmit={viewButtonHandler}>
      <CContainer className="mt-2 ms-2 mb-4">
        <CRow className="justify-content-end">
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">Date:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              value={selectedDateOption}
              onChange={dateOptionChangeHandler}
            >
              {dateFilterList.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          {selectedDateOption ===
          String(LeadershipListDateFiltersEnums.custom) ? (
            <>
              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-1">From:</CFormLabel>
                <span className={TextDanger}>*</span>
              </CCol>
              <CCol sm={2}>
                <ReactDatePicker
                  placeholderText="dd/mm/yyyy"
                  className="form-control form-control-sm sh-date-picker"
                  value={getFullDateForamatted(fromDate)}
                  onChange={(date: Date) => {
                    setFromDate(moment(date).format(commonDateFormat))
                  }}
                />
              </CCol>
              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-1">To:</CFormLabel>
                <span className={TextDanger}>*</span>
              </CCol>
              <CCol sm={2}>
                <ReactDatePicker
                  placeholderText="dd/mm/yyyy"
                  className="form-control form-control-sm sh-date-picker"
                  value={getFullDateForamatted(toDate)}
                  onChange={(date: Date) => {
                    setToDate(moment(date).format(commonDateFormat))
                  }}
                />
              </CCol>{' '}
            </>
          ) : (
            <CCol sm={6}></CCol>
          )}
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">Status:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
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
            disabled={!isViewButtonEnabled}
          >
            View
          </CButton>
          <CButton
            data-testid="clear-btn-id"
            color="warning "
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
