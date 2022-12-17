import { CButton, CCol, CContainer, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import AchievementTypeListEntries from './AchievementTypeListEntries'
import AchievementTypeTable from './AchievementTypeTable'
import {
  NewAchievementStatus,
  OutgoingNewAchievementType,
  OutgoingUpdateAchievementType,
} from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'
import {
  EditedAchievementDetails,
  emptyString,
  orderRegexValue,
} from '../../AchievementConstants'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const errorToast = (
  <OToast toastColor="danger" toastMessage="Error! Please try again" />
)

const AchievementTypeList = ({
  backButtonHandler,
}: {
  backButtonHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const achievementTypesLength = useTypedSelector(
    (state) => state.commonAchievements.dateSortedList?.size,
  )
  const addAchieverState = useTypedSelector((state) => state.addAchiever)
  const [isAddButtonEnabled, setAddButtonEnabled] = useState<boolean>(false)
  const [userNewSelectedAchievementType, setNewSelectedAchievementType] =
    useState<string>(emptyString)

  const [newUserSelectedStatus, setNewUserSelectedStatus] = useState<string>(
    NewAchievementStatus.Active,
  )

  const [newUserSelectedOrder, setNewUserSelectedOrder] =
    useState<string>(emptyString)

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
    const orderValue = e.target.value.replace(orderRegexValue, '')
    setNewUserSelectedOrder(orderValue)
  }

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
    setNewSelectedAchievementType(emptyString)
    setNewUserSelectedOrder(emptyString)
    setNewUserSelectedStatus(NewAchievementStatus.Active)
    setNewUserSelectedTimeReq(false)
    setNewUserSelectedDateReq(false)
  }

  const addAchievementButtonHandler = async () => {
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
    const successToast = (
      <OToast
        toastColor="success"
        toastMessage="Achievement Type Added Successfully"
      />
    )

    const result = await dispatch(
      reduxServices.addAchiever.addAchievementTypeThunk(newAchievementData),
    )

    if (
      reduxServices.addAchiever.addAchievementTypeThunk.fulfilled.match(result)
    ) {
      dispatch(reduxServices.commonAchievements.getAllAchievementsType())
      dispatch(reduxServices.app.actions.addToast(successToast))
      // addAchievementClearButtonHandler()
    } else {
      dispatch(reduxServices.app.actions.addToast(errorToast))
    }
  }

  const editSaveButtonHandler = async (
    incomingData: EditedAchievementDetails,
  ) => {
    const existingData = addAchieverState.achievementTypeDetails
    if (!existingData) {
      return
    }
    const booleanStatus = incomingData.newStatus === NewAchievementStatus.Active
    const newData: OutgoingUpdateAchievementType = {
      ...existingData,
      status: booleanStatus,
      order: incomingData.newOrder,
    }
    const result = await dispatch(
      reduxServices.addAchiever.updateAchievementTypeDetailsThunk(newData),
    )

    const successToast = (
      <OToast
        toastColor="success"
        toastMessage="Achievement Type Updated Successfully"
      />
    )

    if (
      reduxServices.addAchiever.updateAchievementTypeDetailsThunk.fulfilled.match(
        result,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToast))
      dispatch(reduxServices.commonAchievements.getAllAchievementsType())
    } else {
      dispatch(reduxServices.app.actions.addToast(errorToast))
    }
  }

  const scrollTernary = achievementTypesLength > 15 ? 'custom-scroll' : ''
  const recordStringTernary =
    achievementTypesLength > 0
      ? `Total Records: ${achievementTypesLength}`
      : 'No Records Found...'

  return (
    <CContainer>
      <CRow className="mt-2 justify-content-end text-end">
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
      {addAchieverState.isLoading !== ApiLoadingState.loading ? (
        <>
          <AchievementTypeListEntries
            isAddButtonEnabled={isAddButtonEnabled}
            setAddButtonEnabled={setAddButtonEnabled}
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
          <CCol data-testid="scroll-col" className={scrollTernary}>
            <AchievementTypeTable
              executeSaveButtonHandler={editSaveButtonHandler}
            />
          </CCol>
          <CRow className="mt-3">
            <strong data-testid="tot-rec-num">{recordStringTernary}</strong>
          </CRow>
        </>
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </CContainer>
  )
}

export default AchievementTypeList
