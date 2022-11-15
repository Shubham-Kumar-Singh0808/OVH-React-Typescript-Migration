import React, { useState } from 'react'
import SubmitResignationFilterOptions from './SubmitResignationFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import ResignationView from '../ResignationView/ResignationView'

const SubmitResignation = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Submit Resignation"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <SubmitResignationFilterOptions setToggle={setToggle} />
          </OCard>
        </>
      )}
      {toggle === 'ResignView' && <ResignationView />}
    </>
  )
}

export default SubmitResignation
