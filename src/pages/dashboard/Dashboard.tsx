import OCard from '../../components/ReusableComponent/OCard'
import React from 'react'
import TestComponent from '../../views/blank/TestComponent'

const Dashboard = (): JSX.Element => {
  return (
    <>
      <OCard
        className=""
        CHeaderClassName="Basheer"
        title="Title Here"
        CLinkClassName="basheer-link"
      >
        <TestComponent />
      </OCard>
    </>
  )
}

export default Dashboard
