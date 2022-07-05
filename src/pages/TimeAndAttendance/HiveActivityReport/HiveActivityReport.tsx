import React from 'react'
import HiveReportOptions from './HiveReportOptions'
import OCard from '../../../components/ReusableComponent/OCard'

const HiveActivityReport = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Hive Activity Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <HiveReportOptions />
      </OCard>
    </>
  )
}

export default HiveActivityReport
