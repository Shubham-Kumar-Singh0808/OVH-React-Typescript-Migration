import { CButton, CCol, CContainer, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import AchievementTypeListEntries from './AchievementTypeListEntries'
import AchievementTypeTable from './AchievementTypeTable'
import { NewAchievementStatus } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { useAppDispatch } from '../../../../stateStore'

const AchievementTypeList = ({
  backButtonHandler,
}: {
  backButtonHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [userNewSelectedAchievementType, setNewSelectedAchievementType] =
    useState<string>('')

  const [newUserSelectedStatus, setNewUserSelectedStatus] = useState<string>(
    NewAchievementStatus.Active,
  )

  const [newUserSelectedOrder, setNewUserSelectedOrder] = useState<number>()

  const [newUserSelectedTimeReq, setNewUserSelectedTimeReq] =
    useState<boolean>(false)

  const [newUserSelectedDateReq, setNewUserSelectedDateReq] =
    useState<boolean>(false)

  const newAchievementTypeNameHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewSelectedAchievementType(e.target.value)
  }

  const newAchievementStatusHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewUserSelectedStatus(e.target.value)
  }

  const newSelectedOrderHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberRegex = /^[0-9\b]+$/
    if (numberRegex.test(e.target.value) && e.target.value.length <= 2) {
      setNewUserSelectedOrder(+e.target.value)
    }
  }

  console.log(newUserSelectedOrder)

  const newSelectedTimeReqHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target
    setNewUserSelectedTimeReq(checked)
  }

  const newSelectedDateReqHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target
    setNewUserSelectedDateReq(checked)
  }

  return (
    <CContainer>
      <CRow className="mt-2 justify-content-end">
        <CCol xs={2} className="px-0">
          <CButton
            color="info"
            data-testid="back-btn"
            className="btn-ovh me-1"
            onClick={backButtonHandler}
          >
            <i className="fa fa-arrow-left me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <AchievementTypeListEntries
        userNewSelectedAchievementType={userNewSelectedAchievementType}
        newAchievementTypeNameHandler={newAchievementTypeNameHandler}
        newUserSelectedStatus={newUserSelectedStatus}
        newAchievementStatusHandler={newAchievementStatusHandler}
        newUserSelectedOrder={newUserSelectedOrder}
        newSelectedOrderHandler={newSelectedOrderHandler}
        newUserSelectedTimeReq={newUserSelectedTimeReq}
        newSelectedTimeReqHandler={newSelectedTimeReqHandler}
        newUserSelectedDateReq={newUserSelectedDateReq}
        newSelectedDateReqHandler={newSelectedDateReqHandler}
      />
      <AchievementTypeTable />
    </CContainer>
  )
}

export default AchievementTypeList
