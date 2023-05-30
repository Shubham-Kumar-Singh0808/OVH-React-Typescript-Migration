import React from 'react'
import AssetTransactionalListTable from './AssetTransactionalListTable'
import AssetTransactionalListFilter from './AssetTransactionalListFilter'
import OCard from '../../../components/ReusableComponent/OCard'

const AssetTransactionalList = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Asset Transactional History"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <AssetTransactionalListFilter />
        <AssetTransactionalListTable />
      </OCard>
    </>
  )
}

export default AssetTransactionalList
