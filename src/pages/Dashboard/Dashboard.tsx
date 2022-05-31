import OCard from '../../components/ReusableComponent/OCard'
import React from 'react'
import ShiftConfiguration from '../EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/ShiftConfiguration'

const Dashboard = (): JSX.Element => {
  return (
    <>
      <OCard title="Dashboard" CFooterClassName="d-none">
        <h1>Welcome</h1>
      </OCard>
      <ShiftConfiguration />
    </>
  )
}

export default Dashboard
