import React, { useEffect, useState } from 'react'
import moment from 'moment'
import EmployeePipList from './EmployeePipList'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { dateFormat } from '../../../../constant/DateFormat'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import AddEmployeePipList from '../AddEmployeePipList/AddEmployeePipList'

const PipList = (): JSX.Element => {
  // const currentMonth = 'Current Month'
  // const [selectDate, setSelectDate] = useState<string>(currentMonth)
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchByAdded, setSearchByAdded] = useState<boolean>(false)
  const [searchByEmployee, setSearchByEmployee] = useState<boolean>(false)
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()
  const [dateError, setDateError] = useState<boolean>(false)

  const [isMultiSearchBtn, setIsMultiSearchBtn] = useState(false)
  const [toggle, setToggle] = useState<string>('')

  // const getPIPValue = useTypedSelector(
  //   reduxServices.pipList.selectors.getPIPValue,
  // )
  // const [selectDay, setSelectDay] = useState<string>(getPIPValue as string)

  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   if (localStorage.getItem('fmonth')) {
  //     setSelectDate(localStorage.getItem('fmonth') ?? '')
  //   }
  //   // return () => {
  //   //   localStorage.removeItem('fmonth')
  //   // }
  //   // dispatch(reduxServices.pipList.actions.setMonthValu e(selectDate))
  // }, [selectDate])

  useEffect(() => {
    if (localStorage.getItem('fromMonth')) {
      setFromDate(localStorage.getItem('fromMonth') ?? '')
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('toMonth')) {
      setToDate(localStorage.getItem('toMonth') ?? '')
    }
  }, [])

  useEffect(() => {
    if (searchByAdded || searchByEmployee) {
      setIsMultiSearchBtn(true)
    } else {
      setIsMultiSearchBtn(false)
    }
  }, [searchByEmployee, searchByAdded])

  useEffect(() => {
    if (window.location.pathname === '/PIPList') {
      setToggle('')
    }
  }, [])

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const HierarchyUserAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Hierarchy PIP List',
  )

  const IndividualUserAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Individual PIP List',
  )

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(fromDate, dateFormat).format(newDateFormatForIsBefore)
    const end = moment(toDate, dateFormat).format(newDateFormatForIsBefore)

    setDateError(moment(end).isBefore(start))
    return () => {
      const win = window.location.href
      if (!win.toLowerCase().includes('pip')) {
        localStorage.removeItem('fmonth')
        localStorage.removeItem('fromMonth')
        localStorage.removeItem('toMonth')
      }
    }
  }, [fromDate, toDate])

  const selectCurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  const listSize = useTypedSelector(reduxServices.pipList.selectors.listSize)
  const selectedEmployeePipStatus = useTypedSelector(
    reduxServices.pipList.selectors.selectedEmployeePipStatus,
  )

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

  // const pipListObj = {
  //   startIndex: pageSize * (selectCurrentPage - 1),
  //   endIndex: pageSize * selectCurrentPage,
  //   selectionStatus: selectedEmployeePipStatus,
  //   // dateSelection:
  //   //   (localStorage.getItem('fmonth')
  //   //     ? localStorage.getItem('fmonth')
  //   //     : selectDate) || '',
  //   dateSelection: selectDay || '',
  //   from:
  //     (localStorage.getItem('fromMonth')
  //       ? localStorage.getItem('fromMonth')
  //       : fromDate) || '',
  //   multiSearch: searchInput,
  //   searchByAdded,
  //   searchByEmployee,
  //   to:
  //     (localStorage.getItem('toMonth')
  //       ? localStorage.getItem('toMonth')
  //       : toDate) || '',
  // }

  // useEffect(() => {
  //   if (window.location.pathname === '/PIPList') {
  //     dispatch(reduxServices.pipList.actions.setMonthValue('Current Month'))
  //   }
  // }, [])

  // const isChildPage: boolean =
  // location.split('/')[1] !== 'ViewPIPDetail' ||
  // location !== '/PIPClearnceCerticates' ||
  // location !== '/PIPList'

  // useEffect(() => {
  //   if (location.pathname === '/PIPList' && !getPIPValue) {
  //     dispatch(reduxServices.pipList.actions.setMonthValue('Current Month'))
  //   }
  // }, [dispatch, location.pathname, getPIPValue])

  // useEffect(() => {
  //   if (getPIPValue != null) {
  //     setSelectDay(getPIPValue)
  //   }
  // }, [getPIPValue])

  // useEffect(() => {
  //   dispatch(reduxServices.pipList.actions.setMonthValue(selectDay))
  // }, [selectDay])

  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title={'PIP List'}
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <EmployeePipList
            // selectDate={selectDate}
            // setSelectDate={setSelectDate}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchByAdded={searchByAdded}
            setSearchByAdded={setSearchByAdded}
            searchByEmployee={searchByEmployee}
            setSearchByEmployee={setSearchByEmployee}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            dateError={dateError}
            isMultiSearchBtn={isMultiSearchBtn}
            // currentMonth={currentMonth}
            toggle={toggle}
            setToggle={setToggle}
            HierarchyUserAccess={HierarchyUserAccess}
            IndividualUserAccess={IndividualUserAccess}
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            currentPage={currentPage}
            pageSize={pageSize}
            // pipListObj={pipListObj}
            setCurrentPage={setCurrentPage}
          />
        </OCard>
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
          selectDay={''}
        />
      )}
    </>
  )
}

export default PipList
