import React from 'react'
import AssetTransactionalListTable from './AssetTransactionalListTable'
import AssetTransactionalListFilter from './AssetTransactionalListFilter'

const AssetTransactionalList = (): JSX.Element => {
  return (
    <>
      <AssetTransactionalListFilter />
      <AssetTransactionalListTable />
    </>
  )
}

export default AssetTransactionalList
