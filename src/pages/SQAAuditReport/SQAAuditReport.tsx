import React, { useState } from 'react'
import SQAAuditReportFilterOptions from './SQAAuditReportFilterOptions'
import OCard from '../../components/ReusableComponent/OCard'

const SQAAuditReport = (): JSX.Element => {
  const [selectDate, setSelectDate] = useState<string>('')
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')
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
