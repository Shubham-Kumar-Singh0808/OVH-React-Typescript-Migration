import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AssetListTable from './AssetListTable'
import AssetListFilters from './AssetListFilters'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'

const AssetList = (): JSX.Element => {
  const data1 = useTypedSelector(reduxServices.assetList.selectors.assetList)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(reduxServices.assetList.getAllLookUps())
  }, [dispatch])
  console.log(data1)

  // useEffect(() => {
  //   dispatch(
  //     reduxServices.assetList.getAssetTypeChangeList({
  //       id: 2,
  //     }),
  //   )
  // }, [dispatch])
  // console.log(data)

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Asset List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <AssetListFilters />
        <AssetListTable />
      </OCard>
    </>
  )
}

export default AssetList
