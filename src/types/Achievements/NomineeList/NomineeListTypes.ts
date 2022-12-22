import React from 'react'
import { LoadingState, ValidationError } from '../../commonTypes'
import { NomineeCycleListType } from '../commonAchievementTypes'

export interface NominationsListTypes {
  id: number
  employeeId: null
  employeeName: string
  achievementTypeId: null
  achievementType: string
  nominationQuestionDataDtosId: null
  cycleID: null
  cycleName: null
  fromMonth: string
  toMonth: string
  rating: number
  finalComments: null
  nominationStatus: string
  activateFlag: null
  createdBy: string
  createdDate: null
}

export interface IncomingNominationQuestions {
  id: null
  questions: string
  feedBack: string
}

export interface IncomingNomineeDetails {
  id: number
  employeeId: number | null
  employeeName: string
  achievementTypeId: null
  achievementType: string
  nominationQuestionDataDtosId: IncomingNominationQuestions[] | null
  cycleID: null
  cycleName: string | null
  fromMonth: string
  toMonth: string
  rating: number | null
  finalComments: string | null
  nominationStatus: string | null
  activateFlag: null
  createdBy: null | string
  createdDate: null
}

export interface NomineeListInitialState {
  isLoading: LoadingState
  cyclesList: NomineeCycleListType
  nominationsList: NominationsListTypes[]
  nomineeDetails: IncomingNomineeDetails
  error: ValidationError
}

export interface NomineeFilterCycleProps {
  currentCycle: string
  setCurrentCycle: React.Dispatch<React.SetStateAction<string>>
}

export interface NomineeListTableProps {
  setViewNomination: React.Dispatch<React.SetStateAction<boolean>>
}

export interface NomineeListDetailsProps {
  setViewNomination: React.Dispatch<React.SetStateAction<boolean>>
}

export enum nomineeSelectionStatus {
  selectStatus = 'Select Status',
  selected = 'Selected',
  notSelected = 'Not Selected',
}

export enum OutgoingNominationStatus {
  selected = 'SELECTED',
  notSelected = 'NOTSELECTED',
}
