import React, { useEffect } from 'react'
import InvestmentCheckListTable from './InvestmentCheckListTable'
import { useAppDispatch } from '../../../stateStore'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'

const InvestmentCheckList = (): JSX.Element => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.investmentCheckList.getSections())
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Investment Check List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <InvestmentCheckListTable />
      </OCard>
    </>
  )
}

export default InvestmentCheckList
