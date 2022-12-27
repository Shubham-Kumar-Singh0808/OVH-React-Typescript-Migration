import React from 'react'
import { LoadingState } from '../../commonTypes'

export interface IncomingEmployeeDetails {
  name: string
  duplicate: boolean
  Id: number
}

export interface OutgoingLeadershipForm {
  acceptance: boolean
  communicate: boolean
  constructiveCriticism: boolean
  directlyWorking: boolean
  employeeId: number
  employeeName: string
  expectationsExample: string
  helper: boolean
  initiative: boolean
  innovationAndResearch: boolean
  leader: boolean
  reasonDetails: string
  teamWorker: boolean
  travelOnsite: boolean
}

export enum CheckedQuestionsOptions {
  yes = 'Yes',
  no = 'No',
}

export interface EnrollmentFormProps {
  reasonDetails: string
  setReasonDetails: React.Dispatch<React.SetStateAction<string>>
  setExpectationsExample: React.Dispatch<React.SetStateAction<string>>
  expectationsExample: string
}

export interface FilledLeadershipForm {
  acceptance: null | string
  communicate: null | string
  constructiveCriticism: null | string
  directlyWorking: null | string
  helper: null | string
  initiative: null | string
  innovationAndResearch: null | string
  leader: null | string
  teamWorker: null | string
  travelOnsite: null | string
}

export interface LeadershipEnrollmentFormInitialState {
  isLoading: LoadingState
  employeeDetails: IncomingEmployeeDetails
}
