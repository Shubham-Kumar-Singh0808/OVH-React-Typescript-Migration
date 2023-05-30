import React from 'react'
import ChangeAssetFilterOptions from './ChangeAssetFilterOptions'
import OCard from '../../../../components/ReusableComponent/OCard'

const ChangeAssetStatus = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Change Asset Status"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ChangeAssetFilterOptions />
      </OCard>
    </>
  )
}

export default ChangeAssetStatus
