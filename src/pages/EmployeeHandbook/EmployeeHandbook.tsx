import OCard from '../../components/ReusableComponent/OCard'
import React, { useEffect } from 'react'
import HandbookList from './HandbookList'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'

const EmployeeHandbook = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const handbooks = useTypedSelector(
    reduxServices.EmployeeHandbook.selectors.handbookData,
  )

  useEffect(() => {
    dispatch(reduxServices.EmployeeHandbook.getHandbooks())
  })
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Handbook"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <HandbookList handbooks={handbooks} />
      </OCard>
    </>
  )
}

export default EmployeeHandbook
