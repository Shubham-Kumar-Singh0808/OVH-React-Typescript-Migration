import { LoadingState } from '../../../commonTypes'

export type AddProjectRequestDetails = {
  bcc: string
  billingContactPerson: string
  billingContactPersonEmail: string
  cc: string
  chelist: Chelist[]
  client: string
  description: string
  domain: string
  enddate: string
  intrnalOrNot: boolean
  managerId: number
  model: string
  platform: string
  projectContactEmail: string
  projectContactPerson: string
  projectName: string
  projectRequestMilestoneDTO: ProjectRequestMilestoneDTO[]
  requiredResources: string
  startdate: string
  status: string
  technology: string
  type: string
}

export type Chelist = {
  answer: string
  answer1?: string
  answer2?: string
  answer3?: string
  checklistId: number
  comments: string
  id: null
  name: string
}

export type ProjectRequestMilestoneDTO = {
  id?: number
  billable: string
  comments: string
  effort: string
  fromDate: string
  milestonePercentage: string
  title: string
  toDate: string
  buttonType?: string
}

export type GetProjectRequestMailIds = {
  id: number
  cc: string
  bcc: string
  createdBy: null
  createdDate: null
}
export enum CheckedQuestionsOptions {
  yes = 'yes',
  no = 'no',
  noAnswer = 'N/A',
}
export type GetProjectRequestState = {
  getProjectRequestMailIds: GetProjectRequestMailIds
  chelist: Chelist[]
  isLoading: LoadingState
}
