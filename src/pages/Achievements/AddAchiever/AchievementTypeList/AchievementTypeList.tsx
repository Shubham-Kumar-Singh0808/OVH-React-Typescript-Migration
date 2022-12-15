import { CButton, CCol, CContainer, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import AchievementTypeListEntries from './AchievementTypeListEntries'
import AchievementTypeTable from './AchievementTypeTable'
import {
  NewAchievementStatus,
  OutgoingNewAchievementType,
} from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { useAppDispatch } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'

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

  const [newUserSelectedOrder, setNewUserSelectedOrder] = useState<
    number | undefined
  >(undefined)

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

  const addAchievementClearButtonHandler = () => {
    setNewSelectedAchievementType('')
    setNewUserSelectedOrder(undefined)
    setNewUserSelectedStatus(NewAchievementStatus.Active)
    setNewUserSelectedTimeReq(false)
    setNewUserSelectedDateReq(false)
  }

  const addAchievementButtonHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    if (newUserSelectedOrder === null || !newUserSelectedOrder) {
      return
    }
    const achievementStatus =
      newUserSelectedStatus === NewAchievementStatus.Active ? 'true' : 'false'
    const newAchievementData: OutgoingNewAchievementType = {
      typeName: userNewSelectedAchievementType,
      order: newUserSelectedOrder.toString(),
      status: achievementStatus,
      timeperiodrequired: newUserSelectedTimeReq,
      daterequired: newUserSelectedDateReq,
    }

    console.log(newAchievementData)

    const successToast = (
      <OToast
        toastColor="success"
        toastMessage="Achievement Type Added Successfully"
      />
    )

    const errorToast = (
      <OToast toastColor="danger" toastMessage="Error! Please try again" />
    )

    const result = await dispatch(
      reduxServices.addAchiever.addAchievementTypeThunk(newAchievementData),
    )

    if (
      reduxServices.addAchiever.addAchievementTypeThunk.fulfilled.match(result)
    ) {
      dispatch(reduxServices.commonAchievements.getAllAchievementsType())
      dispatch(reduxServices.app.actions.addToast(successToast))
      addAchievementClearButtonHandler()
    } else {
      dispatch(reduxServices.app.actions.addToast(errorToast))
    }
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
        addButtonHandler={addAchievementButtonHandler}
        achievementClearButtonHandler={addAchievementClearButtonHandler}
      />
      <AchievementTypeTable />
    </CContainer>
  )
}

export default AchievementTypeList
