import React from 'react'
import CategoriesList from './ExpenseFormChildComponents/Categories'
import DepartmentList from './ExpenseFormChildComponents/Departments'
import EmployeeList from './ExpenseFormChildComponents/Employee'
import PaymentList from './ExpenseFormChildComponents/PaymentModes'
import ProjectList from './ExpenseFormChildComponents/ProjectName'
import VendorList from './ExpenseFormChildComponents/Vendors'
import OCard from '../../../components/ReusableComponent/OCard'

const ExpenseForm = (): JSX.Element => {
  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Expense Form"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CategoriesList />
      <DepartmentList />
      <EmployeeList />
      <PaymentList />
      <ProjectList />
      <VendorList />
    </OCard>
  )
}

export default ExpenseForm
