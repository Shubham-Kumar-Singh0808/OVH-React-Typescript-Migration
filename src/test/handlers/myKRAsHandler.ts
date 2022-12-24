import { rest } from 'msw'
import { myKRAsApiConfig } from '../../middleware/api/apiList'
import {
  mockIndividualKRAs,
  mockKPIsForIndividualKra,
} from '../data/MyKRAsData'

export const myKRAsHandler = [
  // getKRAForIndividualEmployee api mock
  rest.get(myKRAsApiConfig.getKRAForIndividualEmployee, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockIndividualKRAs,
      }),
    )
  }),
  // getKPIsForIndividualEmployee api mock
  rest.get(myKRAsApiConfig.getKPIsForIndividualEmployee, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockKPIsForIndividualKra,
      }),
    )
  }),
]
