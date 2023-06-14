import React from 'react'
import ExpenseSubCategoryListTable from './ExpenseSubCategoryListTable'
import AddExpenseSubCategory from './AddNewSubCategory/AddExpenseSubCategory'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const ExpenseSubCategoryList = (): JSX.Element => {
  // const userAccessToFeatures = useTypedSelector(
  //   reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  // )

  // const userAccess = userAccessToFeatures?.find(
  //   (feature) => feature.name === 'Expense Management' && 'Sub-Category',
  // )
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Sub-Category"
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
