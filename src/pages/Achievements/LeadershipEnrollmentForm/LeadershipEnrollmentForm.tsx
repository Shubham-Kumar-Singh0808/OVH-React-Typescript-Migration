import React, { useEffect } from 'react'
import EnrollmentForm from './EnrollmentForm'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const LeadershipEnrollmentForm = () => {
  const dispatch = useAppDispatch()
  const isAlreadySubmitted = useTypedSelector(
    (state) => state.leadershipEnrollmentForm.employeeDetails.duplicate,
  )

  useEffect(() => {
    dispatch(reduxServices.leadershipEnrollmentForm.getEmployeeDetailsThunk())
  }, [])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Leadership Registration"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {isAlreadySubmitted ? (
        <h3 className="text-center text-danger">
          Sorry! Your Form is Already Submitted
        </h3>
      ) : (
        <>
          <EnrollmentForm />
        </>
      )}
    </OCard>
  )
}

export default LeadershipEnrollmentForm
