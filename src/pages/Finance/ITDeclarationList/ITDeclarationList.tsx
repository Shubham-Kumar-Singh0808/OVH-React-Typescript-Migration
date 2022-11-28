import React from 'react'
import FilterOptions from './FilterOptions'
import ITDeclarationListTable from './ITDeclarationListTable'
import OCard from '../../../components/ReusableComponent/OCard'

const ITDeclarationList = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="IT Declaration List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <FilterOptions />
        <ITDeclarationListTable />
      </OCard>
    </>
  )
}

export default ITDeclarationList
