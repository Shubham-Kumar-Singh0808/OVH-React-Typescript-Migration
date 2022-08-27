import React, { useState } from 'react'
import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import TicketReportFilterOptions from './TicketReportFilterOptions'
import TicketReportTable from './TicketReportTable'
import TicketDetails from './TicketDetails'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const TicketReport = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const [selectDate, setSelectDate] = useState('Today')
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')
  const [selectDepartment, setSelectDepartment] = useState<string>('')
  const isLoading = useTypedSelector(
    reduxServices.ticketReport.selectors.isLoading,
  )
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

          {isLoading !== ApiLoadingState.loading ? (
            <>
              <TicketReportTable
                setToggle={setToggle}
                selectDate={selectDate}
                toDate={toDate}
                fromDate={fromDate}
                selectDepartment={selectDepartment}
              />
            </>
          ) : (
            <CCol>
              <CRow className="category-loading-spinner">
                <CSpinner />
              </CRow>
            </CCol>
          )}
        </OCard>
      )}
      {toggle === 'ticketDetails' && <TicketDetails setToggle={setToggle} />}
    </>
  )
}
export default TicketReport
