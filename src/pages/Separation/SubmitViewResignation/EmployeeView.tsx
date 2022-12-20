import React, { useEffect, useState } from 'react'
import EmployeeViewFilterOptions from './EmployeeViewFilterOptions'
import SubmitResignation from './SubmitResignation'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const EmployeeView = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const getSeparation = useTypedSelector(
    reduxServices.submitViewResignation.selectors.separationForm,
  )
  useEffect(() => {
    if (getSeparation?.form?.separationExist === false) {
      setToggle('submitResignation')
    }
  }, [getSeparation])
  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Employee View"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <EmployeeViewFilterOptions setToggle={setToggle} />
          </OCard>
        </>
      )}
      {toggle === 'submitResignation' && <SubmitResignation />}
    </>
  )
}

export default EmployeeView
