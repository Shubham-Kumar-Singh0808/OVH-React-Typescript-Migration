import { CContainer, CForm } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import AddNomineeForm from './AddNomineeForm'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { selectAchievementType } from '../AchievementConstants'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { IncomingNominationQuestions } from '../../../types/Achievements/NomineeList/NomineeListTypes'

const AddNominee = () => {
  const dispatch = useAppDispatch()

  const [nominatedEmployeeName, setNominatedEmployeeName] = useState<string>()
  const [nominatedAchievementType, setNominatedAchievementType] =
    useState<string>(selectAchievementType)
  const [nomineeQuestions, setNomineeQuestions] = useState<
    IncomingNominationQuestions[]
  >([])

  useEffect(() => {
    dispatch(reduxServices.addAchiever.getActiveEmployeeListThunk())
    dispatch(reduxServices.commonAchievements.getAllAchievementsType())
    dispatch(reduxServices.addNominee.nominationFormDetailsThunk())
  }, [])

  const isLoadingActiveEmployee = useTypedSelector(
    (state) => state.addAchiever.isLoading,
  )
  const isLoadingAchievementType = useTypedSelector(
    (state) => state.commonAchievements.isLoading,
  )
  const isLoadingAddNominee = useTypedSelector(
    (state) => state.addNominee.isLoading,
  )

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Add Nominee"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {isLoadingAchievementType !== ApiLoadingState.loading &&
      isLoadingActiveEmployee !== ApiLoadingState.loading &&
      isLoadingAddNominee !== ApiLoadingState.loading ? (
        <AddNomineeForm
          achievementType={nominatedAchievementType}
          nomineeQuestions={nomineeQuestions}
          setNomineeQuestions={setNomineeQuestions}
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
