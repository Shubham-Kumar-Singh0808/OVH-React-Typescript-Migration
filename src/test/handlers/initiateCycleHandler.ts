import { rest } from 'msw'
import { initiateCycleApiConfig } from '../../middleware/api/apiList'
import {
  mockActiveCycleData,
  mockAllCycles,
  mockAllQuestions,
} from '../data/initiateCycleData'

export const initiateCycleHandlers = [
  rest.get(initiateCycleApiConfig.getActiveCycleData, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { mockActiveCycleData },
      }),
    )
  }),
  rest.get(initiateCycleApiConfig.getAllQuestions, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { mockAllQuestions },
      }),
    )
  }),
  rest.get(initiateCycleApiConfig.getallcycles, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { mockAllCycles },
      }),
    )
  }),
  rest.post(initiateCycleApiConfig.addQuestion, (_req, res, ctx) => {
    const addResponse = ctx.json({
      status: 200,
      data: {},
    })
    return res(addResponse)
  }),
  rest.delete(initiateCycleApiConfig.deleteQuestion, (_req, res, ctx) => {
    const delResponse = ctx.json({
      status: 200,
      data: {},
    })
    return res(delResponse)
  }),
]
