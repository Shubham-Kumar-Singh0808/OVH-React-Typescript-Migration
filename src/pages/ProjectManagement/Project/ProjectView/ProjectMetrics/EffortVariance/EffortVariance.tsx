import React from 'react'
import EffortVarianceTable from './EffortVarianceTable'
import OCard from '../../../../../../components/ReusableComponent/OCard'

const EffortVariance = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Effort Variance"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <EffortVarianceTable />
      </OCard>
    </>
  )
}

export default EffortVariance
