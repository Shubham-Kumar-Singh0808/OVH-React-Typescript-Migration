import React from 'react'
import SQAAuditReportFilterOptions from './SQAAuditReportFilterOptions'
import OCard from '../../components/ReusableComponent/OCard'

const SQAAuditReport = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="SQA Audit Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <SQAAuditReportFilterOptions />
      </OCard>
    </>
  )
}

export default SQAAuditReport
