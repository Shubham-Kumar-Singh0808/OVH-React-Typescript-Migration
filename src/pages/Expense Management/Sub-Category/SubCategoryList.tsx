import React from 'react'
import ExpenseSubCategoryListTable from './SubCategoryListTable'
import AddExpenseSubCategory from './AddNewSubCategory/addSubCategory'
import OCard from '../../../components/ReusableComponent/OCard'

const ExpenseSubCategoryList = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Category"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <AddExpenseSubCategory data-testid="add-expense-category" />
        <ExpenseSubCategoryListTable />
      </OCard>
    </>
  )
}

export default ExpenseSubCategoryList
