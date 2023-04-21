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
import moment from 'moment'
import ReactDatePicker from 'react-datepicker'
import EmployeePipListOptions from './EmployeePipListOptions'
import EmployeePipListTable from './EmployeePipListTable'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { showIsRequired } from '../../../../utils/helper'
import AddEmployeePipList from '../AddEmployeePipList/AddEmployeePipList'
import { dateFormat } from '../../../../constant/DateFormat'
import OToast from '../../../../components/ReusableComponent/OToast'
import { UserAccessToFeatures } from '../../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'
import { EmployeePipStatus } from '../../../../types/Performance/PipList/pipListTypes'

const EmployeePipList = ({
  // selectDate,
  // setSelectDate,
  // selectDay,
  // setSelectDay,
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
  // currentMonth,
  toggle,
  setToggle,
  HierarchyUserAccess,
  IndividualUserAccess,
  paginationRange,
  setPageSize,
  currentPage,
  pageSize,
  // pipListObj,
  setCurrentPage,
}: // getPIPValue,
{
  // selectDate: string
  // setSelectDate: React.Dispatch<React.SetStateAction<string>>
  // selectDay: string | undefined
  // setSelectDay: React.Dispatch<React.SetStateAction<string>>
  searchInput: string
  setSearchInput: React.Dispatch<React.SetStateAction<string>>
  searchByAdded: boolean
  setSearchByAdded: React.Dispatch<React.SetStateAction<boolean>>
  searchByEmployee: boolean
  setSearchByEmployee: React.Dispatch<React.SetStateAction<boolean>>
  fromDate: string | undefined
  setFromDate: React.Dispatch<React.SetStateAction<string | undefined>>
  toDate: string | undefined
  setToDate: React.Dispatch<React.SetStateAction<string | undefined>>
  dateError: boolean
  isMultiSearchBtn: boolean
  // currentMonth: string
  toggle: string
  setToggle: React.Dispatch<React.SetStateAction<string>>
  IndividualUserAccess: UserAccessToFeatures | undefined
  HierarchyUserAccess: UserAccessToFeatures | undefined
  paginationRange: number[]
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  pageSize: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  // pipListObj: {
  //   startIndex: number
  //   endIndex: number
  //   selectionStatus: EmployeePipStatus
  //   dateSelection: string
  //   from: string
  //   multiSearch: string
  //   searchByAdded: boolean
  //   searchByEmployee: boolean
  //   to: string
  // }
  // getPIPValue: string | undefined
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

  const pipListObj = {
    startIndex: pageSize * (selectCurrentPage - 1),
    endIndex: pageSize * selectCurrentPage,
    selectionStatus: selectedEmployeePipStatus,
    // dateSelection:
    //   (localStorage.getItem('fmonth')
    //     ? localStorage.getItem('fmonth')
    //     : selectDate) || '',
    dateSelection: selectDay || '',
    from:
      (localStorage.getItem('fromMonth')
        ? localStorage.getItem('fromMonth')
        : fromDate) || '',
    multiSearch: searchInput,
    searchByAdded,
    searchByEmployee,
    to:
      (localStorage.getItem('toMonth')
        ? localStorage.getItem('toMonth')
        : toDate) || '',
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
    from: (fromDate as string) || '',
    multiSearch: searchInput,
    searchByAdded,
    searchByEmployee,
    selectionStatus: selectedEmployeePipStatus,
    to: (toDate as string) || '',
    endIndex: pageSize * currentPage,
    startIndex: pageSize * (currentPage - 1),
  }

  const viewButtonHandler = () => {
    dispatch(reduxServices.pipList.getAllPIPList(pipListObject))
  }

  // const getPIPValue = useTypedSelector(
  //   reduxServices.pipList.selectors.getPIPValue,
  // )

  const clearButtonHandler = () => {
    localStorage.removeItem('fmonth')
    // setSelectDate('Current Month')
    dispatch(reduxServices.pipList.actions.setMonthValue('Current Month'))
    setFromDate('')
    setToDate('')
    setSearchByEmployee(false)
    setSearchByAdded(false)
    setSearchInput('')
    dispatch(reduxServices.pipList.actions.changeSelectedEmployeePipStatus(''))
    dispatch(
      reduxServices.pipList.getAllPIPList({
        startIndex: pageSize * (selectCurrentPage - 1),
        endIndex: pageSize * selectCurrentPage,
        selectionStatus: selectedEmployeePipStatus,
        dateSelection: 'Current Month',
        from: (fromDate as string) || '',
        multiSearch: searchInput,
        searchByAdded,
        searchByEmployee,
        to: (toDate as string) || '',
      }),
    )
  }

  const disableAfterDate = new Date()
  disableAfterDate.setFullYear(disableAfterDate.getFullYear() + 1)

  const onHandleToDatePicker = (value: Date) => {
    setToDate(moment(value).format(dateFormat))
    if (!localStorage.getItem('toMonth')) {
      localStorage.setItem('toMonth', moment(value).format(dateFormat))
    }
  }

  const onHandleFromDatePicker = (value: Date) => {
    setFromDate(moment(value).format(dateFormat))
    if (!localStorage.getItem('fromMonth')) {
      localStorage.setItem('fromMonth', moment(value).format(dateFormat))
    }
  }
  // useEffect(() => {
  //   if (getPIPValue === 'Custom') {
  //     setFromDate('')
  //     setToDate('')
  //   }
  // }, [getPIPValue])

  useEffect(() => {
    if (selectDay === 'Custom') {
      setFromDate('')
      setToDate('')
    }
  }, [selectDay])

  useEffect(() => {
    dispatch(reduxServices.pipList.actions.setMonthValue(selectDay))
  }, [selectDay])

  return (
    <>
      {toggle === '' && (
        <>
          {!IndividualUserAccess?.viewaccess &&
            HierarchyUserAccess?.viewaccess && (
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
                    // value={getPIPValue}
                    value={selectDay}
                    onChange={(e) => {
                      // setSelectDate(e.target.value)
                      // if (!localStorage.getItem('fmonth')) {
                      //   localStorage.setItem('fmonth', e.target.value)
                      // }
                      dispatch(
                        reduxServices.pipList.actions.setMonthValue(
                          e.target.value,
                        ),
                      )
                      setSelectDay(e.target.value)
                      // dispatch(
                      //   reduxServices.pipList.actions.setMonthValue(
                      //     e.target.value,
                      //   ),
                      // )
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
                    // selectDate={selectDate}
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
                    // setSelectDate={setSelectDate}
                    setFromDate={setFromDate}
                    setToDate={setToDate}
                    // getPIPValue={getPIPValue as string}
                    selectDay={selectDay as string}
                  />
                </CCol>
                {selectDay === 'Custom' ? (
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
                        id="fromDate"
                        data-testid="leaveApplyFromDate"
                        className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                        showMonthDropdown
                        showYearDropdown
                        autoComplete="off"
                        dropdownMode="select"
                        dateFormat="dd/mm/yy"
                        placeholderText="dd/mm/yyyy"
                        name="fromDate"
                        maxDate={disableAfterDate}
                        value={fromDate}
                        onChange={(date: Date) => onHandleFromDatePicker(date)}
                      />
                    </CCol>
                    <CCol sm={2} md={1} className="text-end">
                      <CFormLabel className="mt-1">
                        To:
                        <span className={showIsRequired(toDate as string)}>
                          *
                        </span>
                      </CFormLabel>
                    </CCol>
                    <CCol sm={2}>
                      <ReactDatePicker
                        id="toDate"
                        data-testid="leaveApprovalFromDate"
                        className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                        showMonthDropdown
                        autoComplete="off"
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="dd/mm/yy"
                        placeholderText="dd/mm/yyyy"
                        name="toDate"
                        maxDate={disableAfterDate}
                        value={toDate}
                        onChange={(date: Date) => onHandleToDatePicker(date)}
                      />
                      {dateError && (
                        <span
                          className="text-danger"
                          data-testid="errorMessage"
                        >
                          <b>To date should be greater than From date</b>
                        </span>
                      )}
                    </CCol>
                  </>
                ) : (
                  <></>
                )}
              </CRow>
            )}

          {!IndividualUserAccess?.viewaccess &&
            HierarchyUserAccess?.viewaccess && (
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
          {!IndividualUserAccess?.viewaccess &&
            HierarchyUserAccess?.viewaccess && (
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
          {!IndividualUserAccess?.viewaccess &&
            HierarchyUserAccess?.viewaccess && (
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
            // selectDate={selectDate}
            setToggle={setToggle}
            // setSelectDate={setSelectDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
            // getPIPValue={''}
            selectDay={''}
          />
        </>
      )}
      {toggle === 'addPIP' && !IndividualUserAccess?.viewaccess && (
        <AddEmployeePipList
          pageSize={pageSize}
          searchByAdded={searchByAdded}
          searchByEmployee={searchByEmployee}
          searchInput={searchInput}
          // selectDate={selectDate}
          fromDate={fromDate as string}
          toDate={toDate as string}
          setToggle={() => {
            setToggle('')
          }}
          // getPIPValue={getPIPValue as string}
          selectDay={selectDay as string}
        />
      )}
    </>
  )
}

export default EmployeePipList
