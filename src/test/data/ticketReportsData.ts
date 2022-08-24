import { GetTicketsReportList } from '../../types/Support/Report/ticketReportTypes'

export const mockTicketReportData: GetTicketsReportList[] = [
  {
    trackerName: 'Issue',
    categoryName: 'pen',
    subCategoryName: 'Android Cable',
    noOfTickets: '3',
    noOfClosedTickets: '0',
    noOfPendingTickets: '2',
    categoryId: 11,
    subCategoryId: 68,
    trackerId: 1,
    status: null,
  },
  {
    trackerName: 'New Request',
    categoryName: 'Accessories',
    subCategoryName: 'IOS Cable',
    noOfTickets: '4',
    noOfClosedTickets: '5',
    noOfPendingTickets: '6',
    categoryId: 11,
    subCategoryId: 69,
    trackerId: 1,
    status: null,
  },
]
