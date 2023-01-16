import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CForm,
  CFormInput,
  CInputGroup,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import EmployeePipListOptions from './EmployeePipListOptions'
import EmployeePipListTable from './EmployeePipListTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { deviceLocale, showIsRequired } from '../../../../utils/helper'
import AddEmployeePipList from '../AddEmployeePipList/AddEmployeePipList'

const EmployeePipList = (): JSX.Element => {
  const [selectDate, setSelectDate] = useState<string>('Current Month')
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchByAdded, setSearchByAdded] = useState<boolean>(false)
  const [searchByEmployee, setSearchByEmployee] = useState<boolean>(false)
  const [fromDate, setFromDate] = useState<Date | string>()
  const [toDate, setToDate] = useState<Date | string>()
  const [dateError, setDateError] = useState<boolean>(false)
  const [toggle, setToggle] = useState<string>('')
  const [isMultiSearchBtn, setIsMultiSearchBtn] = useState(false)

  const dispatch = useAppDispatch()
  const commonFormatDate = 'l'

  const selectCurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  const listSize = useTypedSelector(reduxServices.pipList.selectors.listSize)

  const selectedEmployeePipStatus = useTypedSelector(
    reduxServices.pipList.selectors.selectedEmployeePipStatus,
  )

  useEffect(() => {
    if (searchByAdded || searchByEmployee) {
      setIsMultiSearchBtn(true)
    } else {
      setIsMultiSearchBtn(false)
    }
  }, [searchByEmployee, searchByAdded])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    if (selectCurrentPage) {
      setCurrentPage(selectCurrentPage)
    }
  }, [selectCurrentPage])

  const pipListObj = {
    startIndex: pageSize * (selectCurrentPage - 1),
    endIndex: pageSize * selectCurrentPage,
    selectionStatus: selectedEmployeePipStatus,
    dateSelection: selectDate,
    from: (fromDate as string) || '',
    multiSearch: searchInput,
    searchByAdded,
    searchByEmployee,
    to: (toDate as string) || '',
  }
  useEffect(() => {
    dispatch(reduxServices.pipList.getAllPIPList(pipListObj))
  }, [selectCurrentPage, dispatch, pageSize, selectedEmployeePipStatus])
  const multiSearchBtnHandler = () => {
    dispatch(reduxServices.pipList.getAllPIPList(pipListObj))
  }

  const handleSearchBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.pipList.getAllPIPList({
          startIndex: pageSize * (selectCurrentPage - 1),
          endIndex: pageSize * selectCurrentPage,
          selectionStatus: selectedEmployeePipStatus,
          dateSelection: selectDate,
          from: (fromDate as string) || '',
          multiSearch: searchInput,
          searchByAdded,
          searchByEmployee,
          to: (toDate as string) || '',
        }),
      )
    }
  }
  useEffect(() => {
    const newFromDate = new Date(
      moment(fromDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(toDate?.toString()).format(commonFormatDate),
    )
    if (fromDate && toDate && newToDate.getTime() < newFromDate.getTime()) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [fromDate, toDate])

  const toDateValue = toDate
    ? new Date(toDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const fromDateValue = fromDate
    ? new Date(fromDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title={'PIP List'}
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <CRow className="employeeAllocation-form">
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-2">Select:</CFormLabel>
            </CCol>
            <CCol sm={2}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="Select"
                data-testid="form-select1"
                name="Select"
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
                <option value="Custom">Custom</option>
                <option value="Current Month">Current Month</option>
              </CFormSelect>
            </CCol>
            {selectDate === 'Custom' ? (
              <>
                <CCol sm={2} md={1} className="text-end">
                  <CFormLabel className="mt-1">
                    From:
                    <span className={showIsRequired(fromDate as string)}>
                      *
                    </span>
                  </CFormLabel>
                </CCol>
                <CCol sm={2}>
                  <ReactDatePicker
                    className="form-control form-control-sm sh-date-picker"
                    data-testid="date-picker"
                    placeholderText="dd/mm/yy"
                    name="fromDate"
                    autoComplete="off"
                    id="fromDate"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    value={fromDateValue}
                    onChange={(date: Date) => setFromDate(date)}
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
                  <ReactDatePicker
                    className="form-control form-control-sm sh-date-picker"
                    data-testid="date-picker"
                    placeholderText="dd/mm/yy"
                    name="toDate"
                    id="toDate"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    value={toDateValue}
                    onChange={(date: Date) => setToDate(date)}
                    selected={toDate as Date}
                  />
                  {dateError && (
                    <span className="text-danger" data-testid="errorMessage">
                      To date should be greater than From date
                    </span>
                  )}
                </CCol>
              </>
            ) : (
              <></>
            )}
          </CRow>
          <EmployeePipListOptions
            selectDate={selectDate}
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
            fromDate={fromDate as string}
            toDate={toDate as string}
            searchInput={searchInput}
            searchByAdded={searchByAdded}
            searchByEmployee={searchByEmployee}
            setToggle={setToggle}
          />
          <CRow>
            <CFormCheck
              className="pt-2"
              data-testid="ch-searchByEmployee"
              id="searchByEmployee"
              name="searchByEmployee"
              checked={searchByEmployee}
              onChange={(e) => setSearchByEmployee(e.target.checked)}
            />
            <b>Search by Employee Name</b>
          </CRow>
          <CRow>
            <CFormCheck
              className="pt-2"
              data-testid="ch-searchByAdded"
              id="searchByAdded"
              name="searchByAdded"
              checked={searchByAdded}
              onChange={(e) => setSearchByAdded(e.target.checked)}
            />
            <b>Search by Added by Name</b>
          </CRow>
          <CRow className="gap-2 d-md-flex justify-content-md-end">
            <CCol sm={6} md={4} lg={5} xl={4} xxl={3}>
              <CForm>
                <CInputGroup className="global-search me-0">
                  <CFormInput
                    disabled={!isMultiSearchBtn}
                    placeholder="Employee Search"
                    aria-label="Multiple Search"
                    aria-describedby="button-addon2"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value)
                    }}
                    onKeyDown={handleSearchBtn}
                  />
                  <CButton
                    disabled={!searchInput}
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
              </CForm>
            </CCol>
          </CRow>
          <EmployeePipListTable
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
            selectDate={selectDate}
            setToggle={setToggle}
          />
        </OCard>
      )}
      {toggle === 'addPIP' && (
        <AddEmployeePipList
          pageSize={pageSize}
          searchByAdded={searchByAdded}
          searchByEmployee={searchByEmployee}
          searchInput={searchInput}
          selectDate={selectDate}
          fromDate={fromDate as string}
          toDate={toDate as string}
          setToggle={() => {
            setToggle('')
          }}
        />
      )}
    </>
  )
}

export default EmployeePipList
