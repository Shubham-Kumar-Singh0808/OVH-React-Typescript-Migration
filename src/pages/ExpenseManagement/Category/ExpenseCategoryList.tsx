import React, { useEffect } from 'react'
import ExpenseCategoryListTable from './ExpenseCategoryListTable'
import AddExpenseCategory from './AddExpenseCategory/AddExpenseCategory'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const ExpenseCategoryList = (): JSX.Element => {
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Expense Management',
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Category"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <AddExpenseCategory data-testid="add-expense-category" />
        <ExpenseCategoryListTable
          data-testid="expense-category-list-table"
          //userAccess={userAccess}
        />
      </OCard>
    </>
  )
}

export default ExpenseCategoryList
