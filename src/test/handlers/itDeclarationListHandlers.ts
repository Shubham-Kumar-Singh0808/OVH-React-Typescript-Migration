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
]