import React, { useEffect, useState } from 'react'
import AddNomineeForm from './AddNomineeForm'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { emptyString, selectAchievementType } from '../AchievementConstants'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { StoreDescription } from '../../../types/Achievements/AddNominee/AddNomineeTypes'

const AddNominee = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [nominatedEmployeeName, setNominatedEmployeeName] =
    useState<string>(emptyString)
  const [nominatedAchievementType, setNominatedAchievementType] =
    useState<string>(selectAchievementType)

  useEffect(() => {
    dispatch(reduxServices.addAchiever.getActiveEmployeeListThunk())
    dispatch(reduxServices.commonAchievements.getAllAchievementsType())
    dispatch(reduxServices.addNominee.nominationFormDetailsThunk())
  }, [])

  const formDetails = useTypedSelector(
    (state) => state.addNominee.nominationFormDetails,
  )

  useEffect(() => {
    if (
      formDetails.nominationQuestionDataDtosId &&
      formDetails.nominationQuestionDataDtosId.length > 0
    ) {
      const newList: StoreDescription[] = []
      const newObj: StoreDescription = { isDone: false, description: '' }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const _ of formDetails.nominationQuestionDataDtosId) {
        newList.push(newObj)
      }
      dispatch(
        reduxServices.addNominee.actions.setQuestionInformationList(newList),
      )
    }
  }, [formDetails.nominationQuestionDataDtosId])

  const isLoadingActiveEmployee = useTypedSelector(
    (state) => state.addAchiever.isLoading,
  )
  const isLoadingAchievementType = useTypedSelector(
    (state) => state.commonAchievements.isLoading,
  )

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Add Nominee"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {isLoadingAchievementType !== ApiLoadingState.loading &&
      isLoadingActiveEmployee !== ApiLoadingState.loading ? (
        <AddNomineeForm
          achievementType={nominatedAchievementType}
          setAchievementType={setNominatedAchievementType}
          nominatedEmployeeName={nominatedEmployeeName}
          setNominatedEmployeeName={setNominatedEmployeeName}
        />
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </OCard>
  )
}

export default AddNominee
