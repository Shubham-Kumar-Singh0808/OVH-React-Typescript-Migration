import React, { useEffect, useState } from 'react'
import SQAAuditReportFilterOptions from './SQAAuditReportFilterOptions'
import OCard from '../../components/ReusableComponent/OCard'
import { reduxServices } from '../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../stateStore'

const SQAAuditReport = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const getFromDateValue = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.getFromDateValue,
  )
  const getToDateValue = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.getToDateValue,
  )

  const getSelectedMonthValue = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.getSelectedMonthValue,
  )

  const [selectDate, setSelectDate] = useState<string>(getSelectedMonthValue)
  const [fromDate, setFromDate] = useState<string>(getFromDateValue as string)
  const [toDate, setToDate] = useState<string>(getToDateValue as string)

  useEffect(() => {
    dispatch(reduxServices.sqaAuditReport.actions.setFromDate(fromDate))
    dispatch(reduxServices.sqaAuditReport.actions.setToDate(toDate))
    dispatch(reduxServices.sqaAuditReport.actions.setMonthValue(selectDate))
  }, [dispatch, fromDate, toDate, selectDate])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="SQA Audit Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <SQAAuditReportFilterOptions
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
        />
      </OCard>
    </>
  )
}

export default SQAAuditReport
