import React from 'react'
import { LoadingState } from '../../commonTypes'

export interface AchieverListUserTypes {
  id: number
  achievementTypeId: number
  achievementType: string
  employeeId: number
  employeeName: string
  timePeriod: string
  startDate: string | null
  endDate: string | null
  description: string | null
  profilePicture: string
  thumbPicture: string | null
  showOnDashBoard: boolean
  createdBy: string
  createdDate: string
  updatedBy: string
  updatedDate: string | null
  croppedImageData: null
  timePeriodRequired: null
  dateRequired: null
}

export type AchieverListQueryParameters = {
  achievementTypeId?: string
  dateSelection?: string
  startIndex?: number
  endIndex?: number
  fromMonth?: number
  toMonth?: number
  fromYear?: number
  toYear?: number
}

export type IncomingAchieverListType = {
  list: AchieverListUserTypes[]
  size: number
}
export interface AchievementHistoryTimelineQueryParameters {
  achievementId: number
}

export interface AchievementHistoryTimeline {
  id: null
  employee: string | null
  achievementType: string | null
  timePeriod: string | null
  description: string | null
  startDate: string | null
  endDate: string | null
  showOnDashBoard: string
  profilePicture: string | null
  thumbPicture: string | null
  oldemployee: string | null
  oldachievementType: string | null
  oldtimePeriod: string | null
  olddescription: string | null
  oldstartDate: string | null
  oldendDate: string | null
  oldshowOnDashBoard: string | null
  oldprofilePicture: null
  oldthumbPicture: null
  modifiedDate: string
  modifiedBy: string
  persistType: string
  columnName: null
  additionalInfo: string | null
}

export interface IncomingAchievementHistoryTimelineList {
  size: number
  list: AchievementHistoryTimeline[]
}

export type AchieverListSliceState = {
  currentPage: number
  pageSize: number
  isLoading: LoadingState
  achieverList: IncomingAchieverListType
  achievementHistoryTimeline: IncomingAchievementHistoryTimelineList
  achieverListQueries: AchieverListQueryParameters
}

export type AchieverListTableTypes = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setAchievementTimeline: React.Dispatch<React.SetStateAction<boolean>>
  ToggleTimelineAccess: boolean | undefined
}

export enum SelectMonthOptions {
  currentMonth = 'Current Month',
  lastMonth = 'Last Month',
  customDate = 'Custom Date',
}

export interface AchieverListFilterOptionsProps {
  currentSelectedOption: string
  selectedOptionChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
  currentAchievement: string
  achievementChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
  achieverFromDate: string
  setAchieverFromDate: React.Dispatch<React.SetStateAction<string>>
  achieverToDate: string
  setAchieverToDate: React.Dispatch<React.SetStateAction<string>>
  isViewButtonEnabled: boolean
  setViewButton: React.Dispatch<React.SetStateAction<boolean>>
  clearButtonHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
  filterHandler: (e: React.FormEvent<HTMLFormElement>) => void
}

export interface UpdateShowOnDashboardQueryParameters {
  achievementId: number
  dashBoardStatus: boolean
}
