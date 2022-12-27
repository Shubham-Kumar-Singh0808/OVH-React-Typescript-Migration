import { MileStonesList } from '../../types/ProjectManagement/Project/ProjectView/MileStone/mileStoneTypes'

export const mockMileStonesList: MileStonesList = {
  size: 22,
  list: [
    {
      id: 1587,
      title: 'JXT-UI Integration May 2019',
      milestoneNumber: 'RB0519MS317006',
      planedDate: '31/05/2019',
      actualDate: '31/05/2019',
      billable: true,
      comments:
        '<span>Below are the associates currently working </span><div><br/><div><ol><li><span>Srinivas Suppala</span></li><li><span>Leela Hari</span></li><li><span>Vasavi Nukarapu</span></li><li><span>Thirupathi Chindam</span></li></ol></div></div>',
      project: 'JXT - UI integration',
      client: 'JXT Global',
      projectId: null,
      isClosed: true,
      milestonePercentage: '100',
      milestonePeopleDTO: null,
      allocatedMilestonePeople: [],
      crId: null,
      crName: null,
      crDuration: null,
      invoiceStatus: true,
      projectType: 'RETAINER',
      effort: null,
      invoiceReopenFlag: false,
      enableReopenFlag: true,
      invoiceExits: null,
      milestoneTypeFlag: null,
      milestoneAmount: null,
      raisedInvoicePercentage: null,
      remainingPercentage: null,
    },
  ],
}
