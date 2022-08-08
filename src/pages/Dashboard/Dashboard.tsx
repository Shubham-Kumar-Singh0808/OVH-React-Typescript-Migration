import React from 'react'
import OCard from '../../components/ReusableComponent/OCard'
import ViewClientInformation from '../ProjectManagement/Clients/ClientInformation/ViewClientInformation'

const Dashboard = (): JSX.Element => {
  return (
    <>
      {/* <OCard title="Dashboard" CFooterClassName="d-none">
        <h1>Welcome</h1>
      </OCard> */}
      <ViewClientInformation />
    </>
  )
}

export default Dashboard
