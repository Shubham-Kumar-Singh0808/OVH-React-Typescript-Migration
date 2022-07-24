import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { Technology } from '../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const ScheduledInterviewsFilterOptions = ({
  getTechnologies,
  setSearchValue,
  setFilterByTechnology,
  filterByMeFromDate,
  setFilterByMeFromDate,
  filterByMeToDate,
  setFilterByMeToDate,
  filterByInterviewStatus,
  setFilterByInterviewStatus,
  filterByAllFromDate,
  setFilterByAllFromDate,
  filterByAllToDate,
  setFilterByAllToDate,
  setIsTheadShow,
  setCandidateTheadShow,
  candidateTheadShow,
  handleExportScheduleList,
}: {
  getTechnologies: Technology[]
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  setFilterByTechnology: React.Dispatch<React.SetStateAction<string>>
  setFilterByMeFromDate: React.Dispatch<React.SetStateAction<string>>
  setFilterByMeToDate: React.Dispatch<React.SetStateAction<string>>
  setFilterByInterviewStatus: React.Dispatch<React.SetStateAction<string>>
  setFilterByAllFromDate: React.Dispatch<React.SetStateAction<string>>
  setFilterByAllToDate: React.Dispatch<React.SetStateAction<string>>
  setIsTheadShow: React.Dispatch<React.SetStateAction<boolean>>
  setCandidateTheadShow: React.Dispatch<React.SetStateAction<boolean>>
  filterByInterviewStatus: string
  filterByMeFromDate: string
  filterByMeToDate: string
  filterByAllFromDate: string
  filterByAllToDate: string
  candidateTheadShow: boolean
  handleExportScheduleList: () => void
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectTechnology, setSelectTechnology] = useState<string>('')
  const [interviewDateError, setInterviewDateError] = useState<boolean>(false)
  const [candidateDateError, setCandidateDateError] = useState<boolean>(false)
  const [selectInterviewStatus, setSelectInterviewStatus] = useState<string>(
    filterByInterviewStatus,
  )
  const [scheduledInterviewFromDate, setScheduledInterviewFromDate] =
    useState<string>(filterByMeFromDate)
  const [scheduledInterviewToDate, setScheduledInterviewToDate] =
    useState<string>(filterByMeToDate)
  const [scheduledCandidatesFromDate, setScheduledCandidatesFromDate] =
    useState<string>(filterByAllFromDate)
  const [scheduledCandidatesToDate, setScheduledCandidatesToDate] =
    useState<string>(filterByAllToDate)
  const [isViewBtnEnabled, setIsViewBtnEnabled] = useState<boolean>(false)

  const selectedView = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.selectedView,
  )

  const employeeRole = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeRole,
  )

  const isLoading = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.isLoading,
  )

  const commonFormatDate = 'DD/MM/YYYY'

  const onChangeTechnologyHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectTechnology(e.target.value)
  }

  const handleSelectView = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      reduxServices.scheduledInterviews.actions.setSelectedView(
        event.target.value,
      ),
    )
  }

  const viewButtonHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (selectedView === 'Me') {
      setFilterByInterviewStatus(selectInterviewStatus)
      setFilterByMeFromDate(scheduledInterviewFromDate)
      setFilterByMeToDate(scheduledInterviewToDate)
      setIsTheadShow(true)
    } else {
      setFilterByTechnology(selectTechnology)
      setFilterByAllFromDate(scheduledCandidatesFromDate)
      setFilterByAllToDate(scheduledCandidatesToDate)
      setIsTheadShow(true)
    }
  }

  const clearButtonHandler = () => {
    if (selectedView === 'Me') {
      setFilterByInterviewStatus('pending')
      setSelectInterviewStatus('pending')
      setScheduledInterviewFromDate('')
      setScheduledInterviewToDate('')
      setSearchInput('')
      setIsTheadShow(false)
      dispatch(
        reduxServices.scheduledInterviews.actions.clearScheduledCandidatesForEmployee(),
      )
    } else if (selectedView === 'All') {
      setScheduledCandidatesFromDate('')
      setScheduledCandidatesToDate('')
      setSelectTechnology('')
      setSearchInput('')
      setCandidateTheadShow(false)
      dispatch(
        reduxServices.scheduledInterviews.actions.clearScheduledCandidates(),
      )
    }
  }

  const searchButtonHandlerOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      setSearchValue(searchInput)
    }
  }

  const searchButtonHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSearchValue(searchInput)
  }

  useEffect(() => {
    const tempFromDate = new Date(
      moment(scheduledInterviewFromDate.toString()).format(commonFormatDate),
    )
    const tempToDate = new Date(
      moment(scheduledInterviewToDate.toString()).format(commonFormatDate),
    )
    const newFromDate = new Date(
      moment(scheduledCandidatesFromDate.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(scheduledCandidatesToDate.toString()).format(commonFormatDate),
    )
    if (tempToDate.getTime() < tempFromDate.getTime()) {
      setInterviewDateError(true)
    } else {
      setInterviewDateError(false)
    }
    if (newToDate.getTime() < newFromDate.getTime()) {
      setCandidateDateError(true)
    } else {
      setCandidateDateError(false)
    }
  }, [
    scheduledInterviewFromDate,
    scheduledInterviewToDate,
    scheduledCandidatesFromDate,
    scheduledCandidatesToDate,
  ])

  useEffect(() => {
    if (selectedView === 'Me') {
      if (scheduledInterviewFromDate && scheduledInterviewToDate) {
        setIsViewBtnEnabled(true)
      } else {
        setIsViewBtnEnabled(false)
      }
    } else if (selectedView === 'All') {
      if (scheduledCandidatesFromDate && scheduledCandidatesToDate) {
        setIsViewBtnEnabled(true)
      } else {
        setIsViewBtnEnabled(false)
      }
    }
  }, [
    selectedView,
    scheduledInterviewFromDate,
    scheduledInterviewToDate,
    scheduledCandidatesFromDate,
    scheduledCandidatesToDate,
  ])

  return (
    <>
      <CRow>
        {selectedView === 'Me' ? (
          <>
            <CCol sm={2} md={2} className="text-end">
              <CFormLabel className="mt-1">Interview Status:</CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="interviewStatus"
                data-testid="interviewStatusSelect"
                name="interviewStatus"
                value={selectInterviewStatus}
                onChange={(e) => {
                  setSelectInterviewStatus(e.target.value)
                }}
              >
                <option value={'pending'}>Pending</option>
                <option value={'completed'}>Completed</option>
              </CFormSelect>
            </CCol>
          </>
        ) : (
          <>
            <CCol sm={2} md={2} className="text-end">
              <CFormLabel className="mt-1">Technology:</CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="selectTechnology"
                data-testid="selectTechnology"
                name="selectTechnology"
                value={selectTechnology}
                onChange={onChangeTechnologyHandler}
              >
                <option value={''}>Select Technology</option>
                {getTechnologies
                  .slice()
                  .sort((technology1, technology2) =>
                    technology1.name.localeCompare(technology2.name),
                  )
                  ?.map((certificateItem, index) => (
                    <option key={index} value={certificateItem.name}>
                      {certificateItem.name}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </>
        )}

        {(employeeRole === 'admin' ||
          employeeRole === 'HR' ||
          employeeRole === 'HR Manager') && (
          <CCol sm={6} className="d-md-flex justify-content-md-end ms-5">
            <CFormCheck
              type="radio"
              name="viewOptions"
              value="Me"
              id="Me"
              label="Me"
              inline
              defaultChecked={selectedView === 'Me'}
              onChange={handleSelectView}
            />
            <CFormCheck
              type="radio"
              name="viewOptions"
              value="All"
              id="All"
              label="All"
              inline
              defaultChecked={selectedView === 'All'}
              onChange={handleSelectView}
            />
          </CCol>
        )}
      </CRow>
      {selectedView === 'Me' ? (
        <>
          <CRow className="mt-4">
            <CCol sm={2} md={2} className="text-end">
              <CFormLabel className="mt-1">From:</CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                id="from-date"
                data-testid="scheduledInterviewsFromDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yy"
                name="scheduledInterviewsFromDate"
                value={scheduledInterviewFromDate}
                onChange={(date: Date) =>
                  setScheduledInterviewFromDate(
                    moment(date).format(commonFormatDate),
                  )
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={2} md={2} className="text-end">
              <CFormLabel className="mt-1">To:</CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                id="from-date"
                data-testid="scheduledInterviewsToDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yy"
                name="scheduledInterviewsToDate"
                value={scheduledInterviewToDate}
                onChange={(date: Date) =>
                  setScheduledInterviewToDate(
                    moment(date).format(commonFormatDate),
                  )
                }
              />
            </CCol>
          </CRow>
          {interviewDateError && (
            <CRow className="mt-2">
              <CCol sm={{ span: 6, offset: 2 }}>
                <span className="text-danger">
                  To date should be greater than From date
                </span>
              </CCol>
            </CRow>
          )}
        </>
      ) : (
        <>
          <CRow className="mt-4">
            <CCol sm={2} md={2} className="text-end">
              <CFormLabel className="mt-1">From:</CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                id="from-date"
                data-testid="scheduledCandidatesFromDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yy"
                name="scheduledCandidatesFromDate"
                value={scheduledCandidatesFromDate}
                onChange={(date: Date) =>
                  setScheduledCandidatesFromDate(
                    moment(date).format(commonFormatDate),
                  )
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={2} md={2} className="text-end">
              <CFormLabel className="mt-1">To:</CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                id="from-date"
                data-testid="scheduledCandidatesToDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yy"
                name="scheduledCandidatesToDate"
                value={scheduledCandidatesToDate}
                onChange={(date: Date) =>
                  setScheduledCandidatesToDate(
                    moment(date).format(commonFormatDate),
                  )
                }
              />
            </CCol>
          </CRow>
          {candidateDateError && (
            <CRow className="mt-2">
              <CCol sm={{ span: 6, offset: 2 }}>
                <span className="text-danger">
                  To date should be greater than From date
                </span>
              </CCol>
            </CRow>
          )}
        </>
      )}
      <CRow className="mt-3">
        <CCol sm={{ span: 6, offset: 2 }}>
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            disabled={!isViewBtnEnabled}
            onClick={viewButtonHandler}
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            disabled={false}
            color="warning btn-ovh me-1"
            onClick={clearButtonHandler}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
      {selectedView === 'All' && (
        <>
          <CRow className="mt-3">
            <CCol sm={12} className="d-md-flex justify-content-md-end">
              <CButton
                color="info"
                className="text-decoration-none btn btn-download btn-ovh pull-right"
                size="sm"
                onClick={handleExportScheduleList}
              >
                <i className="fa fa-paperclip me-1"></i>
                Export Schedule List
              </CButton>
            </CCol>
          </CRow>
          {candidateTheadShow && isLoading === ApiLoadingState.succeeded && (
            <CRow className="mt-3">
              <CCol
                sm={{ span: 4, offset: 8 }}
                xs={12}
                md={{ span: 5, offset: 7 }}
                lg={{ span: 4, offset: 8 }}
                className="d-md-flex justify-content-md-end"
              >
                <CInputGroup className="global-search me-0">
                  <CFormInput
                    placeholder="Search by name"
                    aria-label="Search by name"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value)
                    }}
                    onKeyDown={searchButtonHandlerOnKeyDown}
                  />
                  <CButton
                    disabled={false}
                    data-testid="search-btn"
                    className="cursor-pointer"
                    type="button"
                    color="info"
                    id="button-addon"
                    onClick={searchButtonHandler}
                  >
                    <i className="fa fa-search"></i>
                  </CButton>
                </CInputGroup>
              </CCol>
            </CRow>
          )}
        </>
      )}
    </>
  )
}

export default ScheduledInterviewsFilterOptions
