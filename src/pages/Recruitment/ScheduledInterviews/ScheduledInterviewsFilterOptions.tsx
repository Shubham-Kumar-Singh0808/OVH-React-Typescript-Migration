import { CCol, CRow, CFormLabel, CButton } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import ScheduledInterviewsTable from './ScheduledInterviewsTable'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const ScheduledInterviewsFilterOptions = (props: {
  selectInterviewStatus: string
  filterByInterviewStatus: string
  setFilterByInterviewStatus: React.Dispatch<React.SetStateAction<string>>
  setSelectInterviewStatus: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const commonFormatDate = 'L'
  const deviceLocale: string =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language
  const [isTheadShow, setIsTheadShow] = useState<boolean>(true)
  const [isViewBtnEnabled, setIsViewBtnEnabled] = useState<boolean>(false)
  const [interviewDateError, setInterviewDateError] = useState<boolean>(false)
  const [filterByMeFromDate, setFilterByMeFromDate] = useState<string>(
    moment(new Date()).clone().startOf('month').format(commonFormatDate),
  )
  const [filterByMeToDate, setFilterByMeToDate] = useState<string>(
    moment(new Date()).clone().endOf('month').format(commonFormatDate),
  )
  const [scheduledInterviewFromDate, setScheduledInterviewFromDate] =
    useState<string>(filterByMeFromDate)
  const [scheduledInterviewToDate, setScheduledInterviewToDate] =
    useState<string>(filterByMeToDate)

  const scheduledCandidatesForEmployeeListSize = useTypedSelector(
    reduxServices.scheduledInterviews.selectors
      .scheduledCandidatesForEmployeeListSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.isLoading,
  )

  const {
    selectInterviewStatus,
    filterByInterviewStatus,
    setFilterByInterviewStatus,
    setSelectInterviewStatus,
  } = props

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(scheduledCandidatesForEmployeeListSize, 20)

  const selectedView = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.selectedView,
  )

  useEffect(() => {
    if (selectedView === 'Me') {
      dispatch(
        reduxServices.scheduledInterviews.getScheduledCandidatesForEmployee({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          fromDate: new Date(filterByMeFromDate).toLocaleDateString(
            deviceLocale,
            {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            },
          ),
          toDate: new Date(filterByMeToDate).toLocaleDateString(deviceLocale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
          status: filterByInterviewStatus,
        }),
      )
    }
  }, [
    filterByMeToDate,
    filterByMeFromDate,
    filterByInterviewStatus,
    selectedView,
    currentPage,
    pageSize,
    dispatch,
  ])

  useEffect(() => {
    if (selectedView === 'Me') {
      if (scheduledInterviewFromDate && scheduledInterviewToDate) {
        setIsViewBtnEnabled(true)
      } else {
        setIsViewBtnEnabled(false)
      }
    }
  }, [selectedView, scheduledInterviewFromDate, scheduledInterviewToDate])

  useEffect(() => {
    const tempFromDate = new Date(
      moment(scheduledInterviewFromDate.toString()).format(commonFormatDate),
    )
    const tempToDate = new Date(
      moment(scheduledInterviewToDate.toString()).format(commonFormatDate),
    )
    if (tempToDate.getTime() < tempFromDate.getTime()) {
      setInterviewDateError(true)
    } else {
      setInterviewDateError(false)
    }
  }, [scheduledInterviewFromDate, scheduledInterviewToDate])

  const viewButtonHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (selectedView === 'Me') {
      setFilterByInterviewStatus(selectInterviewStatus)
      setFilterByMeFromDate(scheduledInterviewFromDate)
      setFilterByMeToDate(scheduledInterviewToDate)
      setIsTheadShow(true)
    }
  }

  const clearButtonHandler = () => {
    if (selectedView === 'Me') {
      setFilterByInterviewStatus('pending')
      setSelectInterviewStatus('pending')
      setScheduledInterviewFromDate('')
      setScheduledInterviewToDate('')
      setIsTheadShow(false)
      dispatch(
        reduxServices.scheduledInterviews.actions.clearScheduledCandidatesForEmployee(),
      )
    }
  }

  return (
    <>
      <CRow className="mt-4">
        <CCol sm={2} md={2} className="text-end">
          <CFormLabel className="mt-1">
            From:
            <span
              className={scheduledInterviewFromDate ? TextWhite : TextDanger}
            >
              *
            </span>
          </CFormLabel>
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
            placeholderText="dd/mm/yy"
            name="scheduledInterviewsFromDate"
            value={
              scheduledInterviewFromDate
                ? new Date(scheduledInterviewFromDate).toLocaleDateString(
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
              setScheduledInterviewFromDate(
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
            <span className={scheduledInterviewToDate ? TextWhite : TextDanger}>
              *
            </span>
          </CFormLabel>
        </CCol>
        <CCol sm={3}>
          <ReactDatePicker
            id="to-date"
            data-testid="scheduledInterviewsToDate"
            className="form-control form-control-sm sh-date-picker"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd/mm/yy"
            placeholderText="dd/mm/yy"
            name="scheduledInterviewsToDate"
            value={
              scheduledInterviewToDate
                ? new Date(scheduledInterviewToDate).toLocaleDateString(
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
              setScheduledInterviewToDate(moment(date).format(commonFormatDate))
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
      <CRow className="mt-3">
        <CCol sm={{ span: 6, offset: 2 }}>
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            disabled={!isViewBtnEnabled || interviewDateError}
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
      {isLoading !== ApiLoadingState.loading ? (
        <ScheduledInterviewsTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
          isTheadShow={isTheadShow}
        />
      ) : (
        <>
          <OLoadingSpinner type={LoadingType.PAGE} />
        </>
      )}
    </>
  )
}

export default ScheduledInterviewsFilterOptions
