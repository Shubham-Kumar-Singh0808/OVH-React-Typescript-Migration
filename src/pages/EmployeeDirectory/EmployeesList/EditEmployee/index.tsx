import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../../middleware/hooks/useSelectedEmployee'

const EditEmployee = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { employeeId } = useParams<{ employeeId?: string }>()

  const [isViewingAnotherEmployee] = useSelectedEmployee()
  const employeeGeneralInformation = useTypedSelector((state) =>
    reduxServices.generalInformation.selectors.selectLoggedInEmployeeData(
      state,
      isViewingAnotherEmployee,
    ),
  )

  useEffect(() => {
    if (employeeId) {
      dispatch(
        reduxServices.generalInformation.getSelectedEmployeeInformation(
          employeeId,
        ),
      )
    }
  }, [dispatch, employeeId])

  console.log(employeeGeneralInformation)

  return (
    <OCard
      className="mb-4"
      title="Edit Employee"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      Edit Employee
    </OCard>
  )
}

export default EditEmployee
