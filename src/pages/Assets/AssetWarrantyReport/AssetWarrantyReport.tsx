import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AssetWarrantyReportTable from './AssetWarrantyReportTable'
import WarrantyDateStatus from './WarrantyDateStatus'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const AssetWarrantyReport = (): JSX.Element => {
  const data = useTypedSelector(
    reduxServices.assetsWarrantyList.selectors.assetsWarrantyList,
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.assetsWarrantyList.getAssetsWarrantyList({
        startIndex: 0,
        endIndex: 20,
        dateSelection: 'Current Month',
        from: '',
        to: '',
      }),
    )
  }, [
    dispatch,
    // selectCurrentPage,
    // pageSize,
    // selectedEmploymentStatus,
    // searchString,
  ])

  console.log(data)
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Warranty Asset Report"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <WarrantyDateStatus />
        <AssetWarrantyReportTable
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </OCard>
    </>
  )
}

export default AssetWarrantyReport
