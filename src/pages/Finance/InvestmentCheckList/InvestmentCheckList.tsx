import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import InvestmentCheckListExpandableTable from '../../../types/Finance/InvestmentCheckList/InvestmentCheckListExpandableTable'

const InvestmentCheckList = (): JSX.Element => {
  const [isAccordionItemShow, setIsAccordionItemShow] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  //   const isLoading = useTypedSelector(
  //     reduxServices.investmentCheckList.selectors.isLoading,
  //   )
  useEffect(() => {
    dispatch(reduxServices.investmentCheckList.getSections())
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="InvestmentCheckList"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <InvestmentCheckListExpandableTable
          isAccordionItemShow={isAccordionItemShow}
        />
      </OCard>
    </>
  )
}

export default InvestmentCheckList
