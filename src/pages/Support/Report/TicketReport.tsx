import React, { useEffect, useState } from 'react'
import { CRow } from '@coreui/react-pro'
import TicketReportFilterOptions from './TicketReportFilterOptions'
import TicketReportTable from './TicketReportTable'
import TicketDetails from './TicketDetails'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const TicketReport = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const getDepartmentName = useTypedSelector(
    reduxServices.ticketReport.selectors.getDepartmentName,
  )
  const getDateValue = useTypedSelector(
    reduxServices.ticketReport.selectors.getDateValue,
  )
  const getFromDate = useTypedSelector(
    reduxServices.ticketReport.selectors.getFromDate,
  )
  const getToDate = useTypedSelector(
    reduxServices.ticketReport.selectors.getToDate,
  )
  const [toggle, setToggle] = useState('')
  const [selectDate, setSelectDate] = useState(getDateValue)
  const [fromDate, setFromDate] = useState<string>(getFromDate as string)
  const [toDate, setToDate] = useState<string>(getToDate as string)
  const [selectDepartment, setSelectDepartment] =
    useState<string>(getDepartmentName)

  useEffect(() => {
    dispatch(
      reduxServices.ticketReport.actions.setDepartmentName(selectDepartment),
    )
    dispatch(reduxServices.ticketReport.actions.setDateValue(selectDate))

    dispatch(reduxServices.ticketReport.actions.setFromDate(fromDate))

    dispatch(reduxServices.ticketReport.actions.setToDate(toDate))
  }, [selectDepartment, fromDate, toDate, selectDate])

  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Ticket Reports"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <TicketReportFilterOptions
            selectDate={selectDate}
            fromDate={fromDate}
            toDate={toDate}
            selectDepartment={selectDepartment}
            setSelectDate={setSelectDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
            setSelectDepartment={setSelectDepartment}
          />
          <CRow className="mt-3">
            <TicketReportTable
              setToggle={setToggle}
              selectDate={selectDate}
              toDate={toDate}
              fromDate={fromDate}
            />
          </CRow>
        </OCard>
      )}
      {toggle === 'ticketDetails' && <TicketDetails setToggle={setToggle} />}
    </>
  )
}
export default TicketReport
