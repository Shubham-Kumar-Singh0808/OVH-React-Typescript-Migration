import React from 'react'
import { LoadingState, ValidationError } from '../../commonTypes'
import { IncomingNominationQuestions } from '../NomineeList/NomineeListTypes'

export interface IncomingNominationFormDetails {
  achievementType: null
  achievementTypeId: null | number
  activateFlag: null
  createdBy: null
  createdDate: null
  cycleID: number
  cycleName: string
  employeeId: null | number
  employeeName: null
  finalComments: null
  fromMonth: string
  id: null
  nominationQuestionDataDtosId: IncomingNominationQuestions[]
  nominationStatus: null
  rating: null
  toMonth: string
}

export interface StoreDescription {
  description: string
  isDone: boolean
}

export interface AddNomineeInitialState {
  isLoading: LoadingState
  nominationFormDetails: IncomingNominationFormDetails
  questionsInformation: StoreDescription[]
  error: ValidationError
}

export interface AddNomineeFormProps {
  achievementType: string
  setAchievementType: React.Dispatch<React.SetStateAction<string>>
  nominatedEmployeeName: string
  setNominatedEmployeeName: React.Dispatch<React.SetStateAction<string>>
}
