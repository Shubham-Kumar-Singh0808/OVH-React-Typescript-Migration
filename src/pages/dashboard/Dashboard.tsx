import OCard from '../../components/ReusableComponent/OCard'
import React from 'react'
import TestComponent from '../../views/blank/TestComponent'

const Dashboard = (): JSX.Element => {
  return (
    <>
      <OCard title="Dashboard" CFooterClassName="d-none">
        <h1>Welcome</h1>
      </OCard>
    </>
  )
}

export default Dashboard
