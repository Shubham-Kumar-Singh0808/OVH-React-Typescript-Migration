import React from 'react'
import { LoadingState } from '../../commonTypes'

export interface IncomingLeadershipListItem {
  id: null
  employeeId: number
  employeeName: string
  leader: boolean
  communicate: boolean
  initiative: boolean
  teamWorker: boolean
  constructiveCriticism: boolean
  helper: boolean
  directlyWorking: boolean
  travelOnsite: boolean
  innovationAndResearch: boolean
  reasonDetails: string
  expectationsExample: string
  status: string
  comments: null | string
  createdDate: string
  updatedDate: null | string
  acceptance: boolean
  designation: string
}

export enum LeadershipListDateFiltersEnums {
  currentMonth = 'Current Month',
  custom = 'Custom',
  lastMonth = 'Last Month',
  lastWeek = 'Last Week',
  thisWeek = 'This Week',
  today = 'Today',
  yesterday = 'Yesterday',
}

export enum LeadershipListStatusFiltersEnums {
  new = 'NEW',
  approved = 'APPROVED',
  rejected = 'REJECTED',
}

export interface LeadershipListQueryParameters {
  dateSelection: string
  from: string
  statusSelection: string
  to: string
}

export interface EnrollmentFormProps {
  setShowLeadershipDetails: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}

export interface ApproveRejectLeadershipQueryParameters {
  comments: string
  id: number | undefined
}

export interface LeadershipDetailsProps {
  setShowLeadershipDetails: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  currentIndex: number
}

export interface LeadershipEnrollmentListInitialState {
  isLoading: LoadingState
  leadershipList: IncomingLeadershipListItem[]
}
