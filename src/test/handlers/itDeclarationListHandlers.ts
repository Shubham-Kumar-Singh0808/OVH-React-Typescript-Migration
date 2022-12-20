import { rest } from 'msw'
import { itDeclarationListApiConfig } from '../../middleware/api/apiList'
import {
  mockDeclarationList,
  mockInvestmentCycles,
} from '../data/itDeclarationListData'

export const itDeclarationListHandlers = [
  // getCycles api mock
  rest.get(itDeclarationListApiConfig.getCycles, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockInvestmentCycles,
      }),
    )
  }),
  //get ITDeclarationsFormsList api mock
  rest.get(
    itDeclarationListApiConfig.getITDeclarationForm,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: mockDeclarationList.itforms,
        }),
      )
    },
  ),
  //addSection api mock
  rest.post(itDeclarationListApiConfig.addSection, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  //updateSection api mock
  rest.put(itDeclarationListApiConfig.updateSection, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
      }),
    )
  }),
  //delete api mock
  rest.delete(itDeclarationListApiConfig.deleteSection, (_req, res, ctx) => {
    const delRes = ctx.json({
      status: 200,
      data: {},
    })
    return res(delRes)
  }),
  //addInvestment api mock
  rest.post(itDeclarationListApiConfig.addInvestment, (_req, res, ctx) => {
    const addInvRes = ctx.json({
      status: 200,
      data: {},
    })
    return res(addInvRes)
  }),
  //deleteInvestment api mock
  rest.delete(itDeclarationListApiConfig.deleteInvestment, (_req, res, ctx) => {
    const delInvRes = ctx.json({
      status: 200,
      data: {},
    })
    return res(delInvRes)
  }),
  //addCycle api mock
  rest.post(itDeclarationListApiConfig.addCycle, (_req, res, ctx) => {
    const addCycleRes = ctx.json({
      status: 200,
      data: {},
    })
    return res(addCycleRes)
  }),
  //deleteCycle api mock
  rest.delete(itDeclarationListApiConfig.deleteCycle, (_req, res, ctx) => {
    const delCycleRes = ctx.json({
      status: 200,
      data: {},
    })
    return res(delCycleRes)
  }),
  //checkCycleExist api mock
  rest.get(itDeclarationListApiConfig.isCycleExist, (_req, res, ctx) => {
    const getCycleRes = ctx.json({
      status: 200,
      data: {},
    })
    return res(getCycleRes)
  }),
  //checkInvestmentExist api mock
  rest.get(itDeclarationListApiConfig.isInvestmentExist, (_req, res, ctx) => {
    const getIsInvestRes = ctx.json({
      status: 200,
      data: {},
    })
    return res(getIsInvestRes)
  }),
  //updateInvestment api mock
  rest.put(itDeclarationListApiConfig.updateInvestment, (_req, res, ctx) => {
    const getUpdateRes = ctx.json({
      status: 200,
      data: {},
    })
    return res(getUpdateRes)
  }),
]
