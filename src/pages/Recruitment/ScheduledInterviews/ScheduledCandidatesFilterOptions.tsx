import {
  CCol,
  CRow,
  CButton,
  CFormLabel,
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import ScheduledCandidatesTable from './ScheduledCandidatesTable'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import scheduledInterviewsApi from '../../../middleware/api/Recruitment/ScheduledInterviews/ScheduledInterviewsApi'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { downloadFile } from '../../../utils/helper'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const ScheduledCandidatesFilterOptions = (props: {
  filterByTechnology: string
  setFilterByTechnology: React.Dispatch<React.SetStateAction<string>>
  selectTechnology: string
  setSelectTechnology: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const commonFormatDate = 'L'
  const deviceLocale: string =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language
  const [filterBySearchValue, setFilterBySearchValue] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [isViewBtnEnabled, setIsViewBtnEnabled] = useState<boolean>(false)
  const [candidateDateError, setCandidateDateError] = useState<boolean>(false)
  const [candidateTheadShow, setCandidateTheadShow] = useState<boolean>(true)
  const [filterByAllFromDate, setFilterByAllFromDate] = useState<string>(
    moment(new Date()).format(commonFormatDate),
  )
  const [filterByAllToDate, setFilterByAllToDate] = useState<string>(
    moment(new Date()).format(commonFormatDate),
  )
  const [scheduledCandidatesFromDate, setScheduledCandidatesFromDate] =
    useState<string>(filterByAllFromDate)
  const [scheduledCandidatesToDate, setScheduledCandidatesToDate] =
    useState<string>(filterByAllToDate)

  const selectedView = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.selectedView,
  )
  const scheduledCandidatesListSize = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.scheduledCandidatesListSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.isLoading,
  )

  const {
    filterByTechnology,
    setFilterByTechnology,
    selectTechnology,
    setSelectTechnology,
  } = props

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(scheduledCandidatesListSize, 20)

  useEffect(() => {
    if (selectedView === 'All') {
      dispatch(
        reduxServices.scheduledInterviews.getScheduledCandidates({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          fromDate: new Date(filterByAllFromDate).toLocaleDateString(
            deviceLocale,
            {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            },
          ),
          toDate: new Date(filterByAllToDate).toLocaleDateString(deviceLocale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
          search: filterBySearchValue,
          skill: filterByTechnology,
        }),
      )
    }
  }, [
    filterBySearchValue,
    filterByTechnology,
    filterByAllFromDate,
    selectedView,
    currentPage,
    pageSize,
    dispatch,
  ])

  useEffect(() => {
    if (selectedView === 'All') {
      if (scheduledCandidatesFromDate && scheduledCandidatesToDate) {
        setIsViewBtnEnabled(true)
      } else {
        setIsViewBtnEnabled(false)
      }
    }
  }, [selectedView, scheduledCandidatesFromDate, scheduledCandidatesToDate])

  useEffect(() => {
    const newFromDate = new Date(
      moment(scheduledCandidatesFromDate.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(scheduledCandidatesToDate.toString()).format(commonFormatDate),
    )
    if (newToDate.getTime() < newFromDate.getTime()) {
      setCandidateDateError(true)
    } else {
      setCandidateDateError(false)
    }
  }, [scheduledCandidatesFromDate, scheduledCandidatesToDate])

  const viewButtonHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (selectedView === 'All') {
      setFilterByTechnology(selectTechnology)
      setFilterByAllFromDate(scheduledCandidatesFromDate)
      setFilterByAllToDate(scheduledCandidatesToDate)
      setCandidateTheadShow(true)
    }
  }

  const clearButtonHandler = () => {
    if (selectedView === 'All') {
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

  const handleExportScheduleList = async () => {
    const interviewScheduleListDownload =
      await scheduledInterviewsApi.exportScheduledCandidatesList({
        fromDate: new Date(filterByAllFromDate).toLocaleDateString(
          deviceLocale,
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          },
        ),
        toDate: new Date(filterByAllToDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        skill: filterByTechnology,
      })
    downloadFile(interviewScheduleListDownload, 'ScheduledCandidates.csv')
  }

  const searchButtonHandlerOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      setFilterBySearchValue(searchInput)
    }
  }

  const searchButtonHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setFilterBySearchValue(searchInput)
  }

  return (
    <>
      <CRow className="mt-4">
        <CCol sm={2} md={2} className="text-end">
          <CFormLabel className="mt-1">
            From:
            <span
              className={scheduledCandidatesFromDate ? TextWhite : TextDanger}
            >
              *
            </span>
          </CFormLabel>
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
            placeholderText="dd/mm/yy"
            name="scheduledCandidatesFromDate"
            value={
              scheduledCandidatesFromDate
                ? new Date(scheduledCandidatesFromDate).toLocaleDateString(
                    deviceLocale,
                    {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    },
                  )
                : ''
            }
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
          <CFormLabel className="mt-1">
            To:
            <span
              className={scheduledCandidatesToDate ? TextWhite : TextDanger}
            >
              *
            </span>
          </CFormLabel>
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
            placeholderText="dd/mm/yy"
            name="scheduledCandidatesToDate"
            value={
              scheduledCandidatesToDate
                ? new Date(scheduledCandidatesToDate).toLocaleDateString(
                    deviceLocale,
                    {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    },
                  )
                : ''
            }
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
      <CRow className="mt-3">
        <CCol sm={{ span: 6, offset: 2 }}>
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            disabled={!isViewBtnEnabled || candidateDateError}
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
      {isLoading !== ApiLoadingState.loading ? (
        <ScheduledCandidatesTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
          candidateTheadShow={candidateTheadShow}
        />
      ) : (
        <>
          <OLoadingSpinner type={LoadingType.PAGE} />
        </>
      )}
    </>
  )
}

export default ScheduledCandidatesFilterOptions
