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
  description: string | null
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

export interface IncomingAllJobVacanciesList {
  size: number
  list: CandidateAppliedForList[]
}

export interface GetAllJobVacanciesParams {
  endIndex: number | null
  startIndex: number | null
  status: string | null
  searchJobTitle: string | null
}

export interface EmployeeListItem {
  id: number
  profilePicPath: string
  firstName: string
  lastName: string
  emailId: string
  designation: string
  fullName: string
}

export interface IncomingCompaniesData {
  companyId: number
  companyName: string
}

export type CandidateListSliceState = {
  isLoading: ApiLoadingState
  listSize: number
  candidateDetails: CandidateLists
  allCandidateDetails: CandidateLists[]
  allCountryDetails: country
  allEmployeeDetailsList: EmployeeListItem[]
  empCountries: country[]
  getAllTechnology: GetAllTechnology[]
  allJobVacancies: IncomingAllJobVacanciesList
  allCompaniesData: IncomingCompaniesData[]
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

export enum CandidateWhatsAppNotificationsRadio {
  yes = 'Yes',
  no = 'No',
}

export enum CandidateSourceType {
  internal = 'Internal',
  external = 'External',
  Others = 'Others',
}

export enum CandidateJobTypeEnum {
  fullTime = 'Full Time',
  partTime = 'Part Time',
}

export interface AddEditCandidateTemplateProps {
  backButtonLink: string
  firstName: string
  firstNameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  lastName: string
  lastNameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  aadharNumber: string
  aadharNumberChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  panNumber: string
  panNumberChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  appliedFor: CandidateAppliedForList
  appliedForChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
  sourceType: string
  sourceTypeChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
  experience: string
  experienceChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  sourceName: string
  setSourceName: React.Dispatch<React.SetStateAction<string>>
  emailId: string
  setEmailId: React.Dispatch<React.SetStateAction<string>>
  emailIdChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  linkedInId: string
  linkedInIdChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  mobileCode: country
  mobileCodeChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
  mobileNumber: string
  mobileNumberChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  dob: string
  setDob: React.Dispatch<React.SetStateAction<string>>
  technology: string
  technologyChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
  ctc: string
  ctcChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  ectc: string
  ectcChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  recruiterName: string
  setRecruiterName: React.Dispatch<React.SetStateAction<string>>
  skills: string
  skillsChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  currentEmployer: string
  setCurrentEmployer: React.Dispatch<React.SetStateAction<string>>
  currentLocation: string
  currentLocationChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  noticePeriod: string
  noticePeriodChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  skypeId: string
  skypeIdChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  jobType: string
  jobTypeChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
  selectCountry: country
  countryChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
  whatsAppNotifications: string
  whatsAppNotificationsChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
  reasonForChange: string
  reasonForChangeHandler: (value: string) => void
  uploadedFileHandler: (element: HTMLInputElement) => void
  showEditor: boolean
  setFinalButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export interface AddNewCandidateDTO {
  notifications: string
  candidateEmail: string
  mobile: string
  countryCode: number
  candidateFirstName: string
  candidateLastName: string
  adhar: string | null
  pan: string | null
  appliedFor: CandidateAppliedForList
  sourceType: string
  sourceName: string
  experience: string
  technology: string
  linkedin: string | null
  dob: string
  recruiter: string | null
  skills: string
  ctc: string
  ectc: string
  currentEmployer: string | null
  currentLocation: string
  np: string
  jobTypeName: string
  skypeId: string | null
  countryId: number
  reason: string
  scheduleFlag: 'no'
  interviewersDTOList: []
  scheduleTime: string
}
