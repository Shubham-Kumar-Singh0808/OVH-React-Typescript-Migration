import React, { useEffect } from 'react'
import { toDate } from 'date-fns'
import { useDispatch } from 'react-redux'
import AssetTransactionalListTable from './AssetTransactionalListTable'
import AssetTransactionalListFilter from './AssetTransactionalListFilter'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'

const AssetTransactionalList = (): JSX.Element => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      reduxServices.assetTransactionList.getAssetTransactionList({
        startIndex: 0,
        endIndex: 20,
        dateSelection: '',
        from: '',
        to: '',
      }),
    )
  }, [dispatch])
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
