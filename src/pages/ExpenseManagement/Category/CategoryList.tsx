import React from 'react'
import ExpenseCategoryListTable from './CategoryListTable'
import OCard from '../../../components/ReusableComponent/OCard'

const ExpenseCategoryList = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Category"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ExpenseCategoryListTable />
      </OCard>
    </>
  )
}

export default ExpenseCategoryList
