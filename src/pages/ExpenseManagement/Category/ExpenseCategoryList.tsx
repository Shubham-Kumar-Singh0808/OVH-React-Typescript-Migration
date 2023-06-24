import React from 'react'
import ExpenseCategoryListTable from './ExpenseCategoryListTable'
import AddExpenseCategory from './AddExpenseCategory/AddExpenseCategory'
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
        <AddExpenseCategory data-testid="add-expense-category" />
        <ExpenseCategoryListTable data-testid="expense-category-list-table" />
      </OCard>
    </>
  )
}

export default ExpenseCategoryList
