import React, { useState } from 'react'
import SeparationViewChartFilterOptions from './SeparationViewChartFilterOptions'
import OCard from '../../../../components/ReusableComponent/OCard'

const SeparationViewChart = (): JSX.Element => {
  const [select, setSelect] = useState<string>('')
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Resignation List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <SeparationViewChartFilterOptions
          select={select}
          setSelect={setSelect}
        />
      </OCard>
    </>
  )
}

export default SeparationViewChart
