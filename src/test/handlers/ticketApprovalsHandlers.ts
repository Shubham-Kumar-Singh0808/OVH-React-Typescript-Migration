import { rest } from 'msw'
import { ticketApprovalsApiConfig } from '../../middleware/api/apiList'
import {
  mockAllLookUps,
  mockAllTicketApprovals,
  mockCategoryList,
  mockDepartmentNamesList,
  mockSubCategoryList,
  mockTrackerList,
} from '../data/ticketApprovalsData'

export const ticketApprovalsHandlers = [
  // getDepartmentNameList api mock
  rest.get(ticketApprovalsApiConfig.getDepartmentNameList, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockDepartmentNamesList,
      }),
    )
  }),
  // departmentCategoryList api mock
  rest.get(
    ticketApprovalsApiConfig.departmentCategoryList,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockCategoryList,
        }),
      )
    },
  ),
  // getAllTrackerList api mock
  rest.get(ticketApprovalsApiConfig.getAllTrackerList, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockTrackerList,
      }),
    )
  }),
  // subCategoryList api mock
  rest.get(ticketApprovalsApiConfig.subCategoryList, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockSubCategoryList,
      }),
    )
  }),
  // getAllTicketsForApproval api mock
  rest.get(
    ticketApprovalsApiConfig.getAllTicketsForApproval,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockAllTicketApprovals,
        }),
      )
    },
  ),
  // getAllLookups api mock
  rest.get(ticketApprovalsApiConfig.getAllLookups, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockAllLookUps,
      }),
    )
  }),
  // getAllLookups api mock
  rest.put(ticketApprovalsApiConfig.rejectManagerTicket, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: [],
      }),
    )
  }),
]
