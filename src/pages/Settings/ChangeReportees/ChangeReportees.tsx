import React, { useEffect } from 'react'
import ChangeReporteeFilterOptions from './ChangeReporteeFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const ChangeReportees = (): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.changeReportees.getAllReportingManagerAsync())
    dispatch(reduxServices.changeReportees.getAllHRListAsync())
  }, [])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Update Reporting Manger"
        CBodyClassName="ps-0 pe-0 ms-5"
        CFooterClassName="d-none"
      >
        <ChangeReporteeFilterOptions />
      </OCard>
    </>
  )
}

export default ChangeReportees
