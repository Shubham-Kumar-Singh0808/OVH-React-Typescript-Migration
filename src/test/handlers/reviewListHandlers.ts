import { rest } from 'msw'
import { reviewListApiConfig } from '../../middleware/api/apiList'
import {
  mockConfigurationCycle,
  mockDesignations,
  mockEmployeeDepartments,
  mockReviewList,
} from '../data/reviewListData'

export const reviewListHandlers = [
  // getAppraisalCycles api mock
  rest.get(reviewListApiConfig.getAppraisalCycles, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockConfigurationCycle,
      }),
    )
  }),
  // getDesignations api mock
  rest.get(reviewListApiConfig.getDesignations, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockDesignations,
      }),
    )
  }),
  // getDepartments api mock
  rest.get(reviewListApiConfig.getEmployeeDepartments, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockEmployeeDepartments,
      }),
    )
  }),
  // getReviewList api mock
  rest.post(reviewListApiConfig.getReviewList, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockReviewList,
      }),
    )
  }),
  // exportReviewList api mock
  rest.get(reviewListApiConfig.exportReviewList, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
]
