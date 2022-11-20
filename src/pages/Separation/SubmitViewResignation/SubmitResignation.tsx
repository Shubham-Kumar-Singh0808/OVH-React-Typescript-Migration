import React, { useState } from 'react'
import SubmitResignationFilterOptions from './SubmitResignationFilterOptions'
import ResignationView from './ResignationView'
import OCard from '../../../components/ReusableComponent/OCard'

const SubmitResignation = (): JSX.Element => {
  const [primaryReason, setPrimaryReason] = useState<string>('')
  const [toggle, setToggle] = useState('')

  useEffect(() => {
    if (getSeparation?.form?.separationExist) {
      setToggle('')
    }
  }, [getSeparation])

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
            <SubmitResignationFilterOptions
              setToggle={setToggle}
              primaryReason={primaryReason}
              setPrimaryReason={setPrimaryReason}
            />
          </OCard>
        </>
      )}
      {toggle === 'ResignView' && <ResignationView />}
    </>
  )
}

export default SubmitResignation
