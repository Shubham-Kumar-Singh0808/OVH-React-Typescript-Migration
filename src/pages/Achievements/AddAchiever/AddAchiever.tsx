import React, { useEffect, useState } from 'react'
import AchievementTypeList from './AchievementTypeList/AchievementTypeList'
import AddAchieverForm from './AddAchieverComponents/AddAchieverForm'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { initialNewAchieverState } from '../AchievementConstants'
import {
  NewAchieverInformation,
  OutgoingNewAchiever,
} from '../../../types/Achievements/AddAchiever/AddAchieverTypes'
import OToast from '../../../components/ReusableComponent/OToast'

const AddAchiever = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [addAchievementTypeButton, setAddAchievementTypeButton] =
    useState<boolean>(false)

  const [isAddNewAchieverButtonEnabled, setAddButton] = useState<boolean>(false)

  const [newAchieverDetails, setNewAchieverDetails] =
    useState<NewAchieverInformation>(initialNewAchieverState)

  const addAchievementTypeButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setAddAchievementTypeButton(true)
  }

  const closeAchievementTypeButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    setAddAchievementTypeButton(false)
  }

  useEffect(() => {
    dispatch(reduxServices.commonAchievements.getAllAchievementsType())
    dispatch(reduxServices.addAchiever.getActiveEmployeeListThunk())
  }, [])

  const clearNewAchieverButtonHandler = () => {
    setNewAchieverDetails(initialNewAchieverState)
    dispatch(reduxServices.addAchiever.actions.clearEmployeeData())
  }

  const addNewAchieverHandler = async (finalData: OutgoingNewAchiever) => {
    const result = await dispatch(
      reduxServices.addAchiever.addAchievementThunk(finalData),
    )

    const successToast = (
      <OToast
        toastColor="success"
        toastMessage="Achievement Added Successfully"
      />
    )

    if (reduxServices.addAchiever.addAchievementThunk.fulfilled.match(result)) {
      dispatch(reduxServices.app.actions.addToast(successToast))
    }
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={
        addAchievementTypeButton ? 'Achievement Type List' : "Add Achiever's"
      }
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {addAchievementTypeButton ? (
        <AchievementTypeList
          backButtonHandler={closeAchievementTypeButtonHandler}
        />
      ) : (
        <AddAchieverForm
          addAchievementTypeButtonHandler={addAchievementTypeButtonHandler}
          newAchieverDetails={newAchieverDetails}
          setNewAchieverDetails={setNewAchieverDetails}
          isAddButtonEnabled={isAddNewAchieverButtonEnabled}
          setAddButton={setAddButton}
          clearInfoButtonHandler={clearNewAchieverButtonHandler}
          addButtonHandler={addNewAchieverHandler}
        />
      )}
    </OCard>
  )
}

export default AddAchiever
