import React, { useState } from 'react'
import ResignationListFilterOptions from './ResignationListFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'

const ResignationList = (): JSX.Element => {
  const [Select, setSelect] = useState<string>('')
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Resignation List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ResignationListFilterOptions Select={Select} setSelect={setSelect} />
      </OCard>
    </>
  )
}

export default ResignationList
