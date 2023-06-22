import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import CategoriesList from './ExpenseFormChildComponents/Categories'
import DepartmentList from './ExpenseFormChildComponents/Departments'
import EmployeeList from './ExpenseFormChildComponents/Employee'
import PaymentList from './ExpenseFormChildComponents/PaymentModes'
import ProjectList from './ExpenseFormChildComponents/ProjectName'
import VendorList from './ExpenseFormChildComponents/Vendors'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const ExpenseForm = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  // const loggedEmployee = useTypedSelector(
  //   reduxServices.newEvent.selectors.loggedEmployee,
  // )

  const allEmployeesProfiles = useTypedSelector(
    reduxServices.expenseForm.selectors.employeesList,
  )

  //Dispatching the Api's
  useEffect(() => {
    dispatch(reduxServices.expenseForm.getEmpDepartmentsList())
    dispatch(reduxServices.expenseForm.getCurrenciesList())
    dispatch(reduxServices.expenseForm.getCategoriesList())
    dispatch(reduxServices.expenseForm.getPaymentsList())
    dispatch(reduxServices.expenseForm.getCountriesList())
  }, [dispatch])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Expense Form"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CategoriesList />
      <DepartmentList />
      {/* <EmployeeList
        allEmployeesProfiles={allEmployeesProfiles}
        onSelectEmployee={onSelectEmployer}
        shouldReset={resetFields.trainer as boolean}
        employeeAutoCompleteTarget={employeeAutoCompleteTarget}
        setEmployeeAutoCompleteTarget={setEmployeeAutoCompleteTarget}
      /> */}
      <PaymentList />
      {/* <ProjectList /> */}
      <VendorList />
    </OCard>
  )
}

export default ExpenseForm
