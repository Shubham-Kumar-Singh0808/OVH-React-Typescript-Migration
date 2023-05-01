import React, { useEffect, useState } from 'react'
import moment from 'moment'
import EmployeePipList from './EmployeePipList'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { dateFormat } from '../../../../constant/DateFormat'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import AddEmployeePipList from '../AddEmployeePipList/AddEmployeePipList'

const PipList = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchByAdded, setSearchByAdded] = useState<boolean>(false)
  const [searchByEmployee, setSearchByEmployee] = useState<boolean>(false)
  const [fromDate, setFromDate] = useState<string | Date>()
  const [toDate, setToDate] = useState<string | Date>()
  const [dateError, setDateError] = useState<boolean>(false)

  const [isMultiSearchBtn, setIsMultiSearchBtn] = useState(false)
  const [toggle, setToggle] = useState<string>('')

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
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchByAdded={searchByAdded}
            setSearchByAdded={setSearchByAdded}
            searchByEmployee={searchByEmployee}
            setSearchByEmployee={setSearchByEmployee}
            fromDate={fromDate as string}
            setFromDate={setFromDate}
            toDate={toDate as string}
            setToDate={setToDate}
            dateError={dateError}
            isMultiSearchBtn={isMultiSearchBtn}
            toggle={toggle}
            setToggle={setToggle}
            HierarchyUserAccess={HierarchyUserAccess}
            IndividualUserAccess={IndividualUserAccess}
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            currentPage={currentPage}
            pageSize={pageSize}
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
