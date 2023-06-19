import React from 'react'
import CreditCardListTable from './CreditCardListTable'
import OCard from '../../../components/ReusableComponent/OCard'

const CreditCardList = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Credit Card List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CreditCardListTable />
      </OCard>
    </>
  )
}

export default CreditCardList
