import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CFormInput,
  CInputGroup,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import EmployeePipListOptions from './EmployeePipListOptions'
import EmployeePipListTable from './EmployeePipListTable'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { deviceLocale, showIsRequired } from '../../../../utils/helper'
import OToast from '../../../../components/ReusableComponent/OToast'
import { UserAccessToFeatures } from '../../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'

const EmployeePipList = ({
  searchInput,
  setSearchInput,
  searchByAdded,
  setSearchByAdded,
  searchByEmployee,
  setSearchByEmployee,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  dateError,
  isMultiSearchBtn,
  toggle,
  setToggle,
  IndividualUserAccess,
  paginationRange,
  setPageSize,
  currentPage,
  pageSize,
  setCurrentPage,
}: {
  searchInput: string
  setSearchInput: React.Dispatch<React.SetStateAction<string>>
  searchByAdded: boolean
  setSearchByAdded: React.Dispatch<React.SetStateAction<boolean>>
  searchByEmployee: boolean
  setSearchByEmployee: React.Dispatch<React.SetStateAction<boolean>>
  fromDate: string | Date
  setFromDate: React.Dispatch<React.SetStateAction<string | Date>>
  toDate: string | Date
  setToDate: React.Dispatch<React.SetStateAction<string | Date>>
  dateError: boolean
  isMultiSearchBtn: boolean
  toggle: string
  setToggle: React.Dispatch<React.SetStateAction<string>>
  IndividualUserAccess: UserAccessToFeatures | undefined
  HierarchyUserAccess: UserAccessToFeatures | undefined
  paginationRange: number[]
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  pageSize: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  // eslint-disable-next-line sonarjs/cognitive-complexity
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const selectCurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  const selectedEmployeePipStatus = useTypedSelector(
    reduxServices.pipList.selectors.selectedEmployeePipStatus,
  )
  const getPIPValue = useTypedSelector(
    reduxServices.pipList.selectors.getPIPValue,
  )
  const [selectDay, setSelectDay] = useState<string>(getPIPValue as string)

  useEffect(() => {
    dispatch(reduxServices.pipList.getAllPIPList(pipListObj))
  }, [selectCurrentPage, dispatch, pageSize, selectedEmployeePipStatus])

  const failureToast = (
    <OToast toastMessage="Enter Vaild Name !" toastColor="danger" />
  )

  const fromDateValue = fromDate
    ? new Date(fromDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const toDateValue = toDate
    ? new Date(toDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const pipListObj = {
    startIndex: pageSize * (selectCurrentPage - 1),
    endIndex: pageSize * selectCurrentPage,
    selectionStatus: selectedEmployeePipStatus,
    dateSelection: selectDay || '',
    from: fromDateValue || '',
    multiSearch: searchInput,
    searchByAdded,
    searchByEmployee,
    to: toDateValue || '',
  }

  const multiSearchBtnHandler = async () => {
    const searchBtnResultAction = await dispatch(
      reduxServices.pipList.getAllPIPList(pipListObj),
    )

    if (
      reduxServices.pipList.getAllPIPList.fulfilled.match(searchBtnResultAction)
    ) {
      dispatch(reduxServices.pipList.getAllPIPList(pipListObj))
    } else if (
      reduxServices.pipList.getAllPIPList.rejected.match(
        searchBtnResultAction,
      ) &&
      searchBtnResultAction.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(failureToast))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const handleSearchBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(reduxServices.pipList.getAllPIPList(pipListObj))
    }
  }

  const pipListObject = {
    dateSelection: String(selectDay),
    from: fromDateValue || '',
    multiSearch: searchInput,
    searchByAdded,
    searchByEmployee,
    selectionStatus: selectedEmployeePipStatus,
    to: toDateValue || '',
    endIndex: pageSize * currentPage,
    startIndex: pageSize * (currentPage - 1),
  }

  const viewButtonHandler = () => {
    dispatch(reduxServices.pipList.getAllPIPList(pipListObject))
    setCurrentPage(1)
    setPageSize(20)
  }

  const clearButtonHandler = () => {
    setSelectDay('Current Month')
    setFromDate('')
    setToDate('')
    setSearchByEmployee(false)
    setSearchByAdded(false)
    setSearchInput('')
    dispatch(
      reduxServices.pipList.getAllPIPList({
        startIndex: pageSize * (selectCurrentPage - 1),
        endIndex: pageSize * selectCurrentPage,
        selectionStatus: selectedEmployeePipStatus,
        dateSelection: 'Current Month',
        from: fromDateValue || '',
        multiSearch: searchInput,
        searchByAdded,
        searchByEmployee,
        to: toDateValue || '',
      }),
    )
  }

  const disableAfterDate = new Date()
  disableAfterDate.setFullYear(disableAfterDate.getFullYear() + 1)

  useEffect(() => {
    dispatch(reduxServices.pipList.actions.setMonthValue(selectDay))
  }, [selectDay])
  useEffect(() => {
    if (selectDay !== 'Custom') {
      setFromDate('')
      setToDate('')
      setCurrentPage(1)
    }
  }, [selectDay])

  const visibleDate =
    selectDay === 'Custom' ? (
      <>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">
            From:
            <span className={showIsRequired(fromDate as string)}>*</span>
          </CFormLabel>
        </CCol>
        <CCol sm={2}>
          <DatePicker
            className="form-control form-control-sm sh-date-picker"
            data-testid="date-picker"
            placeholderText="dd/mm/yyyy"
            name="fromDate"
            id="fromDate"
            autoComplete="off"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            value={fromDateValue}
            onChange={(date: Date) => {
              dispatch(reduxServices.pipList.actions.setFromDate(date))
              setFromDate(date)
            }}
            selected={fromDate as Date}
          />
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">
            To:
            <span className={showIsRequired(toDate as string)}>*</span>
          </CFormLabel>
        </CCol>
        <CCol sm={2}>
          <DatePicker
            className="form-control form-control-sm sh-date-picker"
            data-testid="date-picker"
            placeholderText="dd/mm/yyyy"
            name="toDate"
            id="toDate"
            autoComplete="off"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            value={toDateValue}
            highlightDates={[{ 'today-date-highlight': [new Date()] }]}
            onChange={(date: Date) => {
              dispatch(reduxServices.pipList.actions.setToDate(date))
              setToDate(date)
            }}
            selected={toDate as Date}
          />
          {dateError && (
            <span className="text-danger" data-testid="errorMessage">
              <b>To date should be greater than From date</b>
            </span>
          )}
        </CCol>
      </>
    ) : (
      <></>
    )
  return (
    <>
      {toggle === '' && (
        <>
          {IndividualUserAccess?.viewaccess ? (
            ''
          ) : (
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
                  value={selectDay}
                  onChange={(e) => {
                    dispatch(
                      reduxServices.pipList.actions.setMonthValue(
                        e.target.value,
                      ),
                    )
                    setSelectDay(e.target.value)
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
              <CCol sm={12} md={9}>
                <EmployeePipListOptions
                  paginationRange={paginationRange}
                  setPageSize={setPageSize}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  fromDate={fromDate}
                  toDate={toDate}
                  searchInput={searchInput}
                  searchByAdded={searchByAdded}
                  searchByEmployee={searchByEmployee}
                  setToggle={setToggle}
                  setFromDate={setFromDate}
                  setToDate={setToDate}
                  selectDay={selectDay}
                />
              </CCol>
              {visibleDate}
            </CRow>
          )}

          {IndividualUserAccess?.viewaccess ? (
            ''
          ) : (
            <CRow className="mt-4 mb-4">
              <CCol sm={9} md={{ offset: 3 }}>
                <CButton
                  className="cursor-pointer"
                  color="success btn-ovh me-1"
                  data-testid="view-btn"
                  onClick={viewButtonHandler}
                  disabled={
                    (selectDay === 'Custom' &&
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
                  onClick={clearButtonHandler}
                >
                  Clear
                </CButton>
              </CCol>
            </CRow>
          )}
          {IndividualUserAccess?.viewaccess ? (
            ''
          ) : (
            <CRow className="justify-content-end">
              <CCol sm={3}>
                <label className="search_emp">
                  <CFormCheck
                    className="pt-2"
                    data-testid="ch-searchByEmployee"
                    id="searchByEmployee"
                    name="searchByEmployee"
                    checked={searchByEmployee}
                    onChange={(e) => setSearchByEmployee(e.target.checked)}
                  />
                  <b>Search by Employee Name</b>
                </label>
                <label className="search_emp">
                  <CFormCheck
                    className="pt-2"
                    data-testid="ch-searchByAdded"
                    id="searchByAdded"
                    name="searchByAdded"
                    checked={searchByAdded}
                    onChange={(e) => setSearchByAdded(e.target.checked)}
                  />
                  <b>Search by Added by Name</b>
                </label>
              </CCol>
            </CRow>
          )}

          {IndividualUserAccess?.viewaccess ? (
            ''
          ) : (
            <CRow className="gap-2 d-md-flex justify-content-md-end">
              <CCol sm={3} md={3}>
                <CInputGroup className="global-search me-0">
                  <CFormInput
                    disabled={!isMultiSearchBtn}
                    data-testid="searchField"
                    placeholder="Employee Search"
                    aria-label="Multiple Search"
                    aria-describedby="button-addon2"
                    value={searchInput?.replace(/^\s*/, '')}
                    onChange={(e) => {
                      setSearchInput(e.target.value)
                    }}
                    onKeyDown={handleSearchBtn}
                  />
                  <CButton
                    disabled={!searchInput?.replace(/^\s*/, '')}
                    data-testid="multi-search-btn"
                    className="cursor-pointer"
                    type="button"
                    color="info"
                    id="button-addon2"
                    onClick={multiSearchBtnHandler}
                  >
                    <i className="fa fa-search"></i>
                  </CButton>
                </CInputGroup>
              </CCol>
            </CRow>
          )}
          <EmployeePipListTable
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
            setToggle={setToggle}
            setFromDate={setFromDate}
            setToDate={setToDate}
            selectDay={''}
          />
        </>
      )}
    </>
  )
}

export default EmployeePipList
