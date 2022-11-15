import React from 'react'
import ResignationViewList from './ResignationViewList'
import OCard from '../../../components/ReusableComponent/OCard'

const ResignationView = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee View"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ResignationViewList />
      </OCard>
    </>
  )
}

export default ResignationView
