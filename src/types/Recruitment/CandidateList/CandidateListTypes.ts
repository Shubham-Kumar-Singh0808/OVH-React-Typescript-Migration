import React from 'react'
import { ApiLoadingState } from '../../../middleware/api/apiList'

export type CandidateListTableProps = {
  endIndex: number
  searchStr: string
  startIndex: number
}
export type CandidateAppliedForList = {
  id: number
  jobCode: string
  positionVacant: string
  minimumExperience: string
  description: string
  opendDate: string
  expiryDate: null | string
  noOfRequirements: number
  offered: number
  remaining: number
  status: string
}
export type sourceLookUp = {
  sourceName: string
  sourceType: string
  displayOrder: null
  sourceLookUpId: number
}
export type country = {
  id: number
  name: string
  mobileCode: string
  countryCode: string
}
export type CandidateLists = {
  personId: number
  firstName: string
  lastName: string
  middleName: null
  fullName: string
  mobile: string
  phone: null
  email: string
  qualification: null
  dob: string
  skypeId: null
  currentEmployer: string
  currentLocation: null
  createdDate: null
  addressDto: null
  id: null
  experience: string
  skills: string
  appliedFor: CandidateAppliedForList
  sourcelookUp: sourceLookUp
  documentList: []
  skillData: null
  appliedForVacancy: string
  resumePath: null | string
  otherDocumentPath: null
  cadidateInterviewStatus: string
  recruiter: string
  technology: string
  updatedDate: null
  addedDate: null
  countryId: null
  country: country
}

export type CandidateTotalInfo = {
  size: number
  list: CandidateLists[]
}

export enum CandidateListPagesEnum {
  CandidateListLanding = 'Candidate List',
  addCandidate = 'Add New Candidate',
  addTechnology = 'Add New Technology',
}

export interface CandidateListJobVacancies {
  id: number
  jobCode: string
  positionVacant: string
  minimumExperience: string
  description: string | null
  opendDate: string
  expiryDate: string | null
  noOfRequirements: number
  offered: number
  remaining: number
  status: string
}

export interface IncomingAllJobVacanciesList {
  size: number
  list: CandidateListJobVacancies[]
}

export interface GetAllJobVacanciesParams {
  endIndex: number | null
  startIndex: number | null
  status: string | null
  searchJobTitle: string | null
}

export type CandidateListSliceState = {
  isLoading: ApiLoadingState
  listSize: number
  candidateDetails: CandidateLists
  allCandidateDetails: CandidateLists[]
  allCountryDetails: country
  empCountries: country[]
  getAllTechnology: GetAllTechnology[]
  visiblePage: CandidateListPagesEnum
  allJobVacancies: IncomingAllJobVacanciesList
}
export type GetAllTechnology = {
  id: number
  name: string
}
export type TableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  searchInput: string
}

export type viewHandlerProps = {
  candidateStatus: string
  endIndex: number
  selectionCountry: number
  selectionTechnology: string
  startIndex: number
}

export interface CandidateListFilterOptionsProps {
  selectStatus: string
  setSelectStatus: React.Dispatch<React.SetStateAction<string>>
  selectCountry: string
  setSelectCountry: React.Dispatch<React.SetStateAction<string>>
  selectTechnology: string
  setSelectTechnology: React.Dispatch<React.SetStateAction<string>>
  searchInput: string
  setSearchInput: React.Dispatch<React.SetStateAction<string>>
  searchKeyDownButtonHandler: (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void
  viewButtonHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
  clearButtonHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
  searchButtonHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export interface AddEditCandidateTemplateProps {
  firstName: string
  firstNameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  lastName: string
  lastNameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}
