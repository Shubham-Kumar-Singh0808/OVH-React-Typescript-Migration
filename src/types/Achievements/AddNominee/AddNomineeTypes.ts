import React from 'react'
import { LoadingState } from '../../commonTypes'
import { IncomingNominationQuestions } from '../NomineeList/NomineeListTypes'

export interface IncomingNominationFormDetails {
  achievementType: null
  achievementTypeId: null
  activateFlag: null
  createdBy: null
  createdDate: null
  cycleID: number
  cycleName: string
  employeeId: null
  employeeName: null
  finalComments: null
  fromMonth: string
  id: null
  nominationQuestionDataDtosId: IncomingNominationQuestions[]
  nominationStatus: null
  rating: null
  toMonth: string
}

export interface AddNomineeInitialState {
  isLoading: LoadingState
  nominationFormDetails: IncomingNominationFormDetails
}

export interface AddNomineeFormProps {
  achievementType: string
  setAchievementType: React.Dispatch<React.SetStateAction<string>>
  nominatedEmployeeName: string | undefined
  setNominatedEmployeeName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  nomineeQuestions: IncomingNominationQuestions[]
  setNomineeQuestions: React.Dispatch<
    React.SetStateAction<IncomingNominationQuestions[]>
  >
}
