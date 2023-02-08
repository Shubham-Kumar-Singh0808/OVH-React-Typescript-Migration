import React from 'react'
import ScheduleVarianceTable from './ScheduleVarianceTable'
import OCard from '../../../../../../components/ReusableComponent/OCard'

const ScheduleVariance = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Schedule Variance"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ScheduleVarianceTable />
      </OCard>
    </>
  )
}

export default ScheduleVariance
