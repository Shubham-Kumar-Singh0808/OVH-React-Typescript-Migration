import { LoadingState } from '../../commonTypes'

export type AddNewJoineeProps = {
  appliedForLookUp: string
  candidateId: string | number
  candidateName: string
  comments: string
  currentCTC: string
  dateOfJoining: string | undefined | Date
  departmentName: string
  designation: string | number
  employmentType: string
  jobType: string
  sendOfferMessagetoCandidate: boolean
  technology: string | number
}

export type CandidateOfferSliceState = {
  isLoading: LoadingState
}
