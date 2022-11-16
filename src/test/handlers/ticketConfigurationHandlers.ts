import { rest } from 'msw'
import { ticketConfigurationApiConfig } from '../../middleware/api/apiList'
import {
  mockAddSubCategory,
  mockCategoryList,
  mockDepartments,
  mockTicketConfigurationCategory,
  mockTicketConfigurationSubCategory,
  mockTicketConfigurationSubCategoryList,
  mockTicketHistory,
} from '../data/ticketConfigurationData'

export const ticketConfigurationHandlers = [
  // getAllDepartments api mock
  rest.get(ticketConfigurationApiConfig.getDepartments, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockDepartments,
      }),
    )
  }),
  // getAllCategories api mock
  rest.get(ticketConfigurationApiConfig.getCategories, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockTicketConfigurationCategory,
      }),
    )
  }),
  // getAllSubCategories api mock
  rest.get(ticketConfigurationApiConfig.getSubCategories, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockTicketConfigurationSubCategory,
      }),
    )
  }),
  //getAllSubCategoriesList api mock
  rest.get(ticketConfigurationApiConfig.getSubCategories, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockTicketConfigurationSubCategoryList,
      }),
    )
  }),
  //getTicketHistory api mock
  rest.get(ticketConfigurationApiConfig.ticketHistory, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockTicketHistory,
      }),
    )
  }),
  //delete subCategory api mock
  rest.delete(
    ticketConfigurationApiConfig.deleteSubCategory,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: {},
        }),
      )
    },
  ),
  // addNewSubCategory api mock
  rest.post(ticketConfigurationApiConfig.addSubCategory, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { mockAddSubCategory },
      }),
    )
  }),
  //getCategoryList api mock
  rest.get(ticketConfigurationApiConfig.getAllCategory, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { mockCategoryList },
      }),
    )
  }),
  // addNewCategory api mock
  rest.post(ticketConfigurationApiConfig.addCategory, (_req, res, ctx) => {
    const addResponse = ctx.json({
      status: 200,
      data: {},
    })
    return res(addResponse)
  }),
]
